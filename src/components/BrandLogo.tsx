import React from 'react';
import { PRODUCT_IDENTITY } from '../data/productData';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizeMap = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Official Vector Logo */}
      <div className={`relative ${sizeMap[size]} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <img
          src="/assets/ai_aaji_logo.svg"
          alt="AI Aaji Official Brand Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(128,101,255,0.4)]"
          onError={(e) => {
            // Fallback to inline SVG if needed
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {showText && (
        <span className={`font-heading font-bold ${textSizeMap[size]} tracking-tight text-[var(--text-main)] group-hover:text-[var(--accent-primary)] transition-colors`}>
          {PRODUCT_IDENTITY.brandName}
        </span>
      )}
    </div>
  );
};
