import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  PhoneOff,
  RotateCcw,
  Volume2,
  AlertCircle,
  ShieldCheck,
  Send,
  Sparkles,
  KeyRound,
  Info,
} from 'lucide-react';
import { AiOrb } from './AiOrb';
import { useLiveVoice } from '../hooks/useLiveVoice';
import { PRODUCT_IDENTITY } from '../data/productData';

export const VoiceDemo: React.FC = () => {
  const {
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
  } = useLiveVoice();

  const [inputText, setInputText] = useState('');
  const [serverStatus, setServerStatus] = useState<{
    hasApiKey: boolean;
    liveModel: string;
    voice: string;
  } | null>(null);

  const transcriptScrollRef = useRef<HTMLDivElement>(null);

  // Fetch server configuration status
  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        setServerStatus({
          hasApiKey: data.hasApiKey,
          liveModel: data.liveModel || PRODUCT_IDENTITY.configuredVoiceModel,
          voice: data.voice || PRODUCT_IDENTITY.configuredVoiceName,
        });
      })
      .catch((err) => console.error('Error fetching server status:', err));
  }, []);

  // Auto-scroll transcript container
  useEffect(() => {
    if (transcriptScrollRef.current) {
      transcriptScrollRef.current.scrollTop = transcriptScrollRef.current.scrollHeight;
    }
  }, [transcripts]);

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendTextMessage(inputText);
    setInputText('');
  };

  // Display format for engine: user requested 'aiaaji live'
  const displayEngine = (name?: string | null) => {
    if (!name || name.toLowerCase().includes('gemini')) return 'aiaaji live';
    return name;
  };

  const isSessionActive = voiceState !== 'idle' && voiceState !== 'error';

  return (
    <section id="live-demo" className="py-24 relative bg-[#0D1220] border-t border-white/5 overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#8065FF]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#35D9F2]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182136] border border-white/10 text-xs font-semibold text-[#35D9F2] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Core Voice Experience
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Meet AI Aaji. Have a conversation.
          </h2>
          <p className="text-base sm:text-lg text-[#A7B0C5]">
            “Forget typing for a moment. Start talking and experience a more natural way to interact with AI.”
          </p>
        </div>

        {/* Configuration Notice if API Key is not yet configured */}
        {serverStatus && !serverStatus.hasApiKey && (
          <div className="mb-8 p-4 rounded-xl bg-[#12192A] border border-[#8065FF]/40 text-left flex items-start gap-3 shadow-lg">
            <Info className="w-5 h-5 text-[#35D9F2] shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-semibold text-white">Live Voice Model Configuration:</span>
              <p className="text-[#A7B0C5] mt-1">
                The Live Voice engine is pre-configured with <strong className="text-white">aiaaji live</strong> and the <strong className="text-white">{serverStatus.voice}</strong> voice persona. To activate real-time spoken audio with the Gemini Realtime API, add your <code className="bg-black/40 px-1 py-0.5 rounded text-[#B8A6FF]">GEMINI_API_KEY</code> to the AI Studio Secrets panel.
              </p>
            </div>
          </div>
        )}

        {/* Voice Interactive Console Container */}
        <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Top Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#43D9A3] animate-pulse" />
              <div>
                <h3 className="text-sm font-semibold text-white">AI Aaji Live Voice Session</h3>
                <p className="text-xs text-[#A7B0C5]">
                  Engine: <span className="text-[#35D9F2] font-mono">{displayEngine(activeModel)}</span> • Voice:{' '}
                  <span className="text-[#B8A6FF]">{activeVoice}</span>
                </p>
              </div>
            </div>

            {/* Current State Pill */}
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium border flex items-center gap-1.5 ${
                  voiceState === 'speaking'
                    ? 'bg-[#35D9F2]/10 border-[#35D9F2]/30 text-[#35D9F2]'
                    : voiceState === 'listening'
                    ? 'bg-[#8065FF]/10 border-[#8065FF]/30 text-[#B8A6FF]'
                    : voiceState === 'connecting'
                    ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                    : voiceState === 'error'
                    ? 'bg-[#FF6B81]/10 border-[#FF6B81]/30 text-[#FF6B81]'
                    : 'bg-white/5 border-white/10 text-[#A7B0C5]'
                }`}
              >
                {voiceState === 'speaking' && <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
                {voiceState === 'listening' && <Mic className="w-3.5 h-3.5 animate-pulse" />}
                {voiceState === 'speaking'
                  ? 'AI Aaji Speaking'
                  : voiceState === 'listening'
                  ? 'Listening to you...'
                  : voiceState === 'connecting'
                  ? 'Connecting to Gemini...'
                  : voiceState === 'requesting-permission'
                  ? 'Requesting Microphone...'
                  : voiceState === 'error'
                  ? 'Connection Alert'
                  : 'Ready to talk'}
              </span>
            </div>
          </div>

          {/* Central AI Orb & Reactive Visualization */}
          <div className="py-12 flex flex-col items-center justify-center relative">
            <AiOrb size="xl" state={voiceState} audioLevel={audioLevel} />

            {/* Dynamic Waveform Visualization when active */}
            {isSessionActive && (
              <div className="mt-8 flex items-center gap-1.5 h-10 px-4 py-2 rounded-full bg-black/40 border border-white/10">
                {[0.3, 0.6, 0.9, 0.4, 0.7, 1.0, 0.5, 0.8, 0.4, 0.7, 0.9, 0.3].map((factor, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full transition-all duration-100"
                    style={{
                      height: `${Math.max(6, (8 + audioLevel * 30) * factor)}px`,
                      backgroundColor:
                        voiceState === 'speaking'
                          ? '#35D9F2'
                          : voiceState === 'listening'
                          ? '#8065FF'
                          : '#A7B0C5',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Error / Alert Display */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-[#FF6B81]/10 border border-[#FF6B81]/30 text-[#FF6B81] text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold block">Voice Engine Notice:</span>
                <p className="mt-0.5 text-xs text-[#FF6B81]/90">{errorMessage}</p>
                {errorCode === 'API_KEY_MISSING' && (
                  <p className="mt-2 text-xs text-[#A7B0C5]">
                    You can add your Gemini API key in AI Studio under Settings &gt; Secrets to begin live microphone conversations.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Real-Time Transcript Display */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#A7B0C5] uppercase tracking-wider">
                Conversation Transcript
              </span>
              {transcripts.length > 0 && (
                <span className="text-[11px] text-[#A7B0C5]">{transcripts.length} turns</span>
              )}
            </div>

            <div
              ref={transcriptScrollRef}
              className="h-36 sm:h-44 overflow-y-auto rounded-xl bg-[#080B14]/70 border border-white/10 p-4 space-y-3 text-xs sm:text-sm font-sans"
            >
              {transcripts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[#A7B0C5]/60 text-center">
                  <Mic className="w-6 h-6 mb-2 opacity-40 text-[#8065FF]" />
                  <p>Click &ldquo;Start Talking to AI Aaji&rdquo; below to begin your real-time conversation.</p>
                </div>
              ) : (
                transcripts.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col ${
                      item.role === 'user'
                        ? 'items-end'
                        : item.role === 'assistant'
                        ? 'items-start'
                        : 'items-center text-center'
                    }`}
                  >
                    {item.role === 'system' ? (
                      <span className="text-[11px] text-[#A7B0C5]/70 italic bg-white/5 px-2.5 py-0.5 rounded-full my-1">
                        {item.text}
                      </span>
                    ) : (
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                          item.role === 'user'
                            ? 'bg-[#8065FF]/20 text-[#F7F8FF] border border-[#8065FF]/30 rounded-tr-none'
                            : 'bg-[#182136] text-[#F7F8FF] border border-white/10 rounded-tl-none'
                        }`}
                      >
                        <span className="text-[10px] font-semibold block text-[#A7B0C5] mb-0.5">
                          {item.role === 'user' ? 'You' : 'AI Aaji'}
                        </span>
                        <p className="leading-relaxed">{item.text}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {!isSessionActive ? (
              <button
                onClick={startConversation}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#8065FF] via-[#9F88FF] to-[#35D9F2] text-white font-bold text-base shadow-xl shadow-[#8065FF]/30 hover:shadow-[#8065FF]/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-3"
              >
                <Mic className="w-5 h-5 text-white animate-pulse" />
                Start Talking to AI Aaji
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                {/* Mute Toggle */}
                <button
                  onClick={toggleMute}
                  className={`p-3.5 rounded-full border transition-all cursor-pointer flex items-center gap-2 ${
                    isMuted
                      ? 'bg-[#FF6B81]/20 border-[#FF6B81] text-[#FF6B81]'
                      : 'bg-[#182136] border-white/10 text-white hover:bg-white/10'
                  }`}
                  title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  <span className="text-xs font-medium">{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>

                {/* End Conversation */}
                <button
                  onClick={endConversation}
                  className="px-6 py-3.5 rounded-full bg-[#FF6B81] hover:bg-[#FF6B81]/90 text-white font-semibold text-sm shadow-lg shadow-[#FF6B81]/20 transition-all cursor-pointer flex items-center gap-2"
                >
                  <PhoneOff className="w-4 h-4" />
                  End Conversation
                </button>

                {/* Reconnect Action */}
                <button
                  onClick={startConversation}
                  className="p-3.5 rounded-full bg-[#182136] hover:bg-white/10 text-[#A7B0C5] hover:text-white border border-white/10 transition-colors cursor-pointer"
                  title="Reconnect Session"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Optional Text Input Fallback */}
          {isSessionActive && (
            <form onSubmit={handleSendText} className="mt-6 flex items-center gap-2 max-w-lg mx-auto">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Or send text fallback message..."
                className="flex-1 bg-[#080B14] border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder-[#A7B0C5] focus:outline-none focus:border-[#8065FF]"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-[#8065FF] hover:bg-[#8065FF]/90 text-white text-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Privacy Note */}
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-[#A7B0C5]">
            <ShieldCheck className="w-4 h-4 text-[#43D9A3]" />
            <span>
              Microphone audio is processed in real time for conversation and is never recorded or stored on our servers.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
