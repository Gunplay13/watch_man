import React from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import HeroSection from '../components/landing/HeroSection';
import TrustedBySection from '../components/landing/TrustedBySection';
import FeaturesSection from '../components/landing/FeaturesSection';
import LiveSimulatorSection from '../components/landing/LiveSimulatorSection';
import CtaSection from '../components/landing/CtaSection';
import LandingFooter from '../components/landing/LandingFooter';

export default function Landing(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-wm-bg text-wm-text flex flex-col font-sans selection:bg-wm-accent selection:text-wm-accent-contrast">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <TrustedBySection />
        <FeaturesSection />
        <LiveSimulatorSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
