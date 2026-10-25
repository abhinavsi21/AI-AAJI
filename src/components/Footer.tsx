import React, { useState } from 'react';
import { Mail, Sparkles, X, Shield, FileText, Instagram, ExternalLink } from 'lucide-react';
import { PRODUCT_IDENTITY } from '../data/productData';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] pt-16 pb-12 text-[var(--text-secondary)] text-sm theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" />

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm">
              An intelligent AI personal assistant engineered by Abhinav Singh and Tanisha Kolhar to bring conversational voice, multimodal intelligence, and desktop automation into everyday workflows.
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center gap-2 text-[var(--text-main)]">
                <Mail className="w-4 h-4 text-[var(--accent-secondary)]" />
                <a href={`mailto:${PRODUCT_IDENTITY.contactEmail}`} className="hover:text-[var(--accent-primary)] hover:underline font-mono">
                  {PRODUCT_IDENTITY.contactEmail}
                </a>
              </div>

              <div className="flex items-center gap-2 text-[var(--text-main)]">
                <Instagram className="w-4 h-4 text-[var(--accent-primary)]" />
                <a
                  href={PRODUCT_IDENTITY.officialInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-primary)] hover:underline font-mono inline-flex items-center gap-1"
                  aria-label="Official AI Aaji Instagram profile"
                >
                  {PRODUCT_IDENTITY.officialInstagramHandle}
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[var(--text-secondary)]">
                <span className="opacity-70">Founders:</span>
                <a
                  href="https://www.instagram.com/abhinavsinghofficial21/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-primary)] transition-colors font-mono inline-flex items-center gap-0.5"
                >
                  <span>@abhinavsinghofficial21</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
                <span className="opacity-40">•</span>
                <a
                  href="https://www.instagram.com/tanu_here_10/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-primary)] transition-colors font-mono inline-flex items-center gap-0.5"
                >
                  <span>@tanu_here_10</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-heading font-semibold text-[var(--text-main)] text-xs uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="hover:text-[var(--text-main)] transition-colors cursor-pointer"
                >
                  Features & Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('live-demo')}
                  className="hover:text-[var(--text-main)] transition-colors cursor-pointer"
                >
                  Live Gemini Realtime Voice Demo
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="hover:text-[var(--text-main)] transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="hover:text-[var(--text-main)] transition-colors cursor-pointer"
                >
                  Pricing Plans (Free, Base, Premium)
                </button>
              </li>
            </ul>
          </div>

          {/* Product & Team */}
          <div>
            <h4 className="font-heading font-semibold text-[var(--text-main)] text-xs uppercase tracking-wider mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('founders')}
                  className="hover:text-[var(--text-main)] transition-colors cursor-pointer"
                >
                  Founders & Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('download')}
                  className="hover:text-[var(--text-main)] transition-colors cursor-pointer"
                >
                  Free Software Download
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="hover:text-[var(--text-main)] transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <a
                  href={`mailto:${PRODUCT_IDENTITY.contactEmail}?subject=AI%20Aaji%20General%20Enquiry`}
                  className="hover:text-[var(--text-main)] transition-colors"
                >
                  Direct Email Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Drafts */}
          <div>
            <h4 className="font-heading font-semibold text-[var(--text-main)] text-xs uppercase tracking-wider mb-4">
              Transparency
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setLegalModal('privacy')}
                  className="hover:text-[var(--text-main)] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-[var(--status-success)]" />
                  Privacy Draft
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModal('terms')}
                  className="hover:text-[var(--text-main)] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  Terms of Use Draft
                </button>
              </li>
              <li>
                <span className="text-[11px] text-[var(--text-muted)] block pt-1">
                  Draft policies subject to review prior to public commercial launch.
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-center sm:text-left">
          <p className="text-[var(--text-secondary)]">
            © {currentYear} {PRODUCT_IDENTITY.brandName}. Created by Abhinav Singh & Tanisha Kolhar. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 text-[11px] text-[var(--text-muted)]">
            <span>Powered by Google Gemini Realtime Voice</span>
            <span className="opacity-40">•</span>
            <span className="text-[var(--text-secondary)] font-medium">Powered by EpicForce.ai</span>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {legalModal === 'privacy' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[var(--bg-card)] rounded-3xl p-6 sm:p-8 border border-[var(--border-elevated)] shadow-2xl">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--glass-pill-bg)] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-[var(--status-success)]" />
              <h3 className="font-heading text-xl font-bold text-[var(--text-main)]">Privacy Policy Draft</h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mb-6">
              Review draft for AI Aaji website and software services. Last updated: October 2026.
            </p>

            <div className="space-y-4 text-xs text-[var(--text-secondary)] leading-relaxed">
              <p>
                <strong className="text-[var(--text-main)]">1. Audio & Spoken Data:</strong> Microphone audio transmitted during the Live Voice Demo is streamed directly to the real-time model session and is never permanently recorded, logged, or saved to persistent storage on our servers.
              </p>
              <p>
                <strong className="text-[var(--text-main)]">2. Contact Enquiries:</strong> Any details provided in purchase enquiries sent to <code className="text-[var(--accent-primary)] font-mono">aiaajiofficial@gmail.com</code> are used solely for fulfilling your license requests and answering technical inquiries.
              </p>
              <p>
                <strong className="text-[var(--text-main)]">3. Analytics & Telemetry:</strong> The website does not sell personal visitor data or deploy intrusive ad tracking pixels.
              </p>
              <p>
                <strong className="text-[var(--text-main)]">4. Software Permissions:</strong> Desktop client installations request only the operating system permissions necessary to execute supported voice, multimodal, and shortcut tasks.
              </p>
              <p>
                <strong className="text-[var(--text-main)]">5. Direct Contact:</strong> For any privacy-related queries or data deletion requests, contact founders Abhinav Singh and Tanisha Kolhar at <code className="text-[var(--accent-primary)] font-mono">aiaajiofficial@gmail.com</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Use Modal */}
      {legalModal === 'terms' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[var(--bg-card)] rounded-3xl p-6 sm:p-8 border border-[var(--border-elevated)] shadow-2xl">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--glass-pill-bg)] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-[var(--accent-primary)]" />
              <h3 className="font-heading text-xl font-bold text-[var(--text-main)]">Terms of Use Draft</h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mb-6">
              Review draft governing access to AI Aaji and related software editions.
            </p>

            <div className="space-y-4 text-xs text-[var(--text-secondary)] leading-relaxed">
              <p>
                <strong className="text-[var(--text-main)]">1. Acceptance of Terms:</strong> By accessing the AI Aaji website, running the live voice demo, or downloading available software packages, you agree to these terms.
              </p>
              <p>
                <strong className="text-[var(--text-main)]">2. License Editions:</strong> The Free tier permits personal exploration. Base (₹399) and Premium (₹699) licenses are granted upon completion of email enquiry and confirmed distribution from the founders.
              </p>
              <p>
                <strong className="text-[var(--text-main)]">3. Experimental AI Assistance:</strong> AI Aaji utilizes neural language and voice models. Spoken and generated outputs are advisory and should not be substituted for professional legal, medical, or critical financial advice.
              </p>
              <p>
                <strong className="text-[var(--text-main)]">4. Prohibited Uses:</strong> Users agree not to reverse-engineer, exploit, or use AI Aaji for automated harassment, illegal surveillance, or unauthorized system disruption.
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
