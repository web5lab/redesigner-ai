import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const TermsOfService = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = 'Terms of Service | redesignr.ai';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Terms of Service for redesignr.ai - Read our terms and conditions for using our AI website builder and redesign services.');
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

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
              <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
              
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-slate-300">Last Updated: January 15, 2025</p>
                
                <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Agreement to Terms</h2>
                <p className="text-slate-300 mb-4">
                  Welcome to redesignr.ai. These Terms of Service ("Terms") govern your access to and use of the redesignr.ai website, products, and services ("Services"). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
                </p>
                <p className="text-slate-300 mb-4">
                  If you do not agree to these Terms, please do not use our Services. If you are accessing and using the Services on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Description of Services</h2>
                <p className="text-slate-300 mb-4">
                  redesignr.ai provides AI-powered website design, redesign, and creation services. Our platform allows users to generate websites, documentation, blogs, and other web content using artificial intelligence technology.
                </p>
                <p className="text-slate-300 mb-4">
                  We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time, including the availability of any feature, database, or content, with or without notice.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. User Accounts</h2>
                <p className="text-slate-300 mb-4">
                  To access certain features of our Services, you may need to create an account. You are responsible for:
                </p>
                <ul className="text-slate-300 mb-4 list-disc pl-6">
                  <li>Providing accurate and complete information when creating your account</li>
                  <li>Maintaining the security of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use of your account</li>
                </ul>
                <p className="text-slate-300 mb-4">
                  We reserve the right to disable any user account at any time if, in our opinion, you have failed to comply with these Terms.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Subscription and Payment</h2>
                <p className="text-slate-300 mb-4">
                  Some of our Services require payment and subscription. By subscribing to our paid Services:
                </p>
                <ul className="text-slate-300 mb-4 list-disc pl-6">
                  <li>You agree to pay all fees in accordance with the pricing and payment terms presented to you</li>
                  <li>You authorize us to charge your designated payment method</li>
                  <li>You acknowledge that subscriptions automatically renew unless canceled before the renewal date</li>
                  <li>You understand that refunds are subject to our refund policy</li>
                </ul>
                <p className="text-slate-300 mb-4">
                  We reserve the right to change our prices with reasonable notice. Such notice may be provided on our website, by email, or in your account interface.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. User Content</h2>
                <p className="text-slate-300 mb-4">
                  Our Services allow you to upload, submit, store, send, or receive content ("User Content"). You retain ownership of your User Content, but by uploading it to our platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your User Content in connection with providing and improving our Services.
                </p>
                <p className="text-slate-300 mb-4">
                  You are solely responsible for your User Content and the consequences of sharing it. You represent and warrant that:
                </p>
                <ul className="text-slate-300 mb-4 list-disc pl-6">
                  <li>You own or have the necessary rights to your User Content</li>
                  <li>Your User Content does not violate the rights of any third party</li>
                  <li>Your User Content complies with these Terms and all applicable laws</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. Intellectual Property</h2>
                <p className="text-slate-300 mb-4">
                  The Services and their original content, features, and functionality are owned by redesignr.ai and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="text-slate-300 mb-4">
                  For websites and content generated by our AI:
                </p>
                <ul className="text-slate-300 mb-4 list-disc pl-6">
                  <li>You own the rights to the output generated specifically for you</li>
                  <li>We retain ownership of our AI models, algorithms, and pre-existing materials</li>
                  <li>You may use the generated content for personal or commercial purposes as permitted by your subscription plan</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">7. Prohibited Uses</h2>
                <p className="text-slate-300 mb-4">
                  You agree not to use our Services:
                </p>
                <ul className="text-slate-300 mb-4 list-disc pl-6">
                  <li>In any way that violates any applicable law or regulation</li>
                  <li>To transmit or procure the sending of any advertising or promotional material without our prior consent</li>
                  <li>To impersonate or attempt to impersonate another person or entity</li>
                  <li>To engage in any conduct that restricts or inhibits anyone's use of the Services</li>
                  <li>To attempt to gain unauthorized access to our systems or user accounts</li>
                  <li>To use our Services to create, upload, or share content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
                  <li>To use our Services to create websites or content for illegal activities, scams, or phishing</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">8. Limitation of Liability</h2>
                <p className="text-slate-300 mb-4">
                  To the maximum extent permitted by law, redesignr.ai and its affiliates, officers, employees, agents, partners, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="text-slate-300 mb-4 list-disc pl-6">
                  <li>Your access to or use of or inability to access or use the Services</li>
                  <li>Any conduct or content of any third party on the Services</li>
                  <li>Any content obtained from the Services</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">9. Disclaimer of Warranties</h2>
                <p className="text-slate-300 mb-4">
                  Your use of our Services is at your sole risk. The Services are provided on an "AS IS" and "AS AVAILABLE" basis. redesignr.ai expressly disclaims all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                </p>
                <p className="text-slate-300 mb-4">
                  We do not warrant that the Services will be uninterrupted, timely, secure, or error-free, or that any content generated will meet your requirements or expectations.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">10. Indemnification</h2>
                <p className="text-slate-300 mb-4">
                  You agree to defend, indemnify, and hold harmless redesignr.ai and its licensors, service providers, employees, agents, officers, and directors from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Services.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">11. Termination</h2>
                <p className="text-slate-300 mb-4">
                  We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms.
                </p>
                <p className="text-slate-300 mb-4">
                  Upon termination, your right to use the Services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">12. Governing Law</h2>
                <p className="text-slate-300 mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">13. Changes to Terms</h2>
                <p className="text-slate-300 mb-4">
                  We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting the updated Terms on this page with a new "Last Updated" date. Your continued use of the Services after such modifications will constitute your acknowledgment and agreement to the modified Terms.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">14. Contact Us</h2>
                <p className="text-slate-300 mb-4">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="text-slate-300 mb-4">
                  Email: terms@redesignr.ai<br />
                  Address: 123 AI Boulevard, San Francisco, CA 94105
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;