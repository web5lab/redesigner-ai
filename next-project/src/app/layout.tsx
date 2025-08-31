import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Powered Landing Page Builder for Small Business Conversion Optimization Without Coding Skills - Redesignr.ai",
  description: "Create high converting landing pages for small business marketing campaigns using AI powered drag and drop website builder with automated conversion optimization features and responsive mobile design templates without requiring coding knowledge or design experience.",
  keywords: "AI powered landing page builder for small business, automated conversion optimization landing pages, drag and drop website builder without coding, high converting sales funnel page creator, responsive mobile landing page templates for startups, automated GitHub repository documentation generator, small business marketing page builder with AI copywriting, conversion focused landing page templates for entrepreneurs, no code website redesign tool for agencies, automated lead generation page builder with form integration",
  authors: [{ name: "redesignr.ai - AI Powered Small Business Landing Page Creation Platform" }],
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://redesignr.ai/",
    title: "AI Powered Landing Page Builder for Small Business Marketing Campaigns Without Coding Requirements",
    description: "Revolutionary AI platform for creating high converting landing pages for small business marketing campaigns, automated website redesign for agencies, GitHub repository documentation generation, and conversion optimized sales funnel pages without coding skills required.",
    images: [
      {
        url: "https://redesignr.ai/og-image-small-business-landing-builder.jpg",
        width: 1200,
        height: 630,
        alt: "AI Powered Landing Page Builder interface showing small business conversion optimization tools and templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@redesignr_ai",
    creator: "@redesignr_ai",
    title: "AI Powered Landing Page Builder for Small Business Marketing Without Coding Skills",
    description: "Build high converting landing pages for small business marketing campaigns using AI powered automation with responsive mobile templates and conversion optimization features - no coding experience required!",
    images: ["https://redesignr.ai/twitter-image-small-business-landing-builder.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Cache-control" content="public, max-age=31536000" />
        
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VM6E0QWB9L"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VM6E0QWB9L');
            `,
          }}
        />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Apple specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Small Business Landing Page Builder" />
        
        {/* Microsoft specific meta tags */}
        <meta name="msapplication-TileColor" content="#111827" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Additional SEO meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="skype_toolbar" content="skype_toolbar_parser_compatible" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: '#0e1729' }}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}