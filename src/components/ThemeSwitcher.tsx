import React from 'react';
import { useTheme, Theme } from '../context/ThemeContext';
import { Moon, Sun, Sparkles } from 'lucide-react';

interface ThemeSwitcherProps {
  variant?: 'compact' | 'expanded';
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { theme, setTheme, isEditorial } = useTheme();

  if (variant === 'expanded') {
    return (
      <div className={`flex flex-col gap-2 p-1.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] ${className}`}>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] px-2.5 pt-1 flex items-center justify-between">
          <span>Theme Experience</span>
          <span className="text-[10px] text-[var(--accent-primary)] font-mono">
            {theme === 'midnight' ? 'Midnight Intelligence' : 'Warm Editorial'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Select Theme">
          {/* Midnight Button */}
          <button
            type="button"
            role="radio"
            aria-checked={theme === 'midnight'}
            onClick={() => setTheme('midnight')}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
              theme === 'midnight'
                ? 'bg-[#12192A] text-[#F7F8FF] border border-[#8065FF]/40 shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--glass-pill-bg)]'
            }`}
          >
            {/* Swatch */}
            <div className="w-5 h-5 rounded-full bg-[#080B14] border border-white/20 flex items-center justify-center relative shrink-0 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#8065FF] to-[#35D9F2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-xs leading-none">Midnight</span>
              <span className="text-[10px] text-[var(--text-secondary)] mt-0.5 opacity-80">Tech Dashboard</span>
            </div>
          </button>

          {/* Editorial Button */}
          <button
            type="button"
            role="radio"
            aria-checked={theme === 'editorial'}
            onClick={() => setTheme('editorial')}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
              theme === 'editorial'
                ? 'bg-[#FFFDFC] text-[#241C22] border border-[#D96C55]/40 shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--glass-pill-bg)]'
            }`}
          >
            {/* Swatch */}
            <div className="w-5 h-5 rounded-full bg-[#FFF7F0] border border-[#30202D]/20 flex items-center justify-center relative shrink-0 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#5141A8] to-[#D96C55]" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-xs leading-none">Editorial</span>
              <span className="text-[10px] text-[var(--text-secondary)] mt-0.5 opacity-80">Warm Pastel</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Compact segmented switch for desktop navbar
  return (
    <div
      role="radiogroup"
      aria-label="Theme Switcher"
      className={`inline-flex items-center p-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-inner transition-colors duration-200 ${className}`}
    >
      {/* Midnight Intelligence option */}
      <button
        type="button"
        role="radio"
        aria-checked={theme === 'midnight'}
        onClick={() => setTheme('midnight')}
        title="Midnight Intelligence (Cool surfaces, violet & cyan lighting)"
        className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
          theme === 'midnight'
            ? 'bg-[#12192A] text-[#F7F8FF] border border-[#8065FF]/40 shadow-sm'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
        }`}
      >
        <span className="w-3.5 h-3.5 rounded-full bg-[#080B14] border border-white/25 flex items-center justify-center shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#8065FF] to-[#35D9F2]" />
        </span>
        <span className="hidden xl:inline text-[11px] font-semibold">Midnight</span>
      </button>

      {/* Warm Editorial option */}
      <button
        type="button"
        role="radio"
        aria-checked={theme === 'editorial'}
        onClick={() => setTheme('editorial')}
        title="Warm Editorial (Pastel cream, blush pink & serif typography)"
        className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
          theme === 'editorial'
            ? 'bg-[#FFFDFC] text-[#241C22] border border-[#D96C55]/40 shadow-sm'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
        }`}
      >
        <span className="w-3.5 h-3.5 rounded-full bg-[#FFF7F0] border border-[#30202D]/25 flex items-center justify-center shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#5141A8] to-[#D96C55]" />
        </span>
        <span className="hidden xl:inline text-[11px] font-semibold">Editorial</span>
      </button>
    </div>
  );
};
