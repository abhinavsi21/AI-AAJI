import React from 'react';
import { Sparkles, Download, Mail, ArrowRight } from 'lucide-react';
import { AiOrb } from './AiOrb';
import { PRODUCT_IDENTITY } from '../data/productData';
import { useTheme } from '../context/ThemeContext';
import { EditorialStar } from './EditorialStar';

interface FinalCTAProps {
  onTalkToAaji: () => void;
  onDownload?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onTalkToAaji }) => {
  const { isEditorial } = useTheme();

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[var(--bg-main)] to-[var(--bg-secondary)] border-t border-[var(--border-subtle)] theme-transition">
      {/* Background Lighting strictly contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[700px] h-[340px] sm:h-[700px] bg-[var(--ambient-glow-1)] rounded-full blur-[100px] sm:blur-[160px]" />

        {isEditorial && (
          <>
            <div className="absolute top-12 left-1/4 text-[var(--accent-secondary)] select-none opacity-40">
              <EditorialStar className="w-6 h-6" />
            </div>
            <div className="absolute bottom-16 right-1/4 text-[var(--accent-secondary)] select-none opacity-35">
              <EditorialStar className="w-5 h-5" />
            </div>
          </>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Central Ambient Orb */}
        <div className="mb-8 flex justify-center">
          <AiOrb size="md" state="connected" audioLevel={0.15} />
        </div>

        {/* Headline */}
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] tracking-tight mb-6 max-w-2xl mx-auto leading-tight">
          A more natural way to work with AI.
        </h2>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-10 leading-relaxed">
          “Discover AI Aaji, experience a live conversation, and explore the version that suits you.”
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button
            onClick={onTalkToAaji}
            className="px-8 py-4 rounded-full btn-gradient font-semibold text-base shadow-xl shadow-[var(--accent-primary)]/25 hover:shadow-[var(--accent-primary)]/45 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 group"
          >
            <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
            Talk to AI Aaji
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={PRODUCT_IDENTITY.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 rounded-full bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-elevated)] text-[var(--text-main)] font-medium text-base transition-all cursor-pointer flex items-center gap-2 group shadow-md"
          >
            <Download className="w-4 h-4 text-[var(--accent-secondary)] group-hover:scale-110 transition-transform" />
            Download Free
          </a>
        </div>

        {/* Small contact link */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--text-secondary)]">
          <span>Direct enquiries & feedback:</span>
          <a
            href={`mailto:${PRODUCT_IDENTITY.contactEmail}`}
            className="text-[var(--accent-secondary)] hover:underline font-mono inline-flex items-center gap-1 font-medium"
          >
            <Mail className="w-3.5 h-3.5" />
            {PRODUCT_IDENTITY.contactEmail}
          </a>
        </div>

      </div>
    </section>
  );
};
