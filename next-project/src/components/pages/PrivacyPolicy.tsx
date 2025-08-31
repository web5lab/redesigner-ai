'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../Navbar'
import Footer from '../Footer'

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | redesignr.ai'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Navbar />
      
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8 pt-8">
              <Link 
                href="/" 
                className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </nav>

            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl p-8 shadow-xl">
              <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
              
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-slate-300">Last Updated: January 15, 2025</p>
                
                <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Introduction</h2>
                <p className="text-slate-300 mb-4">
                  Welcome to redesignr.ai ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, products, and services.
                </p>
                
                {/* Add more privacy policy content here */}
                
                <h2 className="text-xl font-semibold text-white mt-8 mb-4">14. Contact Us</h2>
                <p className="text-slate-300 mb-4">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="text-slate-300 mb-4">
                  Email: privacy@redesignr.ai<br />
                  Address: 123 AI Boulevard, San Francisco, CA 94105
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PrivacyPolicy