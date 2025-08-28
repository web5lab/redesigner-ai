import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Dashboard } from '../components/Dashboard';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { Integrations } from '../components/Integrations';
import { CTA } from '../components/CTA';

export function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Dashboard />
      <Testimonials />
      {/* <Integrations /> */}
      <Pricing />
    </>
  );
}