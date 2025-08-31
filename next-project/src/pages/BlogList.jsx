import React, { useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowRight, Search, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogList = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = 'Blog - AI Website Design Insights | redesignr.ai';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover the latest insights, tutorials, and best practices in AI-powered web design, development, and digital strategy. Expert articles on website optimization, SEO, and modern web technologies.');
    }

    // Add structured data for blog list page
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "redesignr.ai Blog",
      "description": "Expert insights on AI-powered web design, development, and digital strategy",
      "url": "https://redesignr.ai/blog",
      "publisher": {
        "@type": "Organization",
        "name": "redesignr.ai",
        "logo": {
          "@type": "ImageObject",
          "url": "https://redesignr.ai/logo.webp"
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.title = 'redesignr.ai - AI Website Builder';
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

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
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
      featured: true
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
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800"
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
      image: "https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 4,
      title: "Building Responsive Websites: Mobile-First Design Principles",
      excerpt: "Master the art of responsive web design with mobile-first principles that ensure your site looks perfect on every device.",
      slug: "responsive-websites-mobile-first-design",
      author: "David Kim",
      date: "2025-01-08",
      readTime: "15 min read",
      category: "Web Design",
      tags: ["Responsive Design", "Mobile", "CSS", "UX"],
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const featuredBlog = blogs.find(blog => blog.featured);
  const regularBlogs = blogs.filter(blog => !blog.featured);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const categories = [...new Set(blogs.map(blog => blog.category))];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Navbar />
      
      <main className="pt-20">
        {/* Featured Blog */}
        {featuredBlog && (
          <section className="pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-8">Featured Article</h2>
                <Link href={`/blog/${featuredBlog.slug}`} className="block group">
                  <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={featuredBlog.image}
                          alt={featuredBlog.title}
                          className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                            {featuredBlog.category}
                          </span>
                          <div className="flex items-center text-slate-400 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(featuredBlog.date)}
                          </div>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                          {featuredBlog.title}
                        </h3>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                          {featuredBlog.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{featuredBlog.author}</p>
                              <div className="flex items-center text-slate-400 text-sm">
                                <Clock className="h-3 w-3 mr-1" />
                                {featuredBlog.readTime}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors">
                            Read More
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">Latest Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularBlogs.map((blog) => (
                  <Link key={blog.id} href={`/blog/${blog.slug}`} className="block group">
                    <article className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:transform hover:scale-105 h-full">
                      <div className="relative overflow-hidden">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-slate-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                            {blog.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-3 text-xs text-slate-400">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(blog.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {blog.readTime}
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors line-clamp-2 flex-grow">
                          {blog.title}
                        </h3>
                        
                        <p className="text-slate-300 text-sm mb-4 line-clamp-3 flex-grow">
                          {blog.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                              <User className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-slate-400 text-xs">{blog.author}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
                            Read
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-4">
                          {blog.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="bg-slate-700/50 text-slate-400 px-2 py-1 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogList;