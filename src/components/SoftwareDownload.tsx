import React from 'react';
import { Download, FolderOpen, CheckCircle2, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { PRODUCT_IDENTITY } from '../data/productData';
import { useTheme } from '../context/ThemeContext';
import { EditorialStar } from './EditorialStar';

export const SoftwareDownload: React.FC = () => {
  const { isEditorial } = useTheme();

  return (
    <section id="download" className="py-24 relative bg-[var(--bg-main)] border-t border-[var(--border-subtle)] theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--accent-secondary)] uppercase tracking-wider mb-4 shadow-sm">
            <Download className="w-3.5 h-3.5" />
            <span>Software Access</span>
            {isEditorial && <EditorialStar className="w-3 h-3 text-[var(--accent-secondary)]" />}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] tracking-tight mb-4">
            Your AI Aaji journey starts here.
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">
            “Explore the free version and discover a more natural way to interact with AI.”
          </p>
        </div>

        {/* Software Showcase Grid */}
        <div className="max-w-5xl mx-auto glass-panel-elevated rounded-3xl p-8 sm:p-12 border border-[var(--border-elevated)] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Mockup Visual */}
            <div className="lg:col-span-6 bg-[var(--bg-elevated)] rounded-2xl p-6 border border-[var(--border-subtle)] shadow-inner flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[var(--status-error)]" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-[var(--status-success)]" />
                  </div>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">OFFICIAL_GOOGLE_DRIVE_REPOSITORY</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--gradient-btn)] p-[1.5px] flex items-center justify-center shrink-0 shadow-sm">
                      <div className="w-full h-full rounded-[10px] bg-[var(--bg-card)] flex items-center justify-center">
                        <FolderOpen className="w-5 h-5 text-[var(--accent-secondary)]" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--text-main)]">AI Aaji Installer Releases</h4>
                      <p className="text-xs text-[var(--text-secondary)]">{PRODUCT_IDENTITY.downloadVersion}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--glass-pill-bg)] text-xs text-[var(--text-main)] leading-relaxed border border-[var(--border-subtle)]">
                    Choose the verified installer package for your operating system: Windows (64-bit), macOS (Apple Silicon / Intel), or Linux (.deb / AppImage).
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
                <span className="flex items-center gap-1.5 text-[var(--status-success)] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Official Google Drive Folder
                </span>
                <span className="font-mono">Active Distribution</span>
              </div>
            </div>

            {/* Right Column: Download Actions & Specs */}
            <div className="lg:col-span-6 flex flex-col items-start">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 text-xs font-semibold text-[var(--accent-primary)] mb-4 border border-[var(--accent-primary)]/20">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                {PRODUCT_IDENTITY.releaseStatus}
              </div>

              <h3 className="font-heading text-2xl font-bold text-[var(--text-main)] mb-3">
                AI Aaji Free Edition
              </h3>

              <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                The free edition installer is available directly through our official Google Drive folder. Open the folder to select and download the package matching your operating system.
              </p>

              {/* Version & OS Metadata */}
              <div className="w-full space-y-2 mb-8 bg-[var(--bg-card)] rounded-xl p-4 border border-[var(--border-subtle)] text-xs shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Release:</span>
                  <span className="font-mono text-[var(--text-main)] font-medium">{PRODUCT_IDENTITY.downloadVersion}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Platform Support:</span>
                  <span className="text-[var(--text-main)] text-right max-w-[220px] truncate" title={PRODUCT_IDENTITY.supportedOS}>
                    Windows 10/11, macOS 13+, Linux
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Host:</span>
                  <span className="text-[var(--accent-secondary)] font-medium">Google Drive (Official Folder)</span>
                </div>
              </div>

              {/* Primary Action Button to Google Drive */}
              <a
                href={PRODUCT_IDENTITY.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl btn-gradient font-semibold text-sm shadow-lg shadow-[var(--accent-primary)]/25 hover:shadow-[var(--accent-primary)]/45 transition-all cursor-pointer flex items-center justify-center gap-2 mb-4 group"
              >
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Open Official Google Drive Folder
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>

              {/* Security & Installation Note */}
              <div className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                <ShieldCheck className="w-4 h-4 text-[var(--status-success)] shrink-0 mt-0.5" />
                <span>
                  The link opens the official Drive folder where you can review file signatures and select the correct installer. No automated background downloading.
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
