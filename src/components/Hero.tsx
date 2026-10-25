import React from 'react';
import { Sparkles, ArrowRight, Download, Mic, Eye, Sliders, ExternalLink } from 'lucide-react';
import { AiOrb } from './AiOrb';
import { PRODUCT_IDENTITY } from '../data/productData';
import { useTheme } from '../context/ThemeContext';
import { EditorialStar } from './EditorialStar';

interface HeroProps {
  onTryDemo: () => void;
  onExploreFeatures: () => void;
  onDownload: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTryDemo, onExploreFeatures, onDownload }) => {
  const { isEditorial } = useTheme();

  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-[var(--bg-main)] bg-grid-pattern theme-transition">
      {/* Background ambient lighting strictly contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-[var(--ambient-glow-1)] rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute top-1/3 right-4 sm:right-10 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-[var(--ambient-glow-2)] rounded-full blur-[90px] sm:blur-[120px]" />

        {/* Editorial Decorative Background Accent for Warm Editorial */}
        {isEditorial && (
          <>
            <div className="absolute top-20 right-1/4 text-[var(--accent-secondary)] select-none opacity-40 animate-pulse-subtle">
              <EditorialStar className="w-6 h-6" />
            </div>
            <div className="absolute bottom-24 left-12 text-[var(--accent-secondary)] select-none opacity-30">
              <EditorialStar className="w-5 h-5" />
            </div>
            <div className="absolute top-1/2 left-8 w-40 h-40 rounded-full bg-[var(--accent-peach)]/30 blur-3xl" />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)] mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] animate-ping" />
              <span>MEET YOUR EVERYDAY AI ASSISTANT</span>
              {isEditorial && <EditorialStar className="w-3 h-3 text-[var(--accent-secondary)]" />}
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-main)] leading-[1.1] mb-6">
              Meet AI Aaji. <br />
              <span className="gradient-text-accent">Your world, a little easier.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl font-normal leading-relaxed mb-8">
              “Talk naturally. Explore ideas. Get help with everyday digital tasks. Meet an AI assistant designed to bring voice, intelligence, and automation together.”
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
              <button
                onClick={onTryDemo}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full btn-gradient font-semibold text-base shadow-lg shadow-[var(--accent-primary)]/25 hover:shadow-[var(--accent-primary)]/45 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                Try Live Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreFeatures}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-elevated)] text-[var(--text-main)] font-medium text-base transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                Explore Features
              </button>
            </div>

            {/* Free Download Link */}
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <span>Looking for the installer?</span>
              <a
                href={PRODUCT_IDENTITY.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent-secondary)] hover:text-[var(--accent-primary)] font-medium underline underline-offset-4 decoration-[var(--accent-secondary)]/50 hover:decoration-[var(--accent-primary)] transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Free Version
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>

          </div>

          {/* Right Column: Signature Visual & Floating Software Interface */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full">
            
            <div className="relative w-full max-w-[320px] sm:max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Central Signature Orb */}
              <AiOrb size="lg" state="connected" audioLevel={0.25} />

              {/* Floating Interface 1: User Request (Top Right) */}
              <div className="absolute -top-4 right-0 sm:right-2 glass-panel-elevated p-2.5 sm:p-3.5 rounded-2xl shadow-xl max-w-[190px] sm:max-w-[240px] animate-float-gentle border border-[var(--border-elevated)]">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
                    <Mic className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[var(--accent-primary)]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-[var(--text-secondary)]">Spoken Query</span>
                </div>
                <p className="text-[11px] sm:text-xs text-[var(--text-main)] leading-snug">
                  “Hello Aaji, what can you help me with today?”
                </p>
              </div>

              {/* Floating Interface 2: Status & Neural Engine (Bottom Left) */}
              <div className="absolute -bottom-4 sm:-bottom-6 left-0 sm:left-2 glass-panel p-2.5 sm:p-3.5 rounded-2xl shadow-xl max-w-[180px] sm:max-w-[230px] border border-[var(--border-subtle)]">
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-[var(--text-main)] tracking-wide">AI AAJI CORE</span>
                  <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-[var(--status-success)] bg-[var(--status-success)]/10 px-1.5 py-0.5 rounded font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-success)] animate-pulse" />
                    Aoede Voice
                  </span>
                </div>
                
                {/* Audio Waveform Bar */}
                <div className="flex items-center gap-1 h-4 sm:h-5 px-1 py-1 bg-[var(--bg-elevated)] rounded-lg">
                  <span className="w-1 h-2 bg-[var(--accent-primary)] rounded-full animate-pulse" />
                  <span className="w-1 h-3.5 bg-[var(--accent-secondary)] rounded-full animate-pulse" />
                  <span className="w-1 h-4 bg-[var(--accent-highlight)] rounded-full animate-pulse" />
                  <span className="w-1 h-2 bg-[var(--accent-primary)] rounded-full animate-pulse" />
                  <span className="w-1 h-3 bg-[var(--accent-secondary)] rounded-full animate-pulse" />
                  <span className="w-1 h-1.5 bg-[var(--accent-highlight)] rounded-full animate-pulse" />
                </div>
              </div>

              {/* Multimodal Capability Badges (Right Bottom) */}
              <div className="absolute right-0 bottom-4 sm:bottom-8 flex flex-col gap-1.5 sm:gap-2">
                <div className="glass-pill px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[var(--text-main)] border border-[var(--border-subtle)] shadow-md">
                  <Mic className="w-3 h-3 text-[var(--accent-secondary)]" />
                  <span>Real-Time Voice</span>
                </div>
                <div className="glass-pill px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[var(--text-main)] border border-[var(--border-subtle)] shadow-md">
                  <Eye className="w-3 h-3 text-[var(--accent-primary)]" />
                  <span>Visual Context</span>
                </div>
                <div className="glass-pill px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[var(--text-main)] border border-[var(--border-subtle)] shadow-md">
                  <Sliders className="w-3 h-3 text-[var(--status-success)]" />
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
