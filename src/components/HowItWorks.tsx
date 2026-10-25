import React from 'react';
import { MessageSquareText, Cpu, CheckCircle } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/productData';
import { useTheme } from '../context/ThemeContext';
import { EditorialStar } from './EditorialStar';

export const HowItWorks: React.FC = () => {
  const { isEditorial } = useTheme();

  const stepIcons = [
    <MessageSquareText key="1" className="w-6 h-6 text-[var(--accent-primary)]" />,
    <Cpu key="2" className="w-6 h-6 text-[var(--accent-secondary)]" />,
    <CheckCircle key="3" className="w-6 h-6 text-[var(--status-success)]" />,
  ];

  return (
    <section id="how-it-works" className="py-24 relative bg-[var(--bg-main)] overflow-hidden theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4 shadow-sm">
            <span>Workflow Architecture</span>
            {isEditorial && <EditorialStar className="w-3 h-3 text-[var(--accent-secondary)]" />}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] tracking-tight mb-4">
            How AI Aaji works.
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">
            Designed to bridge conversational intelligence and practical desktop utility in three straightforward steps.
          </p>
        </div>

        {/* 3 Steps: Desktop Horizontal, Mobile Vertical */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/3 left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-[var(--accent-primary)]/40 via-[var(--accent-secondary)]/40 to-[var(--status-success)]/40 z-0" />

          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div
              key={step.step}
              className="glass-panel p-8 rounded-2xl border border-[var(--border-subtle)] relative z-10 flex flex-col items-center text-center hover:border-[var(--border-elevated)] transition-all duration-300 group shadow-lg"
            >
              {/* Step Number Badge */}
              <div className="w-14 h-14 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform duration-300">
                {stepIcons[index]}
              </div>

              <span className="font-mono text-xs font-bold text-[var(--accent-secondary)] uppercase tracking-wider mb-2">
                Step {step.step}
              </span>

              <h3 className="font-heading text-2xl font-bold text-[var(--text-main)] mb-3">
                {step.title}
              </h3>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
