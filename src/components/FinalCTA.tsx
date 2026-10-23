import React from 'react';
import { Sparkles, Download, Mail, ArrowRight } from 'lucide-react';
import { AiOrb } from './AiOrb';
import { PRODUCT_IDENTITY } from '../data/productData';

interface FinalCTAProps {
  onTalkToAaji: () => void;
  onDownload?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onTalkToAaji }) => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#080B14] to-[#0D1220] border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#8065FF]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Central Ambient Orb */}
        <div className="mb-8 flex justify-center">
          <AiOrb size="md" state="connected" audioLevel={0.15} />
        </div>

        {/* Headline */}
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 max-w-2xl mx-auto leading-tight">
          A more natural way to work with AI.
        </h2>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg text-[#A7B0C5] max-w-xl mx-auto mb-10 leading-relaxed">
          “Discover AI Aaji, experience a live conversation, and explore the version that suits you.”
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button
            onClick={onTalkToAaji}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#8065FF] via-[#9F88FF] to-[#35D9F2] text-white font-semibold text-base shadow-xl shadow-[#8065FF]/30 hover:shadow-[#8065FF]/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 group"
          >
            <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
            Talk to AI Aaji
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={PRODUCT_IDENTITY.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 rounded-full bg-[#12192A] hover:bg-[#182136] border border-white/10 hover:border-white/20 text-[#F7F8FF] font-medium text-base transition-all cursor-pointer flex items-center gap-2 group"
          >
            <Download className="w-4 h-4 text-[#35D9F2] group-hover:scale-110 transition-transform" />
            Download Free
          </a>
        </div>

        {/* Small contact link */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#A7B0C5]">
          <span>Direct enquiries & feedback:</span>
          <a
            href={`mailto:${PRODUCT_IDENTITY.contactEmail}`}
            className="text-[#35D9F2] hover:underline font-mono inline-flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            {PRODUCT_IDENTITY.contactEmail}
          </a>
        </div>

      </div>
    </section>
  );
};
