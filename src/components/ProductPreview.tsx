import React, { useState } from 'react';
import { Mic, Send, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { EditorialStar } from './EditorialStar';

export const ProductPreview: React.FC = () => {
  const { isEditorial } = useTheme();

  const examplePrompts = [
    {
      query: 'Hello Aaji, what can you help me with?',
      response:
        "Hello! I am your everyday AI assistant. You can speak to me in real time to get research answers, automate desktop workflows, draft documents, or have me explain content on your screen.",
      tag: 'Overview',
    },
    {
      query: 'Explain what I am looking at.',
      response:
        "Analyzing your active screen viewport: You have a React TypeScript project open with Tailwind CSS configuration. The server is ready to compile and run with low-latency voice streaming enabled.",
      tag: 'Vision',
    },
    {
      query: 'Help me with a digital task.',
      response:
        "I've queued your requested task: drafted the summary report, scheduled your calendar focus block for 3:00 PM, and opened your terminal with the required build command.",
      tag: 'Automation',
    },
    {
      query: 'Tell me about your features.',
      response:
        "I feature Real-Time Voice AI powered by Gemini Realtime with the Aoede voice, Multimodal Visual Understanding, Device and Application Controls, and Intelligent Information Access.",
      tag: 'Features',
    },
  ];

  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const activePrompt = examplePrompts[activePromptIndex];

  return (
    <section className="py-20 relative bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)] overflow-hidden theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--accent-secondary)] uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Experience Preview</span>
            {isEditorial && <EditorialStar className="w-3 h-3 text-[var(--accent-secondary)]" />}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--text-main)] tracking-tight mb-4">
            Natural conversation meets desktop power.
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">
            Experience how AI Aaji looks and interacts when working alongside you. Click any sample prompt below to preview simulated responses.
          </p>
        </div>

        {/* Interactive Prompt Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {examplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setActivePromptIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activePromptIndex === idx
                  ? 'btn-gradient shadow-md shadow-[var(--accent-primary)]/20 scale-[1.02]'
                  : 'bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-main)] border border-[var(--border-subtle)]'
              }`}
            >
              <span>{p.query}</span>
            </button>
          ))}
        </div>

        {/* Simulated Product Window */}
        <div className="max-w-4xl mx-auto rounded-2xl glass-panel-elevated border border-[var(--border-elevated)] shadow-2xl overflow-hidden">
          
          {/* Window Header */}
          <div className="bg-[var(--bg-elevated)] px-4 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[var(--status-error)]/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-[var(--status-success)]/80" />
              </div>
              <span className="text-xs font-medium text-[var(--text-secondary)] ml-2">AI Aaji — Desktop Assistant Preview</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[var(--text-secondary)] bg-[var(--glass-pill-bg)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                SIMULATION MODE
              </span>
            </div>
          </div>

          {/* Window Body: Conversation Showcase */}
          <div className="p-6 sm:p-8 space-y-6 min-h-[280px] bg-[var(--bg-main)]/50 flex flex-col justify-center">
            
            {/* User message */}
            <div className="flex items-start justify-end gap-3">
              <div className="bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/30 px-5 py-3.5 rounded-2xl rounded-tr-none max-w-lg text-sm text-[var(--text-main)] leading-relaxed shadow-sm">
                {activePrompt.query}
              </div>
              <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-xs font-semibold text-white shrink-0 shadow-sm">
                You
              </div>
            </div>

            {/* Assistant response */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--gradient-btn)] flex items-center justify-center text-xs font-semibold text-white shrink-0 p-[1.5px] shadow-sm">
                <div className="w-full h-full rounded-full bg-[var(--bg-main)] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[var(--gradient-btn)]" />
                </div>
              </div>
              
              <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] px-5 py-4 rounded-2xl rounded-tl-none max-w-xl shadow-inner">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-[var(--accent-primary)]">AI Aaji</span>
                  <span className="text-[10px] text-[var(--accent-secondary)] bg-[var(--accent-secondary)]/10 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                    <Volume2 className="w-3 h-3" />
                    Aoede Voice Ready
                  </span>
                </div>
                <p className="text-sm text-[var(--text-main)] leading-relaxed mb-3">
                  {activePrompt.response}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--status-success)]" />
                  <span>Verified assistant response format</span>
                </div>
              </div>
            </div>

          </div>

          {/* Window Footer: Input Controls */}
          <div className="bg-[var(--bg-elevated)] p-4 border-t border-[var(--border-subtle)] flex items-center gap-3">
            <button
              className="p-2.5 rounded-full bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] text-[var(--accent-secondary)] transition-colors cursor-pointer border border-[var(--border-subtle)]"
              title="Voice Input"
            >
              <Mic className="w-4 h-4" />
            </button>
            <div className="flex-1 bg-[var(--bg-main)] rounded-full px-4 py-2 border border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-xs text-[var(--text-secondary)]">Ask AI Aaji anything or press mic to speak...</span>
              <div className="flex items-center gap-1 text-[11px] text-[var(--text-secondary)] bg-[var(--glass-pill-bg)] px-2 py-0.5 rounded border border-[var(--border-subtle)] font-mono">
                ⌘ Space
              </div>
            </div>
            <button
              className="p-2.5 rounded-full btn-gradient hover:opacity-90 transition-opacity cursor-pointer shadow-md"
              title="Send Prompt"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
