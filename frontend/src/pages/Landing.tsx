import React from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import HeroSection from '../components/landing/HeroSection';
import HeroCanvas from '../components/landing/HeroCanvas';
import TrustedBySection from '../components/landing/TrustedBySection';
import LiveStatusBoard from '../components/landing/LiveStatusBoard';
import InteractiveFeaturesSection from '../components/landing/InteractiveFeaturesSection';
import LiveSimulatorSection from '../components/landing/LiveSimulatorSection';
import CtaSection from '../components/landing/CtaSection';
import LandingFooter from '../components/landing/LandingFooter';

export default function Landing(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-wm-bg text-wm-text flex flex-col font-sans selection:bg-wm-accent selection:text-wm-accent-contrast">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <HeroCanvas />
        <TrustedBySection />
        <LiveStatusBoard />
        <InteractiveFeaturesSection />
        <LiveSimulatorSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}