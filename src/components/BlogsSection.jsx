import React from 'react';
import { Calendar, Clock, ArrowRight, User, Tag } from 'lucide-react';

const BlogsSection = () => {
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
    },
    {
      id: 5,
      title: "The Future of No-Code Development: Trends and Predictions",
      excerpt: "Explore the evolving landscape of no-code development and how it's democratizing website creation for everyone.",
      slug: "future-no-code-development-trends",
      author: "Lisa Wang",
      date: "2025-01-05",
      readTime: "7 min read",
      category: "No-Code",
      tags: ["No-Code", "Development", "Trends", "Future"],
      image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 6,
      title: "Website Performance Optimization: Speed Up Your Site in 2025",
      excerpt: "Learn advanced techniques to optimize your website's performance and deliver lightning-fast user experiences.",
      slug: "website-performance-optimization-2025",
      author: "Alex Johnson",
      date: "2025-01-03",
      readTime: "11 min read",
      category: "Performance",
      tags: ["Performance", "Optimization", "Speed", "Core Web Vitals"],
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 7,
      title: "Accessibility in Web Design: Creating Inclusive Digital Experiences",
      excerpt: "Discover how to build websites that are accessible to all users, including those with disabilities, while maintaining beautiful design.",
      slug: "accessibility-web-design-inclusive-experiences",
      author: "Rachel Green",
      date: "2025-01-01",
      readTime: "9 min read",
      category: "Accessibility",
      tags: ["Accessibility", "Inclusive Design", "WCAG", "UX"],
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 8,
      title: "Converting Figma Designs to Code: Automated vs Manual Approaches",
      excerpt: "Compare different methods of converting Figma designs to production-ready code and find the best approach for your workflow.",
      slug: "figma-designs-to-code-automated-manual",
      author: "Tom Wilson",
      date: "2024-12-28",
      readTime: "13 min read",
      category: "Design to Code",
      tags: ["Figma", "Design", "Code Generation", "Workflow"],
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 9,
      title: "Building High-Converting Landing Pages with AI",
      excerpt: "Learn how to leverage AI tools to create landing pages that convert visitors into customers with proven design patterns.",
      slug: "high-converting-landing-pages-ai",
      author: "Jennifer Lee",
      date: "2024-12-25",
      readTime: "14 min read",
      category: "Conversion",
      tags: ["Landing Pages", "Conversion", "AI", "Marketing"],
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 10,
      title: "The Complete Guide to Website Redesign: Strategy and Execution",
      excerpt: "A comprehensive guide to planning and executing successful website redesigns that improve user experience and business results.",
      slug: "complete-guide-website-redesign-strategy",
      author: "Mark Davis",
      date: "2024-12-22",
      readTime: "16 min read",
      category: "Strategy",
      tags: ["Website Redesign", "Strategy", "UX", "Business"],
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800"
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

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 right-1/6 w-96 h-96 bg-purple-600/15 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/6 w-96 h-96 bg-indigo-600/15 rounded-full filter blur-3xl opacity-40 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 bg-slate-800/80 rounded-full backdrop-blur-sm border border-slate-700 shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
            <span className="text-purple-400 text-sm font-medium">
              📚 Latest Insights & Tutorials
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Learn from{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400">
              Expert Insights
            </span>
          </h2>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Stay ahead with the latest trends, tutorials, and best practices in{' '}
            <span className="text-purple-400 font-medium">AI-powered web development</span>,{' '}
            design, and digital strategy.
          </p>
        </div>

        {/* Featured Blog */}
        {featuredBlog && (
          <div className="mb-16">
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
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
                    <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors group/btn">
                      Read More
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {regularBlogs.slice(0, 9).map((blog) => (
            <article
              key={blog.id}
              className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 group hover:transform hover:scale-105"
            >
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
              
              <div className="p-6">
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
                
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-slate-400 text-xs">{blog.author}</span>
                  </div>
                  
                  <button className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors group/btn">
                    Read
                    <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
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
          ))}
        </div>

        {/* View All Blogs CTA */}
        <div className="text-center">
          <button className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-2">
              View All Articles
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default BlogsSection;