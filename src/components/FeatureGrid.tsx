import React from 'react';
import { Mic, Eye, Zap, Laptop, Compass, Sparkles } from 'lucide-react';
import { FEATURES } from '../data/productData';
import { useTheme } from '../context/ThemeContext';
import { EditorialStar } from './EditorialStar';

export const FeatureGrid: React.FC = () => {
  const { isEditorial } = useTheme();

  const iconMap: Record<string, React.ReactNode> = {
    Mic: <Mic className="w-6 h-6 text-[var(--accent-primary)]" />,
    Eye: <Eye className="w-6 h-6 text-[var(--accent-secondary)]" />,
    Zap: <Zap className="w-6 h-6 text-[var(--accent-highlight)]" />,
    Laptop: <Laptop className="w-6 h-6 text-[var(--status-success)]" />,
    Compass: <Compass className="w-6 h-6 text-[var(--accent-secondary)]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[var(--accent-primary)]" />,
  };

  return (
    <section id="features" className="py-24 relative bg-[var(--bg-main)] overflow-hidden theme-transition">
      {/* Background accents strictly contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-[var(--ambient-glow-1)] rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-10 right-0 w-72 h-72 bg-[var(--ambient-glow-2)] rounded-full blur-[100px] sm:blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4 shadow-sm">
            <span>Capabilities & Architecture</span>
            {isEditorial && <EditorialStar className="w-3 h-3 text-[var(--accent-secondary)]" />}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] tracking-tight mb-4 leading-tight">
            More than answers. <br />
            <span className="gradient-text-accent">An assistant for everyday tasks.</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">
            Engineered to bring conversational AI closer to the natural way people think, speak, and work with digital environments.
          </p>
        </div>

        {/* Feature Cards Grid (6 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.number}
              className="glass-panel p-8 rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--border-elevated)] transition-all duration-300 hover:-translate-y-1 group relative flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/0 via-transparent to-[var(--accent-secondary)]/0 group-hover:from-[var(--accent-primary)]/5 group-hover:to-[var(--accent-secondary)]/5 transition-all duration-500 pointer-events-none" />

              <div>
                {/* Header: Number and Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2.5 py-1 rounded-md">
                    {feature.number}
                  </span>
                  <span className="text-[11px] font-medium text-[var(--text-secondary)] bg-[var(--glass-pill-bg)] px-2.5 py-1 rounded-full border border-[var(--border-subtle)]">
                    {feature.tag}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  {iconMap[feature.iconName] || <Sparkles className="w-6 h-6 text-[var(--accent-primary)]" />}
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-[var(--text-main)] mb-3 group-hover:text-[var(--accent-primary)] transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      feature.status === 'available'
                        ? 'bg-[var(--status-success)]'
                        : 'bg-[var(--accent-secondary)]'
                    }`}
                  />
                  {feature.status === 'available' ? 'Available' : 'Supported Systems'}
                </span>
                <span className="text-[11px] opacity-75">Verified Feature</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
