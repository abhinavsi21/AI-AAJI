import React from 'react';
import { Code, Quote, Instagram, Sparkles, ExternalLink } from 'lucide-react';
import { FOUNDERS, FOUNDERS_SECTION_COPY, FOUNDER_MISSION_NOTE, PRODUCT_IDENTITY } from '../data/productData';

export const FoundersSection: React.FC = () => {
  return (
    <section id="founders" className="py-24 relative bg-[#080B14] border-t border-white/5 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#8065FF]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#35D9F2]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#182136] border border-white/10 text-xs font-semibold text-[#B8A6FF] uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#35D9F2]" />
            {FOUNDERS_SECTION_COPY.eyebrow}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
            {FOUNDERS_SECTION_COPY.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#A7B0C5] leading-relaxed">
            {FOUNDERS_SECTION_COPY.supporting}
          </p>
        </div>

        {/* Editorial Founder Cards (Substantial Two-Column Showcase) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto mb-16 items-stretch">
          {FOUNDERS.map((founder) => (
            <div
              key={founder.name}
              className="glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between shadow-2xl relative overflow-hidden"
            >
              {/* Subtle accent hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8065FF]/0 via-transparent to-[#35D9F2]/0 group-hover:from-[#8065FF]/5 group-hover:to-[#35D9F2]/5 transition-all duration-500 pointer-events-none" />

              <div>
                {/* Photo & Identity Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
                  {/* Real Portrait Image Container */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden p-[2px] bg-gradient-to-tr from-[#8065FF] via-[#B8A6FF] to-[#35D9F2] shadow-xl shrink-0 group-hover:scale-[1.02] transition-transform duration-300">
                    <img
                      src={founder.imagePath}
                      alt={founder.name}
                      className="w-full h-full object-cover object-top rounded-[14px]"
                      onError={(e) => {
                        // Fallback placeholder if asset loading has issue
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full bg-[#080B14] flex items-center justify-center font-heading font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-tr from-[#8065FF] to-[#35D9F2]">${founder.avatarPlaceholder}</div>`;
                        }
                      }}
                    />
                  </div>

                  {/* Role & Name */}
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-[#35D9F2] mb-2 uppercase tracking-wide">
                      {founder.roleLabel}
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white group-hover:text-[#B8A6FF] transition-colors">
                      {founder.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#B8A6FF] mt-0.5">
                      {founder.role}
                    </p>
                    <p className="text-xs text-[#A7B0C5] mt-0.5">
                      {founder.title}
                    </p>
                  </div>
                </div>

                {/* Refined Biography */}
                <div className="space-y-3 mb-6">
                  {founder.bio.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-sm text-[#A7B0C5] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Card Footer: Developer credential & verified links */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#A7B0C5]">
                <div className="flex items-center gap-1.5 text-[#35D9F2] font-medium">
                  <Code className="w-3.5 h-3.5" />
                  <span>Developer & Technical Builder</span>
                </div>

                {founder.socials?.instagram && (
                  <a
                    href={founder.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#A7B0C5] hover:text-white hover:border-[#8065FF]/40 hover:bg-[#8065FF]/10 transition-all group/link cursor-pointer"
                    aria-label={`Follow ${founder.name} on Instagram`}
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#B8A6FF] group-hover/link:text-white" />
                    <span className="text-[11px] font-mono">
                      {founder.name.includes('Abhinav') ? '@abhinavsinghofficial21' : '@tanu_here_10'}
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Shared Founder Product Philosophy Statement */}
        <div className="max-w-3xl mx-auto glass-panel-elevated p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl relative text-center gradient-border-glow">
          <Quote className="w-9 h-9 text-[#8065FF]/40 mx-auto mb-4" />
          <p className="font-heading text-lg sm:text-xl text-[#F7F8FF] font-medium leading-relaxed italic mb-5">
            {FOUNDER_MISSION_NOTE}
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#35D9F2]" />
            <span className="text-xs text-[#35D9F2] font-semibold tracking-wider uppercase">
              Abhinav Singh & Tanisha Kolhar — Co-Founders, AI Aaji
            </span>
            <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#35D9F2]" />
          </div>

          <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center justify-center gap-4 text-xs text-[#A7B0C5]">
            <a
              href={PRODUCT_IDENTITY.officialInstagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#B8A6FF] hover:text-white transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Official: {PRODUCT_IDENTITY.officialInstagramHandle}</span>
            </a>
            <span className="text-white/20">•</span>
            <a
              href="https://www.instagram.com/abhinavsinghofficial21/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#A7B0C5] hover:text-white transition-colors font-mono"
            >
              <span>Abhinav: @abhinavsinghofficial21</span>
            </a>
            <span className="text-white/20">•</span>
            <a
              href="https://www.instagram.com/tanu_here_10/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#A7B0C5] hover:text-white transition-colors font-mono"
            >
              <span>Tanisha: @tanu_here_10</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
