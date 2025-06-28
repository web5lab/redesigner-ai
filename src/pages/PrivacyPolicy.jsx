import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = 'Privacy Policy | redesignr.ai';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Privacy Policy for redesignr.ai - Learn how we collect, use, and protect your personal information when you use our AI website builder and redesign services.');
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
                to="/" 
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
                <p className="text-slate-300 mb-4">
                  By accessing or using redesignr.ai, you agree to this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Information We Collect</h2>
                
                <h3 className="text-lg font-medium text-white mt-6 mb-3">2.1 Personal Information</h3>
                <p className="text-slate-300 mb-4">
                  We may collect personal information that you voluntarily provide when using our services, including:
                </p>
                <ul className="text-slate-300 mb-4 list-disc pl-6">
                  <li>Name, email address, and contact details</li>
                  <li>Account credentials</li>
                  <li>Billing and payment information</li>
                  <li>Profile information</li>
                  <li>Content you upload, such as website URLs for redesign</li>
                  <li>Communications with us</li>
                </ul>

                <h3 className="text-lg font-medium text-white mt-6 mb-3">2.2 Automatically Collected Information</h3>
                <p className="text-slate-300 mb-4">
                  When you use our services, we may automatically collect certain information, including:
                </p>
                <ul className="text-slate-300 mb-4 list-disc pl-6">
                  <li>Device information (browser type, operating system, device type)</li>
                  <li>IP address and location information</li>
                  <li>Usage data and browsing history on our platform</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. How We Use Your Information</h2>
                <p className="text-slate-300 mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="text-slate-300 mb-4 list-disc pl-6">
                  <li>Providing, maintaining, and improving our services</li>
                  <li>Processing transactions and managing your account</li>
                  <li>Personalizing your experience</li>
                  <li>Communicating with you about updates, offers, and support</li>
                  <li>Analyzing usage patterns to enhance our platform</li>
                  <li>Protecting our services and users</li>
                  <li>Complying with legal obligations</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Sharing Your Information</h2>
                <p className="text-slate-300 mb-4">
                  We may share your information with:
                </p>
                <ul className="text-slate-300 mb-4 list-disc pl-6">
                  <li>Service providers who perform services on our behalf</li>
                  <li>Business partners with your consent</li>
                  <li>Legal authorities when required by law</li>
                  <li>In connection with a business transaction (merger, acquisition, etc.)</li>
                </ul>
                <p className="text-slate-300 mb-4">
                  We do not sell your personal information to third parties.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Cookies and Tracking Technologies</h2>
                <p className="text-slate-300 mb-4">
                  We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings, but disabling cookies may limit your use of certain features.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. Data Security</h2>
                <p className="text-slate-300 mb-4">
                  We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">7. Your Privacy Rights</h2>
                <p className="text-slate-300 mb-4">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="text-slate-300 mb-4 list-disc pl-6">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of your information</li>
                  <li>Restriction of processing</li>
                  <li>Data portability</li>
                  <li>Objection to processing</li>
                </ul>
                <p className="text-slate-300 mb-4">
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">8. Children's Privacy</h2>
                <p className="text-slate-300 mb-4">
                  Our services are not intended for children under 16 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">9. International Data Transfers</h2>
                <p className="text-slate-300 mb-4">
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We take appropriate measures to ensure your information remains protected.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-slate-300 mb-4">
                  We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4">11. Contact Us</h2>
                <p className="text-slate-300 mb-4">
                  If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
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
  );
};

export default PrivacyPolicy;