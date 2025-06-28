import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Split answer into paragraphs if it contains \n
  const answerParagraphs = typeof answer === 'string' ? answer.split('\n') : [answer];

  return (
    <div className="border-b border-slate-700/50 px-4 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-white">{question}</h3>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-400" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 text-slate-300 space-y-2">
          {answerParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How does redesignr.ai work?",
      answer: "redesignr.ai is your AI-powered web creation assistant. It uses advanced artificial intelligence to understand your requirements, whether you're building from scratch, creating content, redesigning an existing site, or using a template. Our AI applies modern design principles and best practices to generate beautiful, functional web content and exportable code (React or HTML/CSS)."
    },
    {
      question: "What types of web content can I create?",
      answer: `You can create a variety of web content with redesignr.ai:
      - **New Landing Pages:** Describe your ideal page, and our AI will build it.
      - **Blogs:** Define a topic, optionally provide a context URL and theme color, and AI crafts blog posts and layouts.
      - **Documentation Sites:** Generate documentation from a GitHub repository URL or by uploading a Markdown file (e.g., README.md).
      - **Website Redesigns:** Input an existing URL to get AI-powered redesign suggestions (Multi-Design or Manual Mode).
      - **Template-Based Sites (Remix):** Choose from professional templates and apply them to an existing URL or customize them with your specific instructions.`
    },
    {
      question: "How do I start creating a new landing page or blog?",
      answer: `For a **new landing page** (using "Build New" mode), you'll describe the purpose, target audience, and key features of the page you envision. The more detail you provide, the better the AI can match your needs.
      For a **new blog** (using "Create Blog" mode), you'll define the main topic for your blog. You can optionally provide your existing website URL for style context, choose a theme color, and add custom instructions for tone or specific content points.`
    },
    {
      question: "Can I generate documentation for my software projects?",
      answer: "Yes! In the \"Create Docs\" mode, you have two primary options: \n1. Provide the URL of your public GitHub repository. Our AI will analyze its content (like the README) to structure your documentation site. \n2. Upload a Markdown file directly (e.g., your project's README.md or other technical documents). \nYou can also add custom instructions to guide the generation process, like focusing on specific sections or API endpoints."
    },
    {
      question: "What options do I have for redesigning an existing website or using templates?",
      answer: `When **redesigning from a URL** ("From URL" mode), you can choose:
      - **Multi-Design:** AI generates three unique design variations of your page.
      - **Manual Mode:** You select a theme (Light, Dark, AI Choice) for a single, focused redesign.
      When **using templates** ("Use Templates" / "Remix" mode), you first select a template. Then you can:
      - **Apply to Existing Page:** Provide your website URL, and AI will adapt the template's style to your site's content.
      - **Customize Template:** Provide instructions on how you want the selected template to be modified (e.g., change colors, content sections, or overall purpose).`
    },
    {
      question: "Can I customize the AI-generated output?",
      answer: "Absolutely. While our AI aims to get it right, you can guide it with custom instructions for most creation modes. After generation, you'll receive production-ready code (React.js and HTML/CSS). This code is clean and well-structured, allowing you or your developers to make further customizations and deploy it anywhere."
    },
    {
      question: "What code formats can I export?",
      answer: "We provide complete, production-ready source code in two popular formats: \n- **React.js:** Often utilizing Tailwind CSS for styling, perfect for modern web applications. \n- **HTML/CSS:** Standard, semantic HTML and CSS for broader compatibility and ease of use. \nThis gives you the flexibility to choose the format that best suits your technical stack and deployment needs."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-800 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-slate-300 text-lg">
              Got questions about using our AI web creation platform? Find answers to the most common questions below.
            </p>
          </div>
          
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer} 
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-slate-300 mb-4">Still have questions?</p>
            <a 
              href="#" // Replace with actual contact link or modal trigger
              className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;