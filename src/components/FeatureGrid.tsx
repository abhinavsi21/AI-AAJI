import React from 'react';
import { Mic, Eye, Zap, Laptop, Compass, Sparkles } from 'lucide-react';
import { FEATURES } from '../data/productData';

export const FeatureGrid: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Mic: <Mic className="w-6 h-6 text-[#8065FF]" />,
    Eye: <Eye className="w-6 h-6 text-[#35D9F2]" />,
    Zap: <Zap className="w-6 h-6 text-[#B8A6FF]" />,
    Laptop: <Laptop className="w-6 h-6 text-[#43D9A3]" />,
    Compass: <Compass className="w-6 h-6 text-[#35D9F2]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#8065FF]" />,
  };

  return (
    <section id="features" className="py-24 relative bg-[#080B14]">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#8065FF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#35D9F2]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12192A] border border-white/10 text-xs font-semibold text-[#B8A6FF] uppercase tracking-wider mb-4">
            Capabilities & Architecture
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
            More than answers. <br />
            <span className="gradient-text-accent">An assistant for everyday tasks.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A7B0C5]">
            Engineered to bring conversational AI closer to the natural way people think, speak, and work with digital environments.
          </p>
        </div>

        {/* Feature Cards Grid (6 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.number}
              className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group relative flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8065FF]/0 via-[#8065FF]/0 to-[#35D9F2]/0 group-hover:from-[#8065FF]/5 group-hover:to-[#35D9F2]/5 transition-all duration-500 pointer-events-none" />

              <div>
                {/* Header: Number and Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-[#8065FF] bg-[#8065FF]/10 px-2.5 py-1 rounded-md">
                    {feature.number}
                  </span>
                  <span className="text-[11px] font-medium text-[#A7B0C5] bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    {feature.tag}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#182136] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {iconMap[feature.iconName] || <Sparkles className="w-6 h-6 text-[#8065FF]" />}
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-[#B8A6FF] transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#A7B0C5] leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#A7B0C5]">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      feature.status === 'available'
                        ? 'bg-[#43D9A3]'
                        : 'bg-[#35D9F2]'
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
