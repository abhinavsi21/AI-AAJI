import React, { useState } from 'react';
import { Mic, Send, Volume2, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';

export const ProductPreview: React.FC = () => {
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
    <section className="py-20 relative bg-[#0D1220]/60 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182136] border border-white/10 text-xs font-semibold text-[#35D9F2] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Product Experience Preview
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Natural conversation meets desktop power.
          </h2>
          <p className="text-base sm:text-lg text-[#A7B0C5]">
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
                  ? 'bg-gradient-to-r from-[#8065FF] to-[#35D9F2] text-white shadow-md shadow-[#8065FF]/20 scale-[1.02]'
                  : 'bg-[#12192A] hover:bg-[#182136] text-[#A7B0C5] hover:text-white border border-white/10'
              }`}
            >
              <span>{p.query}</span>
            </button>
          ))}
        </div>

        {/* Simulated Product Window */}
        <div className="max-w-4xl mx-auto rounded-2xl glass-panel-elevated border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Window Header */}
          <div className="bg-[#080B14]/80 px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF6B81]/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-[#43D9A3]/80" />
              </div>
              <span className="text-xs font-medium text-[#A7B0C5] ml-2">AI Aaji — Desktop Assistant Preview</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#A7B0C5] bg-white/5 px-2 py-0.5 rounded">
                SIMULATION MODE
              </span>
            </div>
          </div>

          {/* Window Body: Conversation Showcase */}
          <div className="p-6 sm:p-8 space-y-6 min-h-[280px] bg-[#080B14]/40 flex flex-col justify-center">
            
            {/* User message */}
            <div className="flex items-start justify-end gap-3">
              <div className="bg-[#8065FF]/20 border border-[#8065FF]/30 px-5 py-3.5 rounded-2xl rounded-tr-none max-w-lg text-sm text-[#F7F8FF] leading-relaxed">
                {activePrompt.query}
              </div>
              <div className="w-8 h-8 rounded-full bg-[#8065FF]/30 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                You
              </div>
            </div>

            {/* Assistant response */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8065FF] to-[#35D9F2] flex items-center justify-center text-xs font-semibold text-white shrink-0 p-[1.5px]">
                <div className="w-full h-full rounded-full bg-[#080B14] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#8065FF] to-[#35D9F2]" />
                </div>
              </div>
              
              <div className="bg-[#12192A] border border-white/10 px-5 py-4 rounded-2xl rounded-tl-none max-w-xl shadow-inner">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-[#B8A6FF]">AI Aaji</span>
                  <span className="text-[10px] text-[#35D9F2] bg-[#35D9F2]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Volume2 className="w-3 h-3" />
                    Aoede Voice Ready
                  </span>
                </div>
                <p className="text-sm text-[#F7F8FF] leading-relaxed mb-3">
                  {activePrompt.response}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-[#A7B0C5]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#43D9A3]" />
                  <span>Verified assistant response format</span>
                </div>
              </div>
            </div>

          </div>

          {/* Window Footer: Input Controls */}
          <div className="bg-[#0D1220] p-4 border-t border-white/10 flex items-center gap-3">
            <button
              className="p-2.5 rounded-full bg-[#182136] hover:bg-[#8065FF]/20 text-[#35D9F2] hover:text-white transition-colors cursor-pointer border border-white/10"
              title="Voice Input"
            >
              <Mic className="w-4 h-4" />
            </button>
            <div className="flex-1 bg-[#080B14] rounded-full px-4 py-2 border border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#A7B0C5]">Ask AI Aaji anything or press mic to speak...</span>
              <div className="flex items-center gap-1 text-[11px] text-[#A7B0C5] bg-white/5 px-2 py-0.5 rounded">
                ⌘ Space
              </div>
            </div>
            <button
              className="p-2.5 rounded-full bg-gradient-to-r from-[#8065FF] to-[#35D9F2] text-white hover:opacity-90 transition-opacity cursor-pointer"
              title="Send Prompt"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
