'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Navbar from '../Navbar'
import Hero from '../Hero'
import Features from '../Features'
import Testimonials from '../Testimonials'
import Pricing from '../Pricing'
import FAQ from '../FAQ'
import Footer from '../Footer'
import TemplateShowcase from '../Template'
import { getPublicTemplates } from '@/store/global.Action'

const Landing = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getPublicTemplates() as any)
  }, [dispatch])
  
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <div className='md:block hidden'>
          <TemplateShowcase />
        </div>
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default Landing