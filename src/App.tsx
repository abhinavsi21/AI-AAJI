import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductPreview } from './components/ProductPreview';
import { FeatureGrid } from './components/FeatureGrid';
import { VoiceDemo } from './components/VoiceDemo';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { SoftwareDownload } from './components/SoftwareDownload';
import { FoundersSection } from './components/FoundersSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';

export default function App() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[var(--bg-main)] text-[var(--text-main)] font-sans relative transition-colors duration-300">
      {/* Sticky Navigation */}
      <Navbar
        onOpenPricing={() => scrollTo('pricing')}
        onOpenDemo={() => scrollTo('live-demo')}
      />

      {/* Main Page Flow */}
      <main className="w-full max-w-full overflow-x-hidden">
        {/* Hero Section */}
        <Hero
          onTryDemo={() => scrollTo('live-demo')}
          onExploreFeatures={() => scrollTo('features')}
          onDownload={() => scrollTo('download')}
        />

        {/* Product Experience Preview */}
        <ProductPreview />

        {/* Feature Grid (6 Cards) */}
        <FeatureGrid />

        {/* Live Gemini Realtime Voice Demo (Core Feature) */}
        <VoiceDemo />

        {/* How It Works (3 Steps) */}
        <HowItWorks />

        {/* Pricing (Free, Base ₹399, Premium ₹699) */}
        <Pricing />

        {/* Free Software Download */}
        <SoftwareDownload />

        {/* Founders Section (Abhinav Singh & Tanisha) */}
        <FoundersSection />

        {/* FAQ Section (10 Questions) */}
        <FAQSection />

        {/* Final Call to Action */}
        <FinalCTA
          onTalkToAaji={() => scrollTo('live-demo')}
          onDownload={() => scrollTo('download')}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Aaji Chatbot Widget */}
      <ChatWidget />
    </div>
  );
}
