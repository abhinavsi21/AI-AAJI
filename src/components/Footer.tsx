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
    <footer className="bg-[#080B14] border-t border-white/10 pt-16 pb-12 text-[#A7B0C5] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" />

            <p className="text-xs text-[#A7B0C5] leading-relaxed max-w-sm">
              An intelligent AI personal assistant engineered by Abhinav Singh and Tanisha Kolhar to bring conversational voice, multimodal intelligence, and desktop automation into everyday workflows.
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center gap-2 text-[#F7F8FF]">
                <Mail className="w-4 h-4 text-[#35D9F2]" />
                <a href={`mailto:${PRODUCT_IDENTITY.contactEmail}`} className="hover:text-white hover:underline font-mono">
                  {PRODUCT_IDENTITY.contactEmail}
                </a>
              </div>

              <div className="flex items-center gap-2 text-[#F7F8FF]">
                <Instagram className="w-4 h-4 text-[#B8A6FF]" />
                <a
                  href={PRODUCT_IDENTITY.officialInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline font-mono inline-flex items-center gap-1"
                  aria-label="Official AI Aaji Instagram profile"
                >
                  {PRODUCT_IDENTITY.officialInstagramHandle}
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#A7B0C5]">
                <span className="text-white/40">Founders:</span>
                <a
                  href="https://www.instagram.com/abhinavsinghofficial21/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B8A6FF] transition-colors font-mono inline-flex items-center gap-0.5"
                >
                  <span>@abhinavsinghofficial21</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
                <span className="text-white/20">•</span>
                <a
                  href="https://www.instagram.com/tanu_here_10/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B8A6FF] transition-colors font-mono inline-flex items-center gap-0.5"
                >
                  <span>@tanu_here_10</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-xs uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Features & Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('live-demo')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Live Gemini Realtime Voice Demo
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pricing Plans (Free, Base, Premium)
                </button>
              </li>
            </ul>
          </div>

          {/* Product & Team */}
          <div>
            <h4 className="font-heading font-semibold text-white text-xs uppercase tracking-wider mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('founders')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Founders & Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('download')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Free Software Download
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <a
                  href={`mailto:${PRODUCT_IDENTITY.contactEmail}?subject=AI%20Aaji%20General%20Enquiry`}
                  className="hover:text-white transition-colors"
                >
                  Direct Email Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Drafts */}
          <div>
            <h4 className="font-heading font-semibold text-white text-xs uppercase tracking-wider mb-4">
              Transparency
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setLegalModal('privacy')}
                  className="hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-[#43D9A3]" />
                  Privacy Draft
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModal('terms')}
                  className="hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#B8A6FF]" />
                  Terms of Use Draft
                </button>
              </li>
              <li>
                <span className="text-[11px] text-[#A7B0C5]/60 block pt-1">
                  Draft policies subject to review prior to public commercial launch.
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[#A7B0C5]/80">
            © {currentYear} {PRODUCT_IDENTITY.brandName}. Created by Abhinav Singh & Tanisha Kolhar. All rights reserved.
          </p>
          <p className="text-[11px] text-[#A7B0C5]/60">
            Powered by Google Gemini Realtime Voice Architecture
          </p>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {legalModal === 'privacy' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#A7B0C5] hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-[#43D9A3]" />
              <h3 className="font-heading text-xl font-bold text-white">Privacy Policy Draft</h3>
            </div>
            <p className="text-xs text-[#A7B0C5] mb-6">
              Review draft for AI Aaji website and software services. Last updated: October 2026.
            </p>

            <div className="space-y-4 text-xs text-[#A7B0C5] leading-relaxed">
              <p>
                <strong className="text-white">1. Audio & Spoken Data:</strong> Microphone audio transmitted during the Live Voice Demo is streamed directly to the real-time model session and is never permanently recorded, logged, or saved to persistent storage on our servers.
              </p>
              <p>
                <strong className="text-white">2. Contact Enquiries:</strong> Any details provided in purchase enquiries sent to <code className="text-white">aiaajiofficial@gmail.com</code> are used solely for fulfilling your license requests and answering technical inquiries.
              </p>
              <p>
                <strong className="text-white">3. Analytics & Telemetry:</strong> The website does not sell personal visitor data or deploy intrusive ad tracking pixels.
              </p>
              <p>
                <strong className="text-white">4. Software Permissions:</strong> Desktop client installations request only the operating system permissions necessary to execute supported voice, multimodal, and shortcut tasks.
              </p>
              <p>
                <strong className="text-white">5. Direct Contact:</strong> For any privacy-related queries or data deletion requests, contact founders Abhinav Singh and Tanisha Kolhar at <code className="text-white">aiaajiofficial@gmail.com</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Use Modal */}
      {legalModal === 'terms' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#A7B0C5] hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-[#B8A6FF]" />
              <h3 className="font-heading text-xl font-bold text-white">Terms of Use Draft</h3>
            </div>
            <p className="text-xs text-[#A7B0C5] mb-6">
              Review draft governing access to AI Aaji and related software editions.
            </p>

            <div className="space-y-4 text-xs text-[#A7B0C5] leading-relaxed">
              <p>
                <strong className="text-white">1. Acceptance of Terms:</strong> By accessing the AI Aaji website, running the live voice demo, or downloading available software packages, you agree to these terms.
              </p>
              <p>
                <strong className="text-white">2. License Editions:</strong> The Free tier permits personal exploration. Base (₹399) and Premium (₹699) licenses are granted upon completion of email enquiry and confirmed distribution from the founders.
              </p>
              <p>
                <strong className="text-white">3. Experimental AI Assistance:</strong> AI Aaji utilizes neural language and voice models. Spoken and generated outputs are advisory and should not be substituted for professional legal, medical, or critical financial advice.
              </p>
              <p>
                <strong className="text-white">4. Prohibited Uses:</strong> Users agree not to reverse-engineer, exploit, or use AI Aaji for automated harassment, illegal surveillance, or unauthorized system disruption.
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
