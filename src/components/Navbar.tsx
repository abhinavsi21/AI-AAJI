import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCT_IDENTITY } from '../data/productData';
import { BrandLogo } from './BrandLogo';
import { ThemeSwitcher } from './ThemeSwitcher';

interface NavbarProps {
  onOpenPricing: () => void;
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPricing, onOpenDemo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Live Demo', href: '#live-demo' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Founders', href: '#founders' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border-subtle)] shadow-lg shadow-black/10 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="focus:outline-none">
          <BrandLogo size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors relative py-1 focus:outline-none"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls & Theme Switcher */}
        <div className="hidden md:flex items-center gap-3.5">
          {/* Dual Theme Switcher */}
          <ThemeSwitcher variant="compact" />

          <button
            onClick={onOpenDemo}
            className="text-xs font-medium text-[var(--accent-highlight)] hover:text-[var(--text-main)] px-3 py-1.5 rounded-full border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] transition-all flex items-center gap-1.5 cursor-pointer bg-[var(--glass-pill-bg)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            Live Voice
          </button>
          <button
            onClick={onOpenPricing}
            className="text-sm font-medium px-5 py-2 rounded-full btn-gradient shadow-md shadow-[var(--accent-primary)]/20 hover:shadow-[var(--accent-primary)]/35 transition-all cursor-pointer flex items-center gap-1.5"
          >
            Get AI Aaji
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle & Compact Switcher */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeSwitcher variant="compact" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--glass-pill-bg)] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--nav-mobile-bg)] border-b border-[var(--border-subtle)] px-6 py-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3">
            {/* Theme Selector for Mobile */}
            <div className="pb-3 border-b border-[var(--border-subtle)]">
              <ThemeSwitcher variant="expanded" />
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-main)] py-1"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full text-center text-sm font-medium text-[var(--accent-highlight)] py-2.5 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center gap-2 bg-[var(--glass-pill-bg)]"
              >
                <Sparkles className="w-4 h-4 text-[var(--accent-secondary)]" />
                Try Live Voice Demo
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPricing();
                }}
                className="w-full text-center text-sm font-semibold py-3 rounded-lg btn-gradient shadow-lg shadow-[var(--accent-primary)]/25 flex items-center justify-center gap-2"
              >
                Get AI Aaji
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
