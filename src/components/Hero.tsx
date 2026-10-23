import React from 'react';
import { Sparkles, ArrowRight, Download, Mic, Eye, Sliders, ExternalLink } from 'lucide-react';
import { AiOrb } from './AiOrb';
import { PRODUCT_IDENTITY } from '../data/productData';

interface HeroProps {
  onTryDemo: () => void;
  onExploreFeatures: () => void;
  onDownload: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTryDemo, onExploreFeatures, onDownload }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8065FF]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#35D9F2]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182136]/90 border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#B8A6FF] mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#35D9F2] animate-ping" />
              MEET YOUR EVERYDAY AI ASSISTANT
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Meet AI Aaji. <br />
              <span className="gradient-text-accent">Your world, a little easier.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-[#A7B0C5] max-w-2xl font-normal leading-relaxed mb-8">
              “Talk naturally. Explore ideas. Get help with everyday digital tasks. Meet an AI assistant designed to bring voice, intelligence, and automation together.”
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
              <button
                onClick={onTryDemo}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#8065FF] via-[#9F88FF] to-[#35D9F2] text-white font-semibold text-base shadow-lg shadow-[#8065FF]/30 hover:shadow-[#8065FF]/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                Try Live Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreFeatures}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#12192A] hover:bg-[#182136] border border-white/10 hover:border-white/20 text-[#F7F8FF] font-medium text-base transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                Explore Features
              </button>
            </div>

            {/* Free Download Link */}
            <div className="flex items-center gap-2 text-sm text-[#A7B0C5]">
              <span>Looking for the installer?</span>
              <a
                href={PRODUCT_IDENTITY.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#35D9F2] hover:text-[#B8A6FF] font-medium underline underline-offset-4 decoration-[#35D9F2]/50 hover:decoration-[#B8A6FF] transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Free Version
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>

          </div>

          {/* Right Column: Signature Visual & Floating Software Interface */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Central Signature Orb */}
              <AiOrb size="lg" state="connected" audioLevel={0.25} />

              {/* Floating Interface 1: User Request (Top Right) */}
              <div className="absolute -top-4 -right-2 sm:right-2 glass-panel-elevated p-3.5 rounded-2xl shadow-xl max-w-[240px] animate-float-gentle border border-white/15">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#8065FF]/30 flex items-center justify-center">
                    <Mic className="w-3 h-3 text-[#B8A6FF]" />
                  </div>
                  <span className="text-[11px] font-medium text-[#A7B0C5]">Spoken Query</span>
                </div>
                <p className="text-xs text-[#F7F8FF] leading-snug">
                  “Hello Aaji, what can you help me with today?”
                </p>
              </div>

              {/* Floating Interface 2: Status & Neural Engine (Bottom Left) */}
              <div className="absolute -bottom-6 -left-2 sm:left-2 glass-panel p-3.5 rounded-2xl shadow-xl max-w-[230px] border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-white tracking-wide">AI AAJI CORE</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#43D9A3] bg-[#43D9A3]/10 px-1.5 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#43D9A3] animate-pulse" />
                    Aoede Voice
                  </span>
                </div>
                
                {/* Simulated Audio Waveform Bar */}
                <div className="flex items-center gap-1 h-5 px-1 py-1 bg-black/30 rounded-lg">
                  <span className="w-1 h-2 bg-[#8065FF] rounded-full animate-pulse" />
                  <span className="w-1 h-3.5 bg-[#35D9F2] rounded-full animate-pulse" />
                  <span className="w-1 h-4 bg-white rounded-full animate-pulse" />
                  <span className="w-1 h-2 bg-[#8065FF] rounded-full animate-pulse" />
                  <span className="w-1 h-3 bg-[#35D9F2] rounded-full animate-pulse" />
                  <span className="w-1 h-1.5 bg-[#B8A6FF] rounded-full animate-pulse" />
                </div>
              </div>

              {/* Multimodal Capability Badges (Right Bottom) */}
              <div className="absolute right-0 bottom-8 flex flex-col gap-2">
                <div className="glass-pill px-3 py-1 rounded-full flex items-center gap-1.5 text-[11px] text-[#F7F8FF] border border-white/10 shadow-md">
                  <Mic className="w-3 h-3 text-[#35D9F2]" />
                  <span>Real-Time Voice</span>
                </div>
                <div className="glass-pill px-3 py-1 rounded-full flex items-center gap-1.5 text-[11px] text-[#F7F8FF] border border-white/10 shadow-md">
                  <Eye className="w-3 h-3 text-[#B8A6FF]" />
                  <span>Visual Context</span>
                </div>
                <div className="glass-pill px-3 py-1 rounded-full flex items-center gap-1.5 text-[11px] text-[#F7F8FF] border border-white/10 shadow-md">
                  <Sliders className="w-3 h-3 text-[#43D9A3]" />
                  <span>Task Automation</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
