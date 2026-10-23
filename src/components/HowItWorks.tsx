import React from 'react';
import { MessageSquareText, Cpu, CheckCircle } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/productData';

export const HowItWorks: React.FC = () => {
  const stepIcons = [
    <MessageSquareText key="1" className="w-6 h-6 text-[#8065FF]" />,
    <Cpu key="2" className="w-6 h-6 text-[#35D9F2]" />,
    <CheckCircle key="3" className="w-6 h-6 text-[#43D9A3]" />,
  ];

  return (
    <section id="how-it-works" className="py-24 relative bg-[#080B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12192A] border border-white/10 text-xs font-semibold text-[#8065FF] uppercase tracking-wider mb-4">
            Workflow Architecture
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            How AI Aaji works.
          </h2>
          <p className="text-base sm:text-lg text-[#A7B0C5]">
            Designed to bridge conversational intelligence and practical desktop utility in three straightforward steps.
          </p>
        </div>

        {/* 3 Steps: Desktop Horizontal, Mobile Vertical */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/3 left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-[#8065FF]/40 via-[#35D9F2]/40 to-[#43D9A3]/40 z-0" />

          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div
              key={step.step}
              className="glass-panel p-8 rounded-2xl border border-white/10 relative z-10 flex flex-col items-center text-center hover:border-white/20 transition-all duration-300 group"
            >
              {/* Step Number Badge */}
              <div className="w-14 h-14 rounded-2xl bg-[#182136] border border-white/15 flex items-center justify-center mb-6 shadow-lg shadow-black/40 group-hover:scale-105 transition-transform duration-300">
                {stepIcons[index]}
              </div>

              <span className="font-mono text-xs font-bold text-[#35D9F2] uppercase tracking-wider mb-2">
                Step {step.step}
              </span>

              <h3 className="font-heading text-2xl font-bold text-white mb-3">
                {step.title}
              </h3>

              <p className="text-sm text-[#A7B0C5] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
