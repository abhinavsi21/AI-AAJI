import { useState, useRef, useCallback, useEffect } from 'react';
import {
  floatTo16BitPCM,
  pcm16ToFloat32,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  calculateRMS,
} from '../services/liveAudioService';

export type VoiceState =
  | 'idle'
  | 'requesting-permission'
  | 'connecting'
  | 'connected'
  | 'listening'
  | 'speaking'
  | 'interrupted'
  | 'error';

export interface TranscriptItem {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: Date;
}

export function useLiveVoice() {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0); // 0.0 to 1.0 for visual orb
  const [transcripts, setTranscripts] = useState<TranscriptItem[]>([]);
  const [activeModel, setActiveModel] = useState<string>('aiaaji live');
  const [activeVoice, setActiveVoice] = useState<string>('Aoede');

  const wsRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const isMutedRef = useRef(false);

  // Keep isMutedRef in sync
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const stopAudioTracks = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  }, []);

  const stopActiveSources = useCallback(() => {
    activeSourcesRef.current.forEach((source) => {
      try {
        source.stop();
        source.disconnect();
      } catch (_) {}
    });
    activeSourcesRef.current = [];
    if (outputAudioCtxRef.current) {
      nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
    }
  }, []);

  const cleanup = useCallback(() => {
    stopActiveSources();
    stopAudioTracks();

    if (processorRef.current) {
      try {
        processorRef.current.disconnect();
      } catch (_) {}
      processorRef.current = null;
    }

    if (inputAudioCtxRef.current && inputAudioCtxRef.current.state !== 'closed') {
      try {
        inputAudioCtxRef.current.close();
      } catch (_) {}
      inputAudioCtxRef.current = null;
    }

    if (outputAudioCtxRef.current && outputAudioCtxRef.current.state !== 'closed') {
      try {
        outputAudioCtxRef.current.close();
      } catch (_) {}
      outputAudioCtxRef.current = null;
    }

    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch (_) {}
      wsRef.current = null;
    }

    setAudioLevel(0);
  }, [stopActiveSources, stopAudioTracks]);

  const endConversation = useCallback(() => {
    cleanup();
    setVoiceState('idle');
    setTranscripts((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        role: 'system',
        text: 'Voice conversation ended.',
        timestamp: new Date(),
      },
    ]);
  }, [cleanup]);

  const startConversation = useCallback(async () => {
    cleanup();
    setErrorMessage(null);
    setErrorCode(null);
    setVoiceState('requesting-permission');

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      mediaStreamRef.current = stream;
    } catch (err: any) {
      console.error('Microphone access denied:', err);
      setVoiceState('error');
      setErrorCode('MIC_DENIED');
      setErrorMessage(
        'Microphone permission was denied. Please allow microphone access in your browser to talk to AI Aaji.'
      );
      return;
    }

    setVoiceState('connecting');

    try {
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000,
      });
      inputAudioCtxRef.current = inputCtx;

      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000,
      });
      outputAudioCtxRef.current = outputCtx;
      nextStartTimeRef.current = outputCtx.currentTime;

      // Determine WS protocol and URL
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live-ws`;

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setVoiceState('connected');
        setTranscripts((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            role: 'system',
            text: 'Connected to AI Aaji Realtime Voice Engine (Aoede voice). Start speaking anytime!',
            timestamp: new Date(),
          },
        ]);

        // Setup input audio processing
        const source = inputCtx.createMediaStreamSource(stream);
        const processor = inputCtx.createScriptProcessor(2048, 1, 1);
        processorRef.current = processor;

        processor.onaudioprocess = (e) => {
          if (isMutedRef.current) {
            setAudioLevel(0);
            return;
          }

          const channelData = e.inputBuffer.getChannelData(0);
          const level = calculateRMS(channelData);
          setAudioLevel(level);

          if (level > 0.04) {
            setVoiceState((current) => (current === 'speaking' ? current : 'listening'));
          }

          if (ws.readyState === WebSocket.OPEN) {
            const pcmBuffer = floatTo16BitPCM(channelData);
            const base64Audio = arrayBufferToBase64(pcmBuffer);
            ws.send(JSON.stringify({ type: 'audio', audio: base64Audio }));
          }
        };

        source.connect(processor);
        processor.connect(inputCtx.destination);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'status') {
            if (data.model) {
              setActiveModel(data.model.toLowerCase().includes('gemini') ? 'aiaaji live' : data.model);
            }
            if (data.voice) setActiveVoice(data.voice);
          } else if (data.type === 'audio' && data.audio) {
            setVoiceState('speaking');
            const pcmBuffer = base64ToArrayBuffer(data.audio);
            const float32Data = pcm16ToFloat32(pcmBuffer);

            // Compute volume for speaking orb animation
            const level = calculateRMS(float32Data);
            setAudioLevel(level);

            if (outputCtx.state === 'suspended') {
              outputCtx.resume();
            }

            const audioBuffer = outputCtx.createBuffer(1, float32Data.length, 24000);
            audioBuffer.copyToChannel(float32Data, 0);

            const sourceNode = outputCtx.createBufferSource();
            sourceNode.buffer = audioBuffer;
            sourceNode.connect(outputCtx.destination);

            const currentTime = outputCtx.currentTime;
            const startTime = Math.max(currentTime, nextStartTimeRef.current);
            sourceNode.start(startTime);
            nextStartTimeRef.current = startTime + audioBuffer.duration;

            activeSourcesRef.current.push(sourceNode);
            sourceNode.onended = () => {
              activeSourcesRef.current = activeSourcesRef.current.filter((s) => s !== sourceNode);
              if (activeSourcesRef.current.length === 0) {
                setVoiceState('connected');
                setAudioLevel(0);
              }
            };
          } else if (data.type === 'interrupted') {
            setVoiceState('interrupted');
            stopActiveSources();
            setTimeout(() => {
              setVoiceState('connected');
            }, 300);
          } else if (data.type === 'transcript') {
            setTranscripts((prev) => {
              const last = prev[prev.length - 1];
              if (last && last.role === data.role && Date.now() - last.timestamp.getTime() < 3000) {
                return [
                  ...prev.slice(0, -1),
                  { ...last, text: last.text + ' ' + data.text },
                ];
              }
              return [
                ...prev,
                {
                  id: Math.random().toString(),
                  role: data.role,
                  text: data.text,
                  timestamp: new Date(),
                },
              ];
            });
          } else if (data.type === 'error') {
            setVoiceState('error');
            setErrorCode(data.code || 'UNKNOWN');
            setErrorMessage(data.message || 'An error occurred during the voice session.');
          }
        } catch (err) {
          console.error('Error handling WebSocket message:', err);
        }
      };

      ws.onerror = (err) => {
        console.error('WebSocket error:', err);
        setVoiceState('error');
        setErrorMessage('Failed to connect to AI Aaji voice server. Please check your connection.');
      };

      ws.onclose = () => {
        stopAudioTracks();
        stopActiveSources();
        setVoiceState((current) => {
          if (current !== 'idle' && current !== 'error') {
            setTranscripts((prev) => [
              ...prev,
              {
                id: Math.random().toString(),
                role: 'system',
                text: 'Voice session closed. Tap the microphone to talk anytime.',
                timestamp: new Date(),
              },
            ]);
            return 'idle';
          }
          return current;
        });
      };
    } catch (err: any) {
      console.error('Failed to initialize audio contexts:', err);
      setVoiceState('error');
      setErrorMessage(err.message || 'Audio initialization failed.');
      cleanup();
    }
  }, [cleanup, stopActiveSources]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const sendTextMessage = useCallback(
    (text: string) => {
      if (!text.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        return;
      }
      wsRef.current.send(JSON.stringify({ type: 'text', text }));
      setTranscripts((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: 'user',
          text,
          timestamp: new Date(),
        },
      ]);
    },
    []
  );

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    voiceState,
    errorMessage,
    errorCode,
    isMuted,
    audioLevel,
    transcripts,
    activeModel,
    activeVoice,
    startConversation,
    endConversation,
    toggleMute,
    sendTextMessage,
  };
}
