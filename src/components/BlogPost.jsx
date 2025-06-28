import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const BlogPost = () => {
  const { slug } = useParams();

  // Blog data (in a real app, this would come from an API or CMS)
  const blogs = [
    {
      id: 1,
      title: "How AI is Revolutionizing Website Design in 2025",
      excerpt: "Discover how artificial intelligence is transforming the web design industry, from automated layouts to intelligent content generation.",
      slug: "ai-revolutionizing-website-design-2025",
      author: "Sarah Chen",
      date: "2025-01-15",
      readTime: "8 min read",
      category: "AI Technology",
      tags: ["AI", "Web Design", "Technology", "Future"],
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200",
      content: `
        <p>Artificial Intelligence is no longer a futuristic concept—it's actively reshaping how we approach website design and development. In 2025, AI tools have become indispensable for designers, developers, and businesses looking to create compelling digital experiences.</p>

        <h2>The Current State of AI in Web Design</h2>
        <p>Today's AI-powered design tools can analyze user behavior, generate layouts, optimize content placement, and even write code. This represents a fundamental shift from traditional design processes that relied heavily on manual iteration and guesswork.</p>

        <h3>Key AI Technologies Transforming Web Design:</h3>
        <ul>
          <li><strong>Generative Design:</strong> AI algorithms that create multiple design variations based on input parameters</li>
          <li><strong>Intelligent Content Generation:</strong> Automated creation of copy, images, and multimedia content</li>
          <li><strong>User Experience Optimization:</strong> Real-time personalization based on user behavior patterns</li>
          <li><strong>Automated Testing:</strong> AI-driven A/B testing and conversion optimization</li>
        </ul>

        <h2>Benefits of AI-Driven Website Design</h2>
        <p>The integration of AI in web design offers numerous advantages that are revolutionizing the industry:</p>

        <h3>1. Speed and Efficiency</h3>
        <p>AI can generate complete website layouts in minutes rather than hours or days. This dramatic reduction in design time allows teams to focus on strategy and refinement rather than starting from scratch.</p>

        <h3>2. Data-Driven Decisions</h3>
        <p>AI analyzes vast amounts of user data to make informed design decisions. This eliminates guesswork and ensures that design choices are backed by real user behavior patterns.</p>

        <h3>3. Personalization at Scale</h3>
        <p>Modern AI systems can create personalized experiences for thousands of users simultaneously, adapting content, layout, and functionality based on individual preferences and behaviors.</p>

        <h2>Real-World Applications</h2>
        <p>Leading companies are already leveraging AI for website design with remarkable results:</p>

        <blockquote>
          "AI-powered design tools have reduced our website creation time by 75% while improving conversion rates by 40%." - Tech Startup CEO
        </blockquote>

        <h3>Case Studies:</h3>
        <ul>
          <li><strong>E-commerce Platform:</strong> Used AI to optimize product page layouts, resulting in 25% increase in sales</li>
          <li><strong>SaaS Company:</strong> Implemented AI-driven landing page generation, improving lead conversion by 60%</li>
          <li><strong>Media Website:</strong> Deployed AI content personalization, increasing user engagement by 45%</li>
        </ul>

        <h2>The Future of AI in Web Design</h2>
        <p>As we look ahead, several trends are emerging that will further transform the web design landscape:</p>

        <h3>Emerging Trends:</h3>
        <ul>
          <li><strong>Voice-Activated Design:</strong> AI systems that respond to natural language design requests</li>
          <li><strong>Predictive UX:</strong> Interfaces that anticipate user needs before they're expressed</li>
          <li><strong>Automated Accessibility:</strong> AI ensuring all designs meet accessibility standards automatically</li>
          <li><strong>Cross-Platform Optimization:</strong> Single AI systems optimizing for web, mobile, and emerging platforms</li>
        </ul>

        <h2>Getting Started with AI Web Design</h2>
        <p>For designers and developers looking to incorporate AI into their workflow, here are practical steps to begin:</p>

        <ol>
          <li><strong>Start Small:</strong> Begin with AI-powered tools for specific tasks like image generation or copy writing</li>
          <li><strong>Learn the Fundamentals:</strong> Understand how AI algorithms work to better leverage their capabilities</li>
          <li><strong>Experiment with Tools:</strong> Try different AI platforms to find what works best for your workflow</li>
          <li><strong>Focus on Data:</strong> Ensure you have quality data to train and improve AI systems</li>
          <li><strong>Stay Updated:</strong> The AI landscape evolves rapidly—continuous learning is essential</li>
        </ol>

        <h2>Conclusion</h2>
        <p>AI is not replacing human creativity in web design—it's amplifying it. By handling routine tasks and providing data-driven insights, AI allows designers to focus on strategy, innovation, and creating meaningful user experiences.</p>

        <p>The future of web design is collaborative, with AI and human creativity working together to create digital experiences that are more personalized, efficient, and effective than ever before.</p>
      `,
      metaDescription: "Discover how artificial intelligence is transforming website design in 2025. Learn about AI tools, benefits, real-world applications, and future trends in web development.",
      keywords: ["AI website design", "artificial intelligence web development", "automated web design", "AI design tools 2025", "machine learning web design"]
    },
    {
      id: 2,
      title: "Complete Guide to Converting GitHub Repositories into Documentation",
      excerpt: "Learn how to transform your GitHub repos into beautiful, searchable documentation sites that developers will love.",
      slug: "github-repositories-documentation-guide",
      author: "Mike Rodriguez",
      date: "2025-01-12",
      readTime: "12 min read",
      category: "Documentation",
      tags: ["GitHub", "Documentation", "Developer Tools"],
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1200",
      content: `
        <p>Converting GitHub repositories into comprehensive documentation is essential for project adoption and developer experience. This guide covers everything you need to know about transforming your code repositories into professional documentation sites.</p>

        <h2>Why Documentation Matters</h2>
        <p>Good documentation is the difference between a project that thrives and one that gets abandoned. It serves as the bridge between your code and the developers who want to use it.</p>

        <h3>Benefits of Proper Documentation:</h3>
        <ul>
          <li>Increased project adoption and community engagement</li>
          <li>Reduced support burden through self-service resources</li>
          <li>Better onboarding experience for new contributors</li>
          <li>Improved project credibility and professionalism</li>
        </ul>

        <h2>Planning Your Documentation Structure</h2>
        <p>Before diving into tools and implementation, it's crucial to plan your documentation structure:</p>

        <h3>Essential Documentation Sections:</h3>
        <ol>
          <li><strong>Getting Started:</strong> Installation, setup, and first steps</li>
          <li><strong>API Reference:</strong> Detailed function and method documentation</li>
          <li><strong>Tutorials:</strong> Step-by-step guides for common use cases</li>
          <li><strong>Examples:</strong> Code samples and real-world implementations</li>
          <li><strong>Contributing:</strong> Guidelines for community contributions</li>
          <li><strong>Changelog:</strong> Version history and updates</li>
        </ol>

        <h2>Tools and Platforms</h2>
        <p>Several excellent tools can help you convert your GitHub repository into documentation:</p>

        <h3>Static Site Generators:</h3>
        <ul>
          <li><strong>GitBook:</strong> User-friendly with excellent GitHub integration</li>
          <li><strong>Docusaurus:</strong> Facebook's documentation platform with React</li>
          <li><strong>VuePress:</strong> Vue.js-powered static site generator</li>
          <li><strong>Gatsby:</strong> React-based with powerful plugin ecosystem</li>
        </ul>

        <h3>Hosted Solutions:</h3>
        <ul>
          <li><strong>GitHub Pages:</strong> Free hosting directly from your repository</li>
          <li><strong>Netlify:</strong> Continuous deployment with advanced features</li>
          <li><strong>Vercel:</strong> Optimized for modern web frameworks</li>
        </ul>

        <h2>Step-by-Step Implementation</h2>
        <p>Here's a practical approach to converting your GitHub repository into documentation:</p>

        <h3>Step 1: Audit Your Existing Content</h3>
        <p>Start by reviewing what documentation already exists in your repository:</p>
        <ul>
          <li>README.md files</li>
          <li>Code comments and docstrings</li>
          <li>Wiki pages</li>
          <li>Issue templates and discussions</li>
        </ul>

        <h3>Step 2: Choose Your Tool Stack</h3>
        <p>Select tools based on your team's expertise and project requirements. For most projects, we recommend starting with a simple solution and evolving as needed.</p>

        <h3>Step 3: Set Up Automated Generation</h3>
        <p>Implement automated documentation generation using GitHub Actions or similar CI/CD tools. This ensures your documentation stays up-to-date with code changes.</p>

        <h2>Best Practices</h2>
        <p>Follow these best practices to create documentation that developers actually use:</p>

        <h3>Content Guidelines:</h3>
        <ul>
          <li><strong>Write for Your Audience:</strong> Consider the skill level of your users</li>
          <li><strong>Use Clear Examples:</strong> Show, don't just tell</li>
          <li><strong>Keep It Updated:</strong> Outdated documentation is worse than no documentation</li>
          <li><strong>Make It Searchable:</strong> Implement search functionality</li>
        </ul>

        <h3>Technical Considerations:</h3>
        <ul>
          <li><strong>Mobile Responsive:</strong> Ensure documentation works on all devices</li>
          <li><strong>Fast Loading:</strong> Optimize for performance</li>
          <li><strong>Accessible:</strong> Follow accessibility guidelines</li>
          <li><strong>SEO Optimized:</strong> Help users find your documentation</li>
        </ul>

        <h2>Advanced Features</h2>
        <p>Once you have basic documentation in place, consider adding these advanced features:</p>

        <h3>Interactive Elements:</h3>
        <ul>
          <li>Code playgrounds and live examples</li>
          <li>Interactive API explorers</li>
          <li>Embedded demos and tutorials</li>
          <li>Community features like comments and ratings</li>
        </ul>

        <h2>Measuring Success</h2>
        <p>Track these metrics to understand how well your documentation is serving users:</p>

        <ul>
          <li><strong>Usage Analytics:</strong> Page views, time on page, bounce rate</li>
          <li><strong>User Feedback:</strong> Surveys, ratings, and direct feedback</li>
          <li><strong>Support Metrics:</strong> Reduction in support tickets</li>
          <li><strong>Community Growth:</strong> Increased contributions and engagement</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Converting your GitHub repository into comprehensive documentation is an investment that pays dividends in project adoption, community engagement, and reduced support burden. Start simple, iterate based on user feedback, and continuously improve your documentation to serve your community better.</p>
      `,
      metaDescription: "Complete guide to converting GitHub repositories into beautiful documentation sites. Learn tools, best practices, and implementation strategies for developer documentation.",
      keywords: ["GitHub documentation", "repository to docs", "developer documentation", "GitHub Pages", "documentation tools", "API documentation"]
    },
    {
      id: 3,
      title: "SEO Best Practices for AI-Generated Websites",
      excerpt: "Maximize your website's search engine visibility with these proven SEO strategies specifically for AI-generated content.",
      slug: "seo-best-practices-ai-generated-websites",
      author: "Emma Thompson",
      date: "2025-01-10",
      readTime: "10 min read",
      category: "SEO",
      tags: ["SEO", "AI", "Content Marketing", "Search Engine"],
      image: "https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1200",
      content: `
        <p>As AI-generated websites become increasingly common, understanding how to optimize them for search engines is crucial for digital success. This comprehensive guide covers SEO strategies specifically tailored for AI-generated content and websites.</p>

        <h2>Understanding AI-Generated Content and SEO</h2>
        <p>Search engines have evolved to better understand and rank AI-generated content, but there are specific considerations to keep in mind when optimizing these sites for search visibility.</p>

        <h3>Key Challenges with AI-Generated Content:</h3>
        <ul>
          <li>Ensuring content uniqueness and avoiding duplication</li>
          <li>Maintaining content quality and relevance</li>
          <li>Creating authentic user experiences</li>
          <li>Building topical authority and expertise</li>
        </ul>

        <h2>Technical SEO for AI-Generated Sites</h2>
        <p>Technical SEO forms the foundation of any successful SEO strategy, and AI-generated sites have specific technical considerations:</p>

        <h3>Site Structure and Navigation:</h3>
        <ul>
          <li><strong>Clean URL Structure:</strong> Ensure URLs are descriptive and hierarchical</li>
          <li><strong>Internal Linking:</strong> Create logical connections between related content</li>
          <li><strong>XML Sitemaps:</strong> Help search engines discover and index your content</li>
          <li><strong>Robots.txt:</strong> Guide search engine crawlers effectively</li>
        </ul>

        <h3>Performance Optimization:</h3>
        <ul>
          <li><strong>Page Speed:</strong> Optimize loading times for better user experience</li>
          <li><strong>Core Web Vitals:</strong> Focus on LCP, FID, and CLS metrics</li>
          <li><strong>Mobile Optimization:</strong> Ensure responsive design across devices</li>
          <li><strong>Image Optimization:</strong> Compress and properly format images</li>
        </ul>

        <h2>Content Strategy for AI-Generated Sites</h2>
        <p>Creating high-quality, SEO-optimized content with AI requires a strategic approach:</p>

        <h3>Content Planning:</h3>
        <ol>
          <li><strong>Keyword Research:</strong> Identify target keywords and search intent</li>
          <li><strong>Content Gaps:</strong> Find opportunities in your niche</li>
          <li><strong>Competitor Analysis:</strong> Understand what's working in your industry</li>
          <li><strong>Content Calendar:</strong> Plan consistent content publication</li>
        </ol>

        <h3>AI Content Optimization:</h3>
        <ul>
          <li><strong>Prompt Engineering:</strong> Craft detailed prompts for better AI output</li>
          <li><strong>Human Review:</strong> Always review and edit AI-generated content</li>
          <li><strong>Fact-Checking:</strong> Verify accuracy of AI-generated information</li>
          <li><strong>Brand Voice:</strong> Ensure consistency with your brand tone</li>
        </ul>

        <h2>On-Page SEO Optimization</h2>
        <p>Optimize individual pages for maximum search engine visibility:</p>

        <h3>Title Tags and Meta Descriptions:</h3>
        <ul>
          <li>Include target keywords naturally</li>
          <li>Keep titles under 60 characters</li>
          <li>Write compelling meta descriptions under 160 characters</li>
          <li>Make each page's metadata unique</li>
        </ul>

        <h3>Header Structure:</h3>
        <ul>
          <li>Use H1 tags for main page titles</li>
          <li>Create logical hierarchy with H2, H3, etc.</li>
          <li>Include keywords in headers naturally</li>
          <li>Ensure headers accurately describe content sections</li>
        </ul>

        <h2>Content Quality and E-A-T</h2>
        <p>Google's E-A-T (Expertise, Authoritativeness, Trustworthiness) guidelines are crucial for AI-generated content:</p>

        <h3>Building Expertise:</h3>
        <ul>
          <li><strong>Author Bios:</strong> Create detailed author profiles</li>
          <li><strong>Credentials:</strong> Highlight relevant qualifications</li>
          <li><strong>Source Citations:</strong> Link to authoritative sources</li>
          <li><strong>Original Research:</strong> Include unique insights and data</li>
        </ul>

        <h3>Establishing Authority:</h3>
        <ul>
          <li><strong>Backlink Building:</strong> Earn links from reputable sites</li>
          <li><strong>Industry Recognition:</strong> Showcase awards and mentions</li>
          <li><strong>Social Proof:</strong> Display testimonials and reviews</li>
          <li><strong>Thought Leadership:</strong> Publish industry insights</li>
        </ul>

        <h2>Local SEO for AI-Generated Sites</h2>
        <p>If your AI-generated site serves local markets, implement these local SEO strategies:</p>

        <h3>Local Optimization Tactics:</h3>
        <ul>
          <li><strong>Google My Business:</strong> Optimize your business profile</li>
          <li><strong>Local Keywords:</strong> Include location-based terms</li>
          <li><strong>NAP Consistency:</strong> Ensure consistent Name, Address, Phone</li>
          <li><strong>Local Content:</strong> Create location-specific pages</li>
        </ul>

        <h2>Monitoring and Analytics</h2>
        <p>Track your SEO performance with these essential tools and metrics:</p>

        <h3>Essential SEO Tools:</h3>
        <ul>
          <li><strong>Google Search Console:</strong> Monitor search performance</li>
          <li><strong>Google Analytics:</strong> Track user behavior and conversions</li>
          <li><strong>SEO Platforms:</strong> Use tools like SEMrush or Ahrefs</li>
          <li><strong>Page Speed Tools:</strong> Monitor site performance</li>
        </ul>

        <h3>Key Metrics to Track:</h3>
        <ul>
          <li>Organic traffic growth</li>
          <li>Keyword ranking improvements</li>
          <li>Click-through rates from search results</li>
          <li>Bounce rate and user engagement</li>
          <li>Conversion rates from organic traffic</li>
        </ul>

        <h2>Future-Proofing Your SEO Strategy</h2>
        <p>Stay ahead of SEO trends and algorithm updates:</p>

        <h3>Emerging Trends:</h3>
        <ul>
          <li><strong>AI Search:</strong> Optimize for AI-powered search engines</li>
          <li><strong>Voice Search:</strong> Prepare for conversational queries</li>
          <li><strong>Visual Search:</strong> Optimize images for visual discovery</li>
          <li><strong>Entity SEO:</strong> Focus on entities and relationships</li>
        </ul>

        <h2>Conclusion</h2>
        <p>SEO for AI-generated websites requires a balanced approach that combines technical excellence, content quality, and user experience optimization. By following these best practices and staying updated with search engine guidelines, you can achieve strong organic visibility for your AI-generated content.</p>

        <p>Remember that SEO is a long-term strategy. Focus on creating valuable content for your users, and search engine rankings will follow naturally.</p>
      `,
      metaDescription: "Learn SEO best practices for AI-generated websites. Discover strategies for optimizing AI content, technical SEO, and building search engine visibility.",
      keywords: ["AI SEO", "AI-generated content SEO", "search engine optimization", "AI website optimization", "content marketing AI", "SEO strategy 2025"]
    }
    // Add more blog posts here...
  ];

  const blog = blogs.find(b => b.slug === slug);

  useEffect(() => {
    if (blog) {
      // Update page title and meta description for SEO
      document.title = `${blog.title} | redesignr.ai Blog`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', blog.metaDescription);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = blog.metaDescription;
        document.head.appendChild(meta);
      }

      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', blog.keywords.join(', '));
      } else {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        metaKeywords.content = blog.keywords.join(', ');
        document.head.appendChild(metaKeywords);
      }

      // Add Open Graph meta tags
      const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      ogTitle.setAttribute('content', blog.title);
      if (!document.querySelector('meta[property="og:title"]')) {
        document.head.appendChild(ogTitle);
      }

      const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      ogDescription.setAttribute('content', blog.metaDescription);
      if (!document.querySelector('meta[property="og:description"]')) {
        document.head.appendChild(ogDescription);
      }

      const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      ogImage.setAttribute('content', blog.image);
      if (!document.querySelector('meta[property="og:image"]')) {
        document.head.appendChild(ogImage);
      }

      // Add structured data for SEO
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.metaDescription,
        "image": blog.image,
        "author": {
          "@type": "Person",
          "name": blog.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "redesignr.ai",
          "logo": {
            "@type": "ImageObject",
            "url": "https://redesignr.ai/logo.png"
          }
        },
        "datePublished": blog.date,
        "dateModified": blog.date,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://redesignr.ai/blog/${blog.slug}`
        }
      };

      // Remove existing structured data
      const existingScript = document.querySelector('script[type="application/ld+json"][data-blog]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-blog', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      document.title = 'redesignr.ai - AI Website Builder';
    };
  }, [blog]);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-3xl opacity-30"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="mb-8">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Link>
              </nav>

              {/* Article Header */}
              <header className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                    {blog.category}
                  </span>
                  <div className="flex items-center text-slate-400 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(blog.date)}
                  </div>
                  <div className="flex items-center text-slate-400 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {blog.readTime}
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {blog.title}
                </h1>

                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{blog.author}</p>
                      <p className="text-slate-400 text-sm">Content Specialist</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>
              </header>

              {/* Featured Image */}
              <div className="mb-12">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 md:h-96 object-cover rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg prose-invert max-w-none">
                <div 
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </article>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-400 font-medium">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-800/50 text-slate-300 px-3 py-1 rounded-full text-sm hover:bg-slate-700/50 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-16 p-8 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-700/30 rounded-xl text-center">
                <BookOpen className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Build Your Website?</h3>
                <p className="text-indigo-200 mb-6">
                  Put these insights into practice with our AI-powered website builder. Create stunning, SEO-optimized websites in minutes.
                </p>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                >
                  Start Building Now
                  <ArrowLeft className="h-5 w-5 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .blog-content h2 {
          @apply text-2xl font-bold text-white mt-8 mb-4;
        }
        .blog-content h3 {
          @apply text-xl font-semibold text-white mt-6 mb-3;
        }
        .blog-content p {
          @apply text-slate-300 mb-4 leading-relaxed;
        }
        .blog-content ul, .blog-content ol {
          @apply text-slate-300 mb-4 pl-6;
        }
        .blog-content li {
          @apply mb-2;
        }
        .blog-content strong {
          @apply text-white font-semibold;
        }
        .blog-content blockquote {
          @apply border-l-4 border-indigo-500 pl-6 py-2 my-6 bg-slate-800/30 rounded-r-lg italic text-slate-300;
        }
        .blog-content code {
          @apply bg-slate-800 text-indigo-300 px-2 py-1 rounded text-sm;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;