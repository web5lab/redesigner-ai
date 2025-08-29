import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';

export function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
    </>
  );
}