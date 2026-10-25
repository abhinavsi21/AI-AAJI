import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/productData';
import { useTheme } from '../context/ThemeContext';

export const FAQSection: React.FC = () => {
  const { isEditorial } = useTheme();
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General' },
    { id: 'capabilities', name: 'Capabilities' },
    { id: 'pricing', name: 'Pricing & Purchase' },
    { id: 'technical', name: 'Technical & System' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 relative bg-[var(--bg-main)] border-t border-[var(--border-subtle)] theme-transition">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--accent-secondary)] uppercase tracking-wider mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clear Answers</span>
            {isEditorial && <span className="editorial-star text-[10px]">✦</span>}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">
            Everything you need to know about AI Aaji, editions, live voice capabilities, and software access.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[var(--gradient-btn)] text-white shadow-md shadow-[var(--accent-primary)]/20 scale-[1.02]'
                  : 'bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-main)] border border-[var(--border-subtle)]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Accordion FAQ List (10 items) */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="glass-panel rounded-2xl border border-[var(--border-subtle)] overflow-hidden transition-colors hover:border-[var(--border-elevated)]"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-base sm:text-lg font-semibold text-[var(--text-main)] pr-4">
                    {item.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[var(--glass-pill-bg)] flex items-center justify-center shrink-0 text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[var(--accent-secondary)]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
