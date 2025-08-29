import React from 'react';
import { Hero } from '../components/Hero';
import { AppFeatures } from '../components/AppFeatures';
import { Features } from '../components/Features';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { HowItWorks } from '../components/HowItWorks';
import { Stats } from '../components/Stats';
import { Integration } from '../components/Integration';

export function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <AppFeatures />
      <Features />
      <HowItWorks />
      <Integration />
      <Testimonials />
      <Pricing />
    </>
  );
}