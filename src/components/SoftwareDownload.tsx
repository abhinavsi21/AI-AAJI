import React from 'react';
import { Download, Laptop, ShieldCheck, FolderOpen, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';
import { PRODUCT_IDENTITY } from '../data/productData';

export const SoftwareDownload: React.FC = () => {
  return (
    <section id="download" className="py-24 relative bg-[#080B14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#12192A] border border-white/10 text-xs font-semibold text-[#35D9F2] uppercase tracking-wider mb-4">
            <Download className="w-3.5 h-3.5" />
            Software Access
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Your AI Aaji journey starts here.
          </h2>
          <p className="text-base sm:text-lg text-[#A7B0C5]">
            “Explore the free version and discover a more natural way to interact with AI.”
          </p>
        </div>

        {/* Software Showcase Grid */}
        <div className="max-w-5xl mx-auto glass-panel-elevated rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Mockup Visual */}
            <div className="lg:col-span-6 bg-[#080B14] rounded-2xl p-6 border border-white/10 shadow-inner flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF6B81]" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-[#43D9A3]" />
                  </div>
                  <span className="text-xs font-mono text-[#A7B0C5]">OFFICIAL_GOOGLE_DRIVE_REPOSITORY</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8065FF] to-[#35D9F2] p-[1.5px] flex items-center justify-center shrink-0">
                      <div className="w-full h-full rounded-[10px] bg-[#080B14] flex items-center justify-center">
                        <FolderOpen className="w-5 h-5 text-[#35D9F2]" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">AI Aaji Installer Releases</h4>
                      <p className="text-xs text-[#A7B0C5]">{PRODUCT_IDENTITY.downloadVersion}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 text-xs text-[#F7F8FF] leading-relaxed">
                    Choose the verified installer package for your operating system: Windows (64-bit), macOS (Apple Silicon / Intel), or Linux (.deb / AppImage).
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#A7B0C5]">
                <span className="flex items-center gap-1.5 text-[#43D9A3]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Official Google Drive Folder
                </span>
                <span>Active Distribution</span>
              </div>
            </div>

            {/* Right Column: Download Actions & Specs */}
            <div className="lg:col-span-6 flex flex-col items-start">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8065FF]/10 text-xs font-semibold text-[#B8A6FF] mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#35D9F2]" />
                {PRODUCT_IDENTITY.releaseStatus}
              </div>

              <h3 className="font-heading text-2xl font-bold text-white mb-3">
                AI Aaji Free Edition
              </h3>

              <p className="text-sm text-[#A7B0C5] mb-6 leading-relaxed">
                The free edition installer is available directly through our official Google Drive folder. Open the folder to select and download the package matching your operating system.
              </p>

              {/* Version & OS Metadata */}
              <div className="w-full space-y-2 mb-8 bg-[#12192A] rounded-xl p-4 border border-white/5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#A7B0C5]">Release:</span>
                  <span className="font-mono text-white font-medium">{PRODUCT_IDENTITY.downloadVersion}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A7B0C5]">Platform Support:</span>
                  <span className="text-white text-right max-w-[220px] truncate" title={PRODUCT_IDENTITY.supportedOS}>
                    Windows 10/11, macOS 13+, Linux
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A7B0C5]">Host:</span>
                  <span className="text-[#35D9F2] font-medium">Google Drive (Official Folder)</span>
                </div>
              </div>

              {/* Primary Action Button to Google Drive */}
              <a
                href={PRODUCT_IDENTITY.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#8065FF] to-[#35D9F2] text-white font-semibold text-sm shadow-lg shadow-[#8065FF]/25 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2 mb-4 group"
              >
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Open Official Google Drive Folder
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>

              {/* Security & Installation Note */}
              <div className="flex items-start gap-2 text-xs text-[#A7B0C5]">
                <ShieldCheck className="w-4 h-4 text-[#43D9A3] shrink-0 mt-0.5" />
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
