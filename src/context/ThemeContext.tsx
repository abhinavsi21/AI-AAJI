import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

export type Theme = 'midnight' | 'editorial';

export interface ThemeConfig {
  id: Theme;
  name: string;
  tagline: string;
  primaryAccent: string;
  secondaryAccent: string;
  mainBg: string;
}

export const THEMES: Record<Theme, ThemeConfig> = {
  midnight: {
    id: 'midnight',
    name: 'Midnight Intelligence',
    tagline: 'Cool surfaces, violet & cyan lighting',
    primaryAccent: '#8065FF',
    secondaryAccent: '#35D9F2',
    mainBg: '#080B14',
  },
  editorial: {
    id: 'editorial',
    name: 'Warm Editorial',
    tagline: 'Warm cream, blush & peach editorial',
    primaryAccent: '#5141A8',
    secondaryAccent: '#D96C55',
    mainBg: '#FFF7F0',
  },
};

interface ThemeContextType {
  theme: Theme;
  config: ThemeConfig;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isEditorial: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'ai_aaji_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'editorial' || stored === 'midnight') {
          return stored;
        }
      } catch {
        // Fallback gracefully
      }
    }
    return 'midnight';
  });

  const applyThemeToDOM = (newTheme: Theme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.setAttribute('data-theme', newTheme);
    if (newTheme === 'editorial') {
      root.classList.remove('dark');
      root.classList.add('editorial');
    } else {
      root.classList.add('dark');
      root.classList.remove('editorial');
    }

    // Update meta theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        newTheme === 'editorial' ? '#FFF7F0' : '#080B14'
      );
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyThemeToDOM(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch (e) {
      console.warn('Could not persist theme to localStorage', e);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'midnight' ? 'editorial' : 'midnight');
  };

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const config = useMemo(() => THEMES[theme], [theme]);

  const value = useMemo(
    () => ({
      theme,
      config,
      setTheme,
      toggleTheme,
      isEditorial: theme === 'editorial',
    }),
    [theme, config]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
