import React, { useState } from 'react';
import { X, Copy, Check, Mail, ExternalLink, Globe } from 'lucide-react';
import { PricingPlan, PRODUCT_IDENTITY } from '../data/productData';

interface PurchaseModalProps {
  plan: PricingPlan | null;
  onClose: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ plan, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  if (!plan) return null;

  const mailtoUrl = `mailto:${PRODUCT_IDENTITY.contactEmail}?subject=${encodeURIComponent(
    plan.mailtoSubject || ''
  )}&body=${encodeURIComponent(plan.mailtoBody || '')}`;

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    PRODUCT_IDENTITY.contactEmail
  )}&su=${encodeURIComponent(plan.mailtoSubject || '')}&body=${encodeURIComponent(
    plan.mailtoBody || ''
  )}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PRODUCT_IDENTITY.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyBody = () => {
    if (plan.mailtoBody) {
      navigator.clipboard.writeText(plan.mailtoBody);
      setCopiedBody(true);
      setTimeout(() => setCopiedBody(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[var(--bg-card)] rounded-3xl p-6 sm:p-8 border border-[var(--border-elevated)] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--glass-pill-bg)] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-11 h-11 rounded-2xl badge-gradient p-[1.5px] flex items-center justify-center shrink-0 shadow-md">
            <div className="w-full h-full rounded-[14px] bg-[var(--bg-main)] flex items-center justify-center">
              <Mail className="w-5 h-5 text-[var(--accent-primary)]" />
            </div>
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-[var(--text-main)]">
              {plan.name} Edition Purchase Enquiry
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Contact-to-purchase • Price: <strong className="text-[var(--text-main)] font-semibold">{plan.priceDisplay}</strong>
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
          License purchases are arranged directly via email with the founders. An editable draft will open in your mail client for your review. No email is sent automatically.
        </p>

        {/* Primary Action Buttons */}
        <div className="space-y-3 mb-6">
          {/* Default Mail Client Trigger */}
          <a
            href={mailtoUrl}
            className="w-full py-3.5 px-6 rounded-xl btn-gradient font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent-primary)]/25 hover:shadow-[var(--accent-primary)]/45 transition-all"
          >
            <Mail className="w-4 h-4" />
            Open in Default Email App
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          {/* Webmail Gmail Compose Alternative */}
          <a
            href={gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-6 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] border border-[var(--border-subtle)] font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Globe className="w-4 h-4 text-[var(--accent-secondary)]" />
            Open in Gmail Web Browser
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>

        {/* Fallback Copy Section */}
        <div className="bg-[var(--bg-elevated)] rounded-2xl p-4 sm:p-5 border border-[var(--border-subtle)] space-y-3 shadow-inner">
          <span className="text-xs font-semibold text-[var(--text-main)] block">
            Manual Copy & Send Fallback
          </span>
          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
            If your device does not have an active email client, simply copy the address and message template below into your preferred email provider:
          </p>

          {/* Recipient Email Row */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)]">
            <span className="text-xs font-mono text-[var(--accent-secondary)] select-all font-medium">
              {PRODUCT_IDENTITY.contactEmail}
            </span>
            <button
              onClick={handleCopyEmail}
              className="text-xs font-medium text-[var(--text-main)] hover:text-[var(--accent-primary)] px-2.5 py-1 rounded bg-[var(--glass-pill-bg)] hover:bg-[var(--bg-hover)] flex items-center gap-1.5 transition-colors cursor-pointer border border-[var(--border-subtle)]"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-[var(--status-success)]" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedEmail ? 'Copied!' : 'Copy Email'}
            </button>
          </div>

          {/* Subject Preview */}
          <div className="p-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] text-xs">
            <span className="text-[var(--text-secondary)] block mb-0.5 text-[10px] uppercase font-semibold">Subject:</span>
            <span className="text-[var(--text-main)] font-mono text-xs">{plan.mailtoSubject}</span>
          </div>

          {/* Body Preview & Copy */}
          <div className="p-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-subtle)] text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[var(--text-secondary)] text-[10px] uppercase font-semibold">Message Body:</span>
              <button
                onClick={handleCopyBody}
                className="text-[11px] font-medium text-[var(--accent-primary)] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedBody ? <Check className="w-3 h-3 text-[var(--status-success)]" /> : <Copy className="w-3 h-3" />}
                {copiedBody ? 'Copied' : 'Copy Text'}
              </button>
            </div>
            <pre className="text-[11px] text-[var(--text-main)] whitespace-pre-wrap font-sans max-h-32 overflow-y-auto bg-[var(--bg-elevated)] p-2 rounded border border-[var(--border-subtle)]">
              {plan.mailtoBody}
            </pre>
          </div>

          <button
            onClick={handleCopyBody}
            className="w-full py-2.5 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--bg-hover)] text-xs font-semibold text-[var(--text-main)] flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[var(--border-subtle)]"
          >
            {copiedBody ? <Check className="w-3.5 h-3.5 text-[var(--status-success)]" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedBody ? 'Draft Template Copied to Clipboard!' : 'Copy Complete Message Template'}
          </button>
        </div>
      </div>
    </div>
  );
};
