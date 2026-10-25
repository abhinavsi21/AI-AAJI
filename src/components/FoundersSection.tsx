import React from 'react';
import { Code, Quote, Instagram, Sparkles, ExternalLink } from 'lucide-react';
import { FOUNDERS, FOUNDERS_SECTION_COPY, FOUNDER_MISSION_NOTE, PRODUCT_IDENTITY } from '../data/productData';
import { useTheme } from '../context/ThemeContext';
import { EditorialStar } from './EditorialStar';

export const FoundersSection: React.FC = () => {
  const { isEditorial } = useTheme();

  return (
    <section id="founders" className="py-24 relative bg-[var(--bg-main)] border-t border-[var(--border-subtle)] overflow-hidden theme-transition">
      {/* Background Ambient Glows strictly contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[var(--ambient-glow-1)] rounded-full blur-[100px] sm:blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-[var(--ambient-glow-2)] rounded-full blur-[90px] sm:blur-[140px]" />

        {isEditorial && (
          <>
            <div className="absolute top-16 right-16 text-[var(--accent-secondary)] select-none opacity-45">
              <EditorialStar className="w-6 h-6" />
            </div>
            <div className="absolute bottom-20 left-12 text-[var(--accent-secondary)] select-none opacity-40">
              <EditorialStar className="w-5 h-5" />
            </div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span>{FOUNDERS_SECTION_COPY.eyebrow}</span>
            {isEditorial && <EditorialStar className="w-3 h-3 text-[var(--accent-secondary)]" />}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] tracking-tight mb-5 leading-tight">
            {FOUNDERS_SECTION_COPY.heading}
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {FOUNDERS_SECTION_COPY.supporting}
          </p>
        </div>

        {/* Editorial Founder Cards (Two-Column Showcase) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto mb-16 items-stretch">
          {FOUNDERS.map((founder) => (
            <div
              key={founder.name}
              className="glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-[var(--border-elevated)] hover:border-[var(--accent-primary)]/40 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between shadow-2xl relative overflow-hidden"
            >
              {/* Subtle accent hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/0 via-transparent to-[var(--accent-secondary)]/0 group-hover:from-[var(--accent-primary)]/5 group-hover:to-[var(--accent-secondary)]/5 transition-all duration-500 pointer-events-none" />

              <div>
                {/* Photo & Identity Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
                  {/* Real Portrait Image Container */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden p-[2px] badge-gradient shadow-xl shrink-0 group-hover:scale-[1.02] transition-transform duration-300">
                    <img
                      src={founder.imagePath}
                      alt={founder.name}
                      className="w-full h-full object-cover object-top rounded-[14px]"
                      onError={(e) => {
                        // Fallback placeholder if asset loading has issue
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full bg-[var(--bg-main)] flex items-center justify-center font-heading font-bold text-2xl text-[var(--accent-primary)]">${founder.avatarPlaceholder}</div>`;
                        }
                      }}
                    />
                  </div>

                  {/* Role & Name */}
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--glass-pill-bg)] border border-[var(--border-subtle)] text-[11px] font-semibold text-[var(--accent-secondary)] mb-2 uppercase tracking-wide">
                      {founder.roleLabel}
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text-main)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {founder.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[var(--accent-primary)] mt-0.5">
                      {founder.role}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      {founder.title}
                    </p>
                  </div>
                </div>

                {/* Biography */}
                <div className="space-y-3 mb-6">
                  {founder.bio.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Card Footer: Developer credential & verified links */}
              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-1.5 text-[var(--accent-secondary)] font-medium">
                  <Code className="w-3.5 h-3.5" />
                  <span>Developer & Technical Builder</span>
                </div>

                {founder.socials?.instagram && (
                  <a
                    href={founder.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--glass-pill-bg)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:border-[var(--accent-primary)]/40 hover:bg-[var(--accent-primary)]/10 transition-all group/link cursor-pointer"
                    aria-label={`Follow ${founder.name} on Instagram`}
                  >
                    <Instagram className="w-3.5 h-3.5 text-[var(--accent-primary)] group-hover/link:text-[var(--text-main)]" />
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
        <div className="max-w-3xl mx-auto glass-panel-elevated p-8 sm:p-12 rounded-3xl border border-[var(--border-elevated)] shadow-2xl relative text-center gradient-border-glow">
          <Quote className="w-9 h-9 text-[var(--accent-primary)]/40 mx-auto mb-4" />
          <p className="font-heading text-lg sm:text-xl text-[var(--text-main)] font-medium leading-relaxed italic mb-5">
            {FOUNDER_MISSION_NOTE}
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[var(--accent-secondary)]" />
            <span className="text-xs text-[var(--accent-secondary)] font-semibold tracking-wider uppercase">
              Abhinav Singh & Tanisha Kolhar — Co-Founders, AI Aaji
            </span>
            <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[var(--accent-secondary)]" />
          </div>

          <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--text-secondary)]">
            <a
              href={PRODUCT_IDENTITY.officialInstagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--accent-primary)] hover:text-[var(--text-main)] transition-colors font-medium"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Official: {PRODUCT_IDENTITY.officialInstagramHandle}</span>
            </a>
            <span className="text-[var(--border-subtle)]">•</span>
            <a
              href="https://www.instagram.com/abhinavsinghofficial21/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors font-mono"
            >
              <span>Abhinav: @abhinavsinghofficial21</span>
            </a>
            <span className="text-[var(--border-subtle)]">•</span>
            <a
              href="https://www.instagram.com/tanu_here_10/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors font-mono"
            >
              <span>Tanisha: @tanu_here_10</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
