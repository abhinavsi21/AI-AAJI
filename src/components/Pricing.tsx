import React, { useState } from 'react';
import { Check, ArrowRight, Download, Sparkles, HelpCircle, ExternalLink, Mail } from 'lucide-react';
import { PRICING_PLANS, PricingPlan, PRODUCT_IDENTITY } from '../data/productData';
import { PurchaseModal } from './PurchaseModal';
import { useTheme } from '../context/ThemeContext';
import { EditorialStar } from './EditorialStar';

export const Pricing: React.FC = () => {
  const { isEditorial } = useTheme();
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<PricingPlan | null>(null);

  const getGlowClass = (accent: string) => {
    switch (accent) {
      case 'cyan':
        return 'pricing-card-interactive pricing-card-cyan';
      case 'violet':
        return 'pricing-card-interactive pricing-card-violet';
      case 'gradient':
      default:
        return 'pricing-card-interactive pricing-card-gradient';
    }
  };

  const getMailtoUrl = (plan: PricingPlan) => {
    return `mailto:${PRODUCT_IDENTITY.contactEmail}?subject=${encodeURIComponent(
      plan.mailtoSubject || ''
    )}&body=${encodeURIComponent(plan.mailtoBody || '')}`;
  };

  return (
    <section id="pricing" className="py-24 relative bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] overflow-hidden theme-transition">
      {/* Background ambient lighting strictly contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[var(--ambient-glow-1)] rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[var(--ambient-glow-2)] rounded-full blur-[100px] sm:blur-[140px]" />

        {isEditorial && (
          <>
            <div className="absolute top-20 right-20 text-[var(--accent-secondary)] select-none opacity-40">
              <EditorialStar className="w-6 h-6" />
            </div>
            <div className="absolute bottom-24 left-16 text-[var(--accent-secondary)] select-none opacity-35">
              <EditorialStar className="w-5 h-5" />
            </div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4 shadow-sm">
            <span>Transparent Pricing</span>
            {isEditorial && <EditorialStar className="w-3 h-3 text-[var(--accent-secondary)]" />}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] tracking-tight mb-4">
            Start free. Choose what works for you.
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">
            “Explore AI Aaji for free or choose an edition that fits your needs.”
          </p>
        </div>

        {/* 3 Pricing Cards — ALL THREE GLOW ON HOVER */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => {
            const isPremium = plan.highlighted;
            const cardThemeClass = getGlowClass(plan.accentColor);

            return (
              <div
                key={plan.id}
                tabIndex={0}
                className={`rounded-3xl p-8 flex flex-col justify-between relative cursor-default ${cardThemeClass} ${
                  isPremium ? 'lg:-translate-y-2' : ''
                }`}
              >
                {/* Premium Badge */}
                {isPremium && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 badge-gradient text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md z-10">
                    {plan.badge || 'Most Capable'}
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="mb-6">
                    <h3 className="font-heading text-2xl font-bold text-[var(--text-main)] mb-2 flex items-center justify-between">
                      {plan.name}
                      {plan.accentColor === 'cyan' && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-secondary)] shadow-[0_0_8px_var(--accent-secondary)]" />
                      )}
                      {plan.accentColor === 'violet' && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]" />
                      )}
                      {plan.accentColor === 'gradient' && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--gradient-btn)] shadow-[0_0_8px_var(--accent-primary)]" />
                      )}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] min-h-[32px]">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-6 border-b border-[var(--border-subtle)] flex items-baseline gap-2">
                    <span className="font-heading text-5xl font-bold text-[var(--text-main)] tracking-tight">
                      {plan.priceDisplay}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)]">
                      {plan.priceInRupees === 0 ? 'Public Release' : 'Contact-to-purchase'}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3.5 mb-8">
                    <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider block mb-2">
                      Included Capabilities
                    </span>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[var(--status-success)]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-[var(--status-success)]" />
                        </div>
                        <span className="text-sm text-[var(--text-main)]/90 leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div>
                  {plan.ctaType === 'download' ? (
                    // Free Plan: Opens official Google Drive folder in a new tab
                    <a
                      href={PRODUCT_IDENTITY.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-xl font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] hover:border-[var(--accent-secondary)]/50 text-[var(--text-main)] border border-[var(--border-subtle)] group shadow-md"
                    >
                      <Download className="w-4 h-4 text-[var(--accent-secondary)] group-hover:scale-110 transition-transform" />
                      {plan.ctaLabel}
                      <ExternalLink className="w-3.5 h-3.5 opacity-60 ml-1" />
                    </a>
                  ) : (
                    // Paid Plans (Base & Premium): Direct email draft trigger + fallback modal opener
                    <div className="space-y-2">
                      <a
                        href={getMailtoUrl(plan)}
                        onClick={() => {
                          // Also open helper modal so user has fallback if default mail client doesn't pop up
                          setTimeout(() => setSelectedPlanForModal(plan), 300);
                        }}
                        className={`w-full py-4 rounded-xl font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 text-white shadow-lg ${
                          isPremium
                            ? 'btn-gradient shadow-[var(--accent-primary)]/25 hover:shadow-[var(--accent-primary)]/45'
                            : 'bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] border border-[var(--accent-primary)]/40 hover:border-[var(--accent-primary)] text-[var(--text-main)]'
                        }`}
                      >
                        <Mail className={`w-4 h-4 ${isPremium ? 'text-white' : 'text-[var(--accent-primary)]'}`} />
                        {plan.ctaLabel}
                      </a>

                      <button
                        type="button"
                        onClick={() => setSelectedPlanForModal(plan)}
                        className="w-full text-center text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors cursor-pointer py-1 flex items-center justify-center gap-1.5"
                      >
                        <HelpCircle className="w-3 h-3 text-[var(--accent-secondary)]" />
                        <span>Webmail, Gmail & copy fallback options</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Contact Note */}
        <div className="mt-12 text-center text-xs text-[var(--text-secondary)] max-w-xl mx-auto space-y-1">
          <p>
            Purchases currently occur via direct email enquiry with founders Abhinav Singh and Tanisha Kolhar at{' '}
            <a
              href={`mailto:${PRODUCT_IDENTITY.contactEmail}`}
              className="text-[var(--accent-secondary)] hover:underline font-mono"
            >
              {PRODUCT_IDENTITY.contactEmail}
            </a>
            .
          </p>
          <p className="text-[11px] text-[var(--text-muted)]">
            Free installers are distributed through our official Google Drive folder for Windows, macOS, and Linux.
          </p>
        </div>

      </div>

      {/* Fallback & Webmail Compose Purchase Modal */}
      <PurchaseModal
        plan={selectedPlanForModal}
        onClose={() => setSelectedPlanForModal(null)}
      />
    </section>
  );
};
