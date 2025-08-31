import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, BookOpen, ExternalLink, Star, Heart, MessageCircle, Bookmark, Eye, ThumbsUp, Copy, CheckCircle } from 'lucide-react';
import { blogs } from './blogs'; // Assuming you have a blogs data file
import Navbar from './Navbar';
import Footer from './Footer';
const BlogPost = () => {
  const { slug } = useParams();
  const blog = blogs.find(b => b.slug === slug);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('.article-content');
      if (article) {
        const scrollTop = window.scrollY;
        const docHeight = article.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        setReadingProgress(Math.min(scrollPercent, 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.log('Failed to copy');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
     
      <main className="pt-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Effects */}

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
            <div className="max-w-4xl mx-auto">
              {/* Article Header */}
              <header className="mb-12">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
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
                  <div className="flex items-center text-slate-400 text-sm">
                    <Eye className="h-4 w-4 mr-1" />
                    {blog.views.toLocaleString()} views
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent">
                    {blog.title}
                  </span>
                </h1>

                <p className="text-xl text-slate-300 mb-8 leading-relaxed font-light">
                  {blog.excerpt}
                </p>

                {/* Author and Actions */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <User className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-lg">{blog.author}</p>
                      <p className="text-slate-400 text-sm">AI Content Specialist</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isLiked
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50'
                        }`}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                      {blog.likes + (isLiked ? 1 : 0)}
                    </button>

                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`p-2 rounded-lg transition-all ${isBookmarked
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50'
                        }`}
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>

                    <div className="relative">
                      <button
                        onClick={handleShare}
                        className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white px-4 py-2 rounded-lg border border-slate-700/50 transition-all"
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </button>

                      {showShareMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10">
                          <div className="p-2">
                            <button
                              onClick={copyToClipboard}
                              className="w-full flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                            >
                              {copySuccess ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              {copySuccess ? 'Copied!' : 'Copy Link'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <div className="mb-12">
                <div className="relative group">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto">
              <article className="article-content">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </article>

              {/* Engagement Section */}
              <div className="mt-16 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Enjoyed this article?</h3>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-slate-400" />
                    <span className="text-slate-400">{blog.comments} comments</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${isLiked
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:bg-slate-600/50'
                      }`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? 'Liked' : 'Like'}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white px-6 py-3 rounded-lg border border-slate-600/50 transition-all"
                  >
                    <Share2 className="h-5 w-5" />
                    Share
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-slate-700/50">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-300 font-medium">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white px-4 py-2 rounded-full text-sm transition-all cursor-pointer border border-slate-700/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-16 p-8 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 rounded-2xl text-center backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Build Your Website?</h3>
                <p className="text-slate-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                  Put these insights into practice with our AI-powered website builder. Create stunning, SEO-optimized websites in minutes.
                </p>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start Building Now
                  <ArrowLeft className="h-5 w-5 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        /* Base Typography */
        .prose {
          color: #cbd5e1;
          line-height: 1.75;
        }

        .prose .lead {
          font-size: 1.25rem;
          font-weight: 300;
          color: #e2e8f0;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .prose p {
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
          line-height: 1.7;
          color: #cbd5e1;
        }

        .prose h2 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 0.75rem;
        }

        .prose h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(to right, #6366f1, #8b5cf6);
          border-radius: 2px;
        }

        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .prose h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .prose strong {
          color: #ffffff;
          font-weight: 600;
        }

        .prose em {
          color: #a5b4fc;
          font-style: italic;
        }

        /* Tools Grid */
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .tool-card {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6));
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 1rem;
          padding: 2rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .tool-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(to right, #6366f1, #8b5cf6);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .tool-card:hover::before {
          transform: scaleX(1);
        }

        .tool-card:hover {
          transform: translateY(-4px);
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .tool-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.5rem 0;
        }

        .tool-category {
          font-size: 0.875rem;
          color: #a5b4fc;
          font-weight: 500;
          display: block;
          margin-bottom: 1rem;
        }

        .tool-card p {
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .tool-actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tool-badge {
          background: rgba(99, 102, 241, 0.1);
          color: #a5b4fc;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        /* Insight Cards */
        .insight-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .insight-card {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.4));
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .insight-card:hover {
          transform: translateY(-2px);
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .insight-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          display: block;
        }

        .insight-card h4 {
          color: #ffffff;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .insight-card p {
          color: #94a3b8;
          font-size: 0.875rem;
          margin: 0;
        }

        /* Conclusion Highlight */
        .conclusion-highlight {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 1rem;
          padding: 2rem;
          margin: 2rem 0;
          text-align: center;
          font-size: 1.25rem;
          color: #e2e8f0;
          backdrop-filter: blur(10px);
        }

        /* Lists */
        .prose ul {
          margin: 2rem 0;
          padding-left: 0;
          list-style: none;
        }

        .prose ul li {
          position: relative;
          padding-left: 2rem;
          margin-bottom: 1rem;
          color: #cbd5e1;
          line-height: 1.6;
        }

        .prose ul li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #6366f1;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .prose ol {
          margin: 2rem 0;
          padding-left: 0;
          list-style: none;
          counter-reset: item;
        }

        .prose ol li {
          position: relative;
          padding-left: 3rem;
          margin-bottom: 2rem;
          color: #cbd5e1;
          line-height: 1.6;
          counter-increment: item;
        }

        .prose ol li::before {
          content: counter(item);
          position: absolute;
          left: 0;
          top: 0;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.875rem;
        }

        /* Blockquotes */
        .prose blockquote {
          border-left: 4px solid #6366f1;
          padding-left: 2rem;
          margin: 2rem 0;
          background: rgba(15, 23, 42, 0.5);
          border-radius: 0 1rem 1rem 0;
          padding: 1.5rem 2rem;
          font-style: italic;
          color: #e2e8f0;
          backdrop-filter: blur(10px);
        }

        /* Code */
        .prose code {
          background: rgba(15, 23, 42, 0.8);
          color: #a5b4fc;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 0.875rem;
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .prose pre {
          background: rgba(15, 23, 42, 0.9);
          color: #cbd5e1;
          padding: 1.5rem;
          border-radius: 1rem;
          overflow-x: auto;
          margin: 2rem 0;
          border: 1px solid rgba(148, 163, 184, 0.1);
          backdrop-filter: blur(10px);
        }

        /* Links */
        .prose a {
          color: #6366f1;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
          position: relative;
        }

        .prose a:hover {
          color: #8b5cf6;
        }

        .prose a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background: linear-gradient(to right, #6366f1, #8b5cf6);
          transition: width 0.3s ease;
        }

        .prose a:hover::after {
          width: 100%;
        }

        /* Tables */
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          background: rgba(15, 23, 42, 0.5);
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.1);
        }

        .prose th,
        .prose td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        }

        .prose th {
          background: rgba(99, 102, 241, 0.1);
          color: #ffffff;
          font-weight: 600;
        }

        .prose td {
          color: #cbd5e1;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .tools-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .insight-cards {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .tool-card {
            padding: 1.5rem;
          }

          .insight-card {
            padding: 1.5rem;
          }

          .prose h2 {
            font-size: 1.875rem;
          }

          .prose {
            font-size: 1rem;
          }

          .prose p {
            font-size: 1rem;
          }

          .conclusion-highlight {
            padding: 1.5rem;
            font-size: 1.125rem;
          }
        }

        /* Smooth Scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Selection */
        ::selection {
          background: rgba(99, 102, 241, 0.3);
          color: #ffffff;
        }

        /* Focus States */
        button:focus,
        a:focus {
          outline: 2px solid #6366f1;
          outline-offset: 2px;
        }

        /* Animation for elements coming into view */
        .tool-card {
          animation: fadeInUp 0.6s ease-out;
        }

        .insight-card {
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Stagger animation for cards */
        .tool-card:nth-child(1) { animation-delay: 0.1s; }
        .tool-card:nth-child(2) { animation-delay: 0.2s; }
        .tool-card:nth-child(3) { animation-delay: 0.3s; }
        .tool-card:nth-child(4) { animation-delay: 0.4s; }
        .tool-card:nth-child(5) { animation-delay: 0.5s; }
        .tool-card:nth-child(6) { animation-delay: 0.6s; }

        .insight-card:nth-child(1) { animation-delay: 0.1s; }
        .insight-card:nth-child(2) { animation-delay: 0.2s; }
        .insight-card:nth-child(3) { animation-delay: 0.3s; }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #8b5cf6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4f46e5, #7c3aed);
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default BlogPost;