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
  Info,
} from 'lucide-react';
import { AiOrb } from './AiOrb';
import { useLiveVoice } from '../hooks/useLiveVoice';
import { PRODUCT_IDENTITY } from '../data/productData';
import { useTheme } from '../context/ThemeContext';
import { EditorialStar } from './EditorialStar';

export const VoiceDemo: React.FC = () => {
  const { isEditorial } = useTheme();
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
    <section id="live-demo" className="py-24 relative bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] overflow-hidden theme-transition">
      {/* Glow Backdrops strictly contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-[var(--ambient-glow-1)] rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-[var(--ambient-glow-2)] rounded-full blur-[80px] sm:blur-[100px]" />

        {isEditorial && (
          <>
            <div className="absolute top-16 left-12 text-[var(--accent-secondary)] select-none opacity-40">
              <EditorialStar className="w-5 h-5" />
            </div>
            <div className="absolute bottom-20 right-16 text-[var(--accent-secondary)] select-none opacity-35">
              <EditorialStar className="w-4 h-4" />
            </div>
          </>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--accent-secondary)] uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Voice Experience</span>
            {isEditorial && <EditorialStar className="w-3 h-3 text-[var(--accent-secondary)]" />}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] tracking-tight mb-4">
            Meet AI Aaji. Have a conversation.
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">
            “Forget typing for a moment. Start talking and experience a more natural way to interact with AI.”
          </p>
        </div>

        {/* Configuration Notice if API Key is not yet configured */}
        {serverStatus && !serverStatus.hasApiKey && (
          <div className="mb-8 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--accent-primary)]/40 text-left flex items-start gap-3 shadow-lg">
            <Info className="w-5 h-5 text-[var(--accent-secondary)] shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-semibold text-[var(--text-main)]">Live Voice Model Configuration:</span>
              <p className="text-[var(--text-secondary)] mt-1">
                The Live Voice engine is pre-configured with <strong className="text-[var(--text-main)]">aiaaji live</strong> and the <strong className="text-[var(--text-main)]">{serverStatus.voice}</strong> voice persona. To activate real-time spoken audio with the Gemini Realtime API, add your <code className="bg-black/10 dark:bg-black/40 px-1 py-0.5 rounded text-[var(--accent-primary)] font-mono">GEMINI_API_KEY</code> to the AI Studio Secrets panel.
              </p>
            </div>
          </div>
        )}

        {/* Voice Interactive Console Container */}
        <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-[var(--border-elevated)] shadow-2xl relative overflow-hidden">
          
          {/* Top Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--status-success)] animate-pulse" />
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-main)]">AI Aaji Live Voice Session</h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Engine: <span className="text-[var(--accent-secondary)] font-mono">{displayEngine(activeModel)}</span> • Voice:{' '}
                  <span className="text-[var(--accent-primary)] font-medium">{activeVoice}</span>
                </p>
              </div>
            </div>

            {/* Current State Pill */}
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium border flex items-center gap-1.5 ${
                  voiceState === 'speaking'
                    ? 'bg-[var(--accent-secondary)]/10 border-[var(--accent-secondary)]/30 text-[var(--accent-secondary)]'
                    : voiceState === 'listening'
                    ? 'bg-[var(--accent-primary)]/10 border-[var(--accent-primary)]/30 text-[var(--accent-primary)]'
                    : voiceState === 'connecting'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                    : voiceState === 'error'
                    ? 'bg-[var(--status-error)]/10 border-[var(--status-error)]/30 text-[var(--status-error)]'
                    : 'bg-[var(--glass-pill-bg)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
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
              <div className="mt-8 flex items-center gap-1.5 h-10 px-4 py-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-inner">
                {[0.3, 0.6, 0.9, 0.4, 0.7, 1.0, 0.5, 0.8, 0.4, 0.7, 0.9, 0.3].map((factor, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full transition-all duration-100"
                    style={{
                      height: `${Math.max(6, (8 + audioLevel * 30) * factor)}px`,
                      backgroundColor:
                        voiceState === 'speaking'
                          ? 'var(--accent-secondary)'
                          : voiceState === 'listening'
                          ? 'var(--accent-primary)'
                          : 'var(--text-secondary)',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Error / Alert Display */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-[var(--status-error)]/10 border border-[var(--status-error)]/30 text-[var(--status-error)] text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold block">Voice Engine Notice:</span>
                <p className="mt-0.5 text-xs opacity-90">{errorMessage}</p>
                {errorCode === 'API_KEY_MISSING' && (
                  <p className="mt-2 text-xs text-[var(--text-secondary)]">
                    You can add your Gemini API key in AI Studio under Settings &gt; Secrets to begin live microphone conversations.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Real-Time Transcript Display */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                Conversation Transcript
              </span>
              {transcripts.length > 0 && (
                <span className="text-[11px] text-[var(--text-secondary)] font-mono">{transcripts.length} turns</span>
              )}
            </div>

            <div
              ref={transcriptScrollRef}
              className="h-36 sm:h-44 overflow-y-auto rounded-xl bg-[var(--bg-main)]/60 border border-[var(--border-subtle)] p-4 space-y-3 text-xs sm:text-sm font-sans"
            >
              {transcripts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[var(--text-muted)] text-center">
                  <Mic className="w-6 h-6 mb-2 opacity-40 text-[var(--accent-primary)]" />
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
                      <span className="text-[11px] text-[var(--text-secondary)] italic bg-[var(--glass-pill-bg)] px-2.5 py-0.5 rounded-full my-1 border border-[var(--border-subtle)]">
                        {item.text}
                      </span>
                    ) : (
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm ${
                          item.role === 'user'
                            ? 'bg-[var(--accent-primary)]/15 text-[var(--text-main)] border border-[var(--accent-primary)]/30 rounded-tr-none'
                            : 'bg-[var(--bg-elevated)] text-[var(--text-main)] border border-[var(--border-subtle)] rounded-tl-none'
                        }`}
                      >
                        <span className="text-[10px] font-semibold block text-[var(--accent-primary)] mb-0.5">
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
                className="px-8 py-4 rounded-full btn-gradient font-bold text-base shadow-xl shadow-[var(--accent-primary)]/25 hover:shadow-[var(--accent-primary)]/45 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-3"
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
                      ? 'bg-[var(--status-error)]/20 border-[var(--status-error)] text-[var(--status-error)]'
                      : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-main)] hover:bg-[var(--bg-hover)]'
                  }`}
                  title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  <span className="text-xs font-medium">{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>

                {/* End Conversation */}
                <button
                  onClick={endConversation}
                  className="px-6 py-3.5 rounded-full bg-[var(--status-error)] hover:opacity-90 text-white font-semibold text-sm shadow-lg shadow-[var(--status-error)]/20 transition-all cursor-pointer flex items-center gap-2"
                >
                  <PhoneOff className="w-4 h-4" />
                  End Conversation
                </button>

                {/* Reconnect Action */}
                <button
                  onClick={startConversation}
                  className="p-3.5 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-main)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
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
                className="flex-1 bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-full px-4 py-2 text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] shadow-inner"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-[var(--accent-primary)] hover:opacity-90 text-white text-xs cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Privacy Note */}
          <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex items-center justify-center gap-2 text-xs text-[var(--text-secondary)]">
            <ShieldCheck className="w-4 h-4 text-[var(--status-success)]" />
            <span>
              Microphone audio is processed in real time for conversation and is never recorded or stored on our servers.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
