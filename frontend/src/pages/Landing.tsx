import React from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import CtaSection from '../components/landing/CtaSection';
import LandingFooter from '../components/landing/LandingFooter';

export default function Landing(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-wm-bg text-wm-text flex flex-col font-sans selection:bg-wm-accent selection:text-wm-accent-contrast">
      <LandingNavbar />
      <main className="flex-1 pt-16">
        <HeroSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}