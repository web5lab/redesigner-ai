import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, User, Tag, Share2, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog = () => {
  const { slug } = useParams();

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
        <p>Artificial Intelligence is no longer a futuristic concept—it's actively reshaping how we approach website design and development. In 2025, AI tools have become indispensable for designers and developers, offering unprecedented capabilities that streamline workflows and enhance creativity.</p>

        <h2>The Current State of AI in Web Design</h2>
        <p>Today's AI-powered design tools can analyze user behavior, generate layouts, optimize content placement, and even write code. These capabilities have fundamentally changed the design process, making it faster, more efficient, and more data-driven than ever before.</p>

        <h3>Key AI Technologies Transforming Design</h3>
        <ul>
          <li><strong>Generative Design:</strong> AI algorithms that create multiple design variations based on specified parameters</li>
          <li><strong>Intelligent Layout Systems:</strong> Automated grid systems that adapt to content and screen sizes</li>
          <li><strong>Content-Aware Design:</strong> AI that understands content context and suggests appropriate visual treatments</li>
          <li><strong>Predictive UX:</strong> Machine learning models that anticipate user needs and behaviors</li>
        </ul>

        <h2>Real-World Applications</h2>
        <p>Companies like Figma, Adobe, and emerging startups are integrating AI into their design tools. These applications range from simple color palette suggestions to complex layout generation based on content analysis.</p>

        <blockquote>
          "AI doesn't replace designers—it amplifies their creativity and allows them to focus on higher-level strategic thinking." - Design Industry Expert
        </blockquote>

        <h2>The Future Landscape</h2>
        <p>As we move further into 2025, we can expect AI to become even more sophisticated, offering personalized design experiences, real-time optimization, and seamless integration between design and development workflows.</p>

        <h3>What This Means for Designers</h3>
        <p>Designers who embrace AI tools will find themselves more productive and capable of delivering better results. The key is learning to work alongside AI, using it as a powerful assistant rather than viewing it as a replacement.</p>
      `
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
        <p>Good documentation is crucial for any software project, but creating and maintaining it can be time-consuming. This guide will show you how to automatically generate beautiful documentation from your GitHub repositories.</p>

        <h2>Why Documentation Matters</h2>
        <p>Documentation serves as the bridge between your code and its users. Well-structured documentation can significantly improve adoption rates, reduce support requests, and help new contributors get up to speed quickly.</p>

        <h3>Common Documentation Challenges</h3>
        <ul>
          <li>Keeping documentation in sync with code changes</li>
          <li>Creating visually appealing and navigable docs</li>
          <li>Making documentation searchable and accessible</li>
          <li>Maintaining consistency across multiple projects</li>
        </ul>

        <h2>Automated Documentation Generation</h2>
        <p>Modern tools can analyze your repository structure, README files, code comments, and other metadata to generate comprehensive documentation automatically.</p>

        <h3>Key Features of Modern Doc Generators</h3>
        <ul>
          <li><strong>Markdown Processing:</strong> Convert README and other markdown files into styled web pages</li>
          <li><strong>Code Analysis:</strong> Extract API documentation from code comments</li>
          <li><strong>Interactive Examples:</strong> Generate runnable code examples</li>
          <li><strong>Search Integration:</strong> Built-in search functionality</li>
          <li><strong>Responsive Design:</strong> Mobile-friendly documentation sites</li>
        </ul>

        <h2>Best Practices for Repository Documentation</h2>
        <p>To get the best results from automated documentation generation, follow these best practices:</p>

        <h3>Structure Your Repository</h3>
        <p>Organize your files logically with clear naming conventions. Use folders to group related functionality and include descriptive README files in each directory.</p>

        <h3>Write Comprehensive README Files</h3>
        <p>Your main README should include installation instructions, usage examples, API references, and contribution guidelines. Use clear headings and formatting to make it scannable.</p>

        <h3>Document Your Code</h3>
        <p>Use consistent commenting patterns and include examples in your code comments. This helps automated tools generate better API documentation.</p>

        <h2>Tools and Platforms</h2>
        <p>Several platforms can help you generate documentation from GitHub repositories, each with their own strengths and use cases.</p>
      `
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
        <p>As AI-generated websites become more prevalent, understanding how to optimize them for search engines is crucial for online success. This guide covers essential SEO strategies tailored specifically for AI-created content.</p>

        <h2>Understanding AI-Generated Content and SEO</h2>
        <p>Search engines have evolved to better understand and rank AI-generated content, but there are specific considerations to keep in mind when optimizing these sites.</p>

        <h3>Key SEO Challenges with AI Content</h3>
        <ul>
          <li>Ensuring content uniqueness and avoiding duplication</li>
          <li>Maintaining natural language patterns</li>
          <li>Creating meaningful internal linking structures</li>
          <li>Balancing automation with human oversight</li>
        </ul>

        <h2>Technical SEO for AI Websites</h2>
        <p>Technical SEO forms the foundation of any successful website. For AI-generated sites, pay special attention to these areas:</p>

        <h3>Site Structure and Navigation</h3>
        <p>Ensure your AI-generated site has a logical hierarchy and clear navigation paths. Use descriptive URLs and implement proper breadcrumb navigation.</p>

        <h3>Page Speed Optimization</h3>
        <p>AI-generated sites should be optimized for speed. Compress images, minify CSS and JavaScript, and leverage browser caching to improve load times.</p>

        <h3>Mobile Responsiveness</h3>
        <p>With mobile-first indexing, ensure your AI-generated designs are fully responsive and provide excellent user experiences across all devices.</p>

        <h2>Content Optimization Strategies</h2>
        <p>While AI can generate content quickly, optimizing it for search engines requires strategic thinking:</p>

        <h3>Keyword Research and Implementation</h3>
        <p>Use AI tools to identify relevant keywords, but implement them naturally within the content. Avoid keyword stuffing and focus on semantic relevance.</p>

        <h3>Content Quality and Uniqueness</h3>
        <p>Ensure AI-generated content provides unique value and isn't simply rehashing existing information. Add original insights and perspectives.</p>

        <h2>Monitoring and Optimization</h2>
        <p>Regular monitoring is essential for AI-generated websites. Use analytics tools to track performance and make data-driven optimizations.</p>
      `
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
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200",
      content: `
        <p>Mobile-first design has become the standard approach for modern web development. This comprehensive guide will teach you how to create responsive websites that provide excellent user experiences across all devices.</p>

        <h2>Understanding Mobile-First Design</h2>
        <p>Mobile-first design means starting your design process with mobile devices and then progressively enhancing for larger screens. This approach ensures optimal performance and usability on the devices most users rely on.</p>

        <h3>Why Mobile-First Matters</h3>
        <ul>
          <li>Over 60% of web traffic comes from mobile devices</li>
          <li>Google uses mobile-first indexing for search rankings</li>
          <li>Mobile users have different needs and behaviors</li>
          <li>Performance constraints on mobile require careful optimization</li>
        </ul>

        <h2>Core Responsive Design Principles</h2>
        <p>Successful responsive design relies on several key principles that ensure consistency across devices:</p>

        <h3>Flexible Grid Systems</h3>
        <p>Use CSS Grid and Flexbox to create layouts that adapt to different screen sizes. Avoid fixed widths and embrace percentage-based and viewport-relative units.</p>

        <h3>Flexible Images and Media</h3>
        <p>Implement responsive images using the picture element and srcset attribute. Ensure videos and other media scale appropriately.</p>

        <h3>CSS Media Queries</h3>
        <p>Use media queries to apply different styles based on device characteristics like screen width, height, and orientation.</p>

        <h2>Mobile-First CSS Strategy</h2>
        <p>When writing CSS with a mobile-first approach, start with styles for small screens and use min-width media queries to enhance for larger screens:</p>

        <pre><code>/* Base styles for mobile */
.container {
  padding: 1rem;
  max-width: 100%;
}

/* Tablet styles */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 750px;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
    max-width: 1200px;
  }
}</code></pre>

        <h2>Performance Considerations</h2>
        <p>Mobile devices often have slower connections and less processing power, making performance optimization crucial:</p>

        <h3>Optimize Images</h3>
        <p>Use modern image formats like WebP, implement lazy loading, and serve appropriately sized images for different screen densities.</p>

        <h3>Minimize HTTP Requests</h3>
        <p>Combine CSS and JavaScript files, use CSS sprites for icons, and eliminate unnecessary resources.</p>

        <h2>Testing and Validation</h2>
        <p>Regular testing across real devices and browsers is essential for ensuring your responsive design works correctly.</p>
      `
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
      image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200",
      content: `
        <p>No-code development platforms are revolutionizing how we build digital products. This article explores current trends and future predictions for the no-code movement.</p>

        <h2>The No-Code Revolution</h2>
        <p>No-code platforms enable users to create applications and websites without traditional programming knowledge. This democratization of development is opening new possibilities for entrepreneurs, designers, and business professionals.</p>

        <h3>Current Market Landscape</h3>
        <p>The no-code market has experienced explosive growth, with platforms like Webflow, Bubble, and Airtable leading the charge. These tools are becoming increasingly sophisticated, offering features that rival traditional development approaches.</p>

        <h2>Key Trends Shaping No-Code</h2>
        <p>Several trends are driving the evolution of no-code platforms:</p>

        <h3>AI Integration</h3>
        <p>AI is being integrated into no-code platforms to automate design decisions, generate content, and optimize user experiences automatically.</p>

        <h3>Enterprise Adoption</h3>
        <p>Large organizations are embracing no-code solutions for rapid prototyping, internal tools, and customer-facing applications.</p>

        <h3>Advanced Functionality</h3>
        <p>Modern no-code platforms support complex features like database management, API integrations, and custom logic flows.</p>

        <h2>Future Predictions</h2>
        <p>Looking ahead, we can expect no-code platforms to become even more powerful and accessible:</p>

        <h3>Increased Sophistication</h3>
        <p>Future platforms will offer more advanced features, better performance, and greater customization options.</p>

        <h3>Better Developer Integration</h3>
        <p>No-code and traditional development will become more integrated, allowing for hybrid approaches that leverage both methodologies.</p>

        <h2>Challenges and Limitations</h2>
        <p>While no-code platforms offer many advantages, they also have limitations that users should understand:</p>

        <ul>
          <li>Platform lock-in and vendor dependency</li>
          <li>Limited customization for complex requirements</li>
          <li>Performance considerations for high-traffic applications</li>
          <li>Learning curve for advanced features</li>
        </ul>

        <h2>Conclusion</h2>
        <p>No-code development is here to stay and will continue to evolve. While it won't replace traditional development entirely, it will become an increasingly important tool in the digital creation toolkit.</p>
      `
    }
  ];

  // If no slug is provided, show blog listing
  if (!slug) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-200">
        <Navbar />
        <main className="pt-20">
          {/* Blog Header */}
          <section className="py-16 relative overflow-hidden">
            <div className="absolute top-1/4 right-1/6 w-96 h-96 bg-purple-600/15 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-12">
                <div className="inline-block px-4 py-1.5 mb-6 bg-slate-800/80 rounded-full backdrop-blur-sm border border-slate-700">
                  <span className="text-purple-400 text-sm font-medium">
                    📚 Knowledge Hub
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Latest{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                    Articles & Tutorials
                  </span>
                </h1>
                <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto">
                  Discover insights, tutorials, and best practices for modern web development, AI tools, and digital strategy.
                </p>
              </div>
            </div>
          </section>

          {/* Blog Grid */}
          <section className="pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
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
                          {new Date(blog.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
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
                        
                        <Link
                          to={`/blog/${blog.slug}`}
                          className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors group/btn"
                        >
                          Read More
                          <ArrowLeft className="h-3 w-3 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
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
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Find the specific blog post
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-200">
        <Navbar />
        <main className="pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
            <p className="text-slate-400 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Navbar />
      <main className="pt-20">
        {/* Blog Header */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute top-1/4 right-1/6 w-96 h-96 bg-purple-600/15 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Back to Blog */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>

              {/* Blog Meta */}
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

              {/* Blog Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Author Info */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{blog.author}</p>
                    <p className="text-slate-400 text-sm">Content Writer & Developer</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>

              {/* Featured Image */}
              <div className="relative overflow-hidden rounded-2xl mb-12">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <div 
                    className="prose prose-lg prose-invert max-w-none
                      prose-headings:text-white prose-headings:font-bold
                      prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                      prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                      prose-ul:text-slate-300 prose-li:mb-2
                      prose-strong:text-white prose-strong:font-semibold
                      prose-blockquote:border-l-4 prose-blockquote:border-purple-500 
                      prose-blockquote:bg-slate-800/50 prose-blockquote:p-4 
                      prose-blockquote:rounded-r-lg prose-blockquote:text-slate-300
                      prose-code:bg-slate-800 prose-code:text-purple-400 
                      prose-code:px-2 prose-code:py-1 prose-code:rounded
                      prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-slate-700">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Tags
                    </h3>
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
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-8">
                    {/* Table of Contents */}
                    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6">
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Table of Contents
                      </h3>
                      <nav className="space-y-2">
                        <a href="#" className="block text-slate-400 hover:text-white text-sm transition-colors">
                          Introduction
                        </a>
                        <a href="#" className="block text-slate-400 hover:text-white text-sm transition-colors">
                          Key Concepts
                        </a>
                        <a href="#" className="block text-slate-400 hover:text-white text-sm transition-colors">
                          Best Practices
                        </a>
                        <a href="#" className="block text-slate-400 hover:text-white text-sm transition-colors">
                          Conclusion
                        </a>
                      </nav>
                    </div>

                    {/* Related Articles */}
                    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6">
                      <h3 className="text-white font-semibold mb-4">Related Articles</h3>
                      <div className="space-y-4">
                        {blogs.filter(b => b.id !== blog.id).slice(0, 3).map((relatedBlog) => (
                          <Link
                            key={relatedBlog.id}
                            to={`/blog/${relatedBlog.slug}`}
                            className="block group"
                          >
                            <h4 className="text-slate-300 group-hover:text-white text-sm font-medium mb-1 transition-colors">
                              {relatedBlog.title}
                            </h4>
                            <p className="text-slate-500 text-xs">{relatedBlog.readTime}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;