import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import PowerfulEditor from '../components/EditiorInfo';
import EnhancedApiSection from '../components/apiInfoSection';
import TemplateShowcase from '../components/Template';
import { useDispatch } from 'react-redux';
import { getPublicTemplates } from '../store/global.Action';
import BlogsSection from '../components/BlogsSection';

const Landing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPublicTemplates())
  }, [])
  
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Navbar />
      <main>
        <Hero />
        {/* <EnhancedApiSection/> */}
        <Features />
        <TemplateShowcase />
        {/* <PowerfulEditor /> */}
        <BlogsSection />
        {/* <Testimonials /> */}
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;