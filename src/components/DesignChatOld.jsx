import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  X,
  Loader2,
  User,
  Bot,
  RefreshCw,
  Download,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Trash2,
  Smartphone,
  Monitor,
  Tablet,
  Moon,
  Sun,
  Expand,
  Shrink,
  Code,
  ExternalLink,
  Edit,
} from 'lucide-react';
import logo from "../assets/logo.webp"
import { useSelector } from 'react-redux';
import { UserSelector } from '../store/global.Selctor';
import toast from 'react-hot-toast';
import { AiChatHistory, DeleteAiChatHistory, updateWebsite } from '../store/global.Action';

const DesignChat = ({ website, onClose, onPreviewUpdate }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'model',
      content: `Hi! I'm your AI design assistant for "${website?.source || 'your website'}". I can help you with colors, layouts, content, and more. What would you like to change today?`,
      timestamp: new Date(),
    }
  ]);
  const [discussionMode, setDiscussionMode] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [showHistory, setShowHistory] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [showPreview, setShowPreview] = useState(true);
  const [fullScreenPreview, setFullScreenPreview] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [htmlPreview, setHtmlPreview] = useState(null);
  const [fullScreenHtml, setFullScreenHtml] = useState(false);
  const user = useSelector(UserSelector);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const data = await AiChatHistory({ uuid: website.uuid })
      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages);
        setCurrentSessionId(data._id);
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (fullScreenHtml) {
          setFullScreenHtml(false);
        } else if (fullScreenPreview) {
          setFullScreenPreview(false);
        }
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [fullScreenPreview, fullScreenHtml]);

  // Function to extract HTML from message content
  const extractHtml = (content) => {
    const htmlRegex = /```html\s*([\s\S]*?)```/i;
    const match = content.match(htmlRegex);
    return match ? match[1].trim() : null;
  };

  // Function to check if message contains HTML
  const hasHtml = (content) => {
    return /```html\s*[\s\S]*?```/i.test(content);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessageContent = inputMessage.trim();
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: userMessageContent,
      timestamp: new Date(),
    };

    const botMessageId = Date.now() + 1;
    const botMessagePlaceholder = {
      id: botMessageId,
      role: 'model',
      content: '',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botMessagePlaceholder]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userMessage: userMessageContent,
          sessionId: currentSessionId,
          websiteUuid: website.uuid,
          discussionMode,
        }),
      });

      if (!response.ok || !response.body) {
        console.log('API response error:', response.status);
        const currentPlan = user?.currentPlan || 'Free';
        if (response.status === 403) {
          if (currentPlan === 'Free' || currentPlan === 'free') {
            setMessages(prev => prev.map(msg =>
              msg.id === botMessageId
                ? { ...msg, content: "You are on the Free plan, which doesn't include AI Edit Feature. Upgrade your plan to start using them.", isError: true }
                : msg
            ));
            setIsLoading(false);
            return;
          } else {
            setMessages(prev => prev.map(msg =>
              msg.id === botMessageId
                ? { ...msg, content: "You have reached the limit of AI messages for this month. Please upgrade your plan to continue using AI Edit features.", isError: true } : msg
            ));
            setIsLoading(false);
            return;
          }
        } else {
          throw new Error(`API error: ${response.body.message}`);
        }

      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let botReply = '';
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Split into SSE events
        const events = buffer.split('\n\n');
        buffer = events.pop(); // incomplete buffer

        for (const event of events) {
          const lines = event.split('\n');
          let eventType = 'message';
          let data = '';

          for (const line of lines) {
            if (line.startsWith('event:')) {
              eventType = line.slice(6).trim();
            } else if (line.startsWith('data:')) {
              data += line.slice(5).trim();
            }
          }

          if (eventType === 'session') {
            setCurrentSessionId(data);
          } else if (eventType === 'error') {
            throw new Error(data);
          } else if (eventType === 'data' || eventType === 'message') {
            if (data.trim()) {
              botReply += data;
              setMessages(prev =>
                prev.map(msg =>
                  msg.id === botMessageId ? { ...msg, content: botReply } : msg
                )
              );
            }
          } else if (eventType === 'final') {
            // Final message – replace placeholder with clean message
            const finalReply = JSON.parse(data);
            setMessages(prev =>
              prev.map(msg =>
                msg.id === botMessageId
                  ? { ...msg, content: finalReply }
                  : msg
              )
            );
          }
        }
      }

    } catch (error) {
      console.error('Error during chat stream:', error);
      setMessages(prev => prev.map(msg =>
        msg.id === botMessageId
          ? {
            ...msg,
            content: error.message || 'An error occurred while processing your request.',
            isError: true,
          }
          : msg
      ));
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleRefreshPreview = () => {
    setPreviewKey(prev => prev + 1);
  };

  const handleDownload = async () => {
    try {
      const currentPlan = user?.currentPlan || 'Free';
      if (currentPlan === 'Free' || currentPlan === 'free') {
        setTimeout(() => {
          toast.success("Oops! This feature is part of our paid plans. Upgrade to unlock it!", {
            duration: 5000,
            position: 'top-center',
            style: {
              background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
              color: '#fff',
              padding: '16px',
              borderRadius: '10px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2), 0 20px 40px -20px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.1)'
            },
            icon: <Sparkles className="text-yellow-300" />,
          });
        }, 300);
        return;
      }
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/download-page/${website.uuid}/zip`);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `website.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const handleCopyMessage = (message) => {
    navigator.clipboard.writeText(message.content);
    setCopiedMessageId(message.id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleCopyHtml = (htmlContent) => {
    navigator.clipboard.writeText(htmlContent);
    setCopiedMessageId('html-copied');
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleClearChat = async () => {
    setMessages([
      {
        id: 1,
        role: 'model',
        content: `Hi! I'm your AI design assistant for "${website?.source || 'your website'}". What would you like to create today?`,
        timestamp: new Date(),
      }
    ]);
    await DeleteAiChatHistory({ uuid: website.uuid });
    setCurrentSessionId(null);
  };

  const handleNewChat = () => {
    handleClearChat();
  };

  const toggleFullScreenPreview = () => {
    setFullScreenPreview(!fullScreenPreview);
  };

  const handleHtmlPreview = (htmlContent) => {
    setHtmlPreview(htmlContent);
  };

  const handleFullScreenHtml = (htmlContent) => {
    setHtmlPreview(htmlContent);
    setFullScreenHtml(true);
  };

  const handleApplyChanges = async (htmlContent) => {
    try {
      setIsApplying(true);
      await updateWebsite({
        data: {
          websiteUuid: website.uuid,
          updatedHtml: htmlContent,
        }
      })
      setIsApplying(false);
      handleRefreshPreview();

      // Show success message
      const successMessage = {
        id: Date.now(),
        role: 'model',
        content: 'HTML changes have been applied successfully! The preview has been refreshed.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, successMessage]);

    } catch (error) {
      setIsApplying(false);
      console.error('Error applying HTML changes:', error);
      const errorMessage = {
        id: Date.now(),
        role: 'model',
        content: 'Sorry, there was an error applying the HTML changes. Please try again.',
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const getPreviewDimensions = () => {
    if (fullScreenPreview || fullScreenHtml) {
      return { width: '100%', height: '100%' };
    }
    switch (previewMode) {
      case 'mobile':
        return { width: '375px', height: '667px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      default:
        return { width: '100%', height: '100%' };
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderMessageContent = (message) => {
    if (hasHtml(message.content)) {
      const htmlContent = extractHtml(message.content);
      const textContent = message.content.replace(/```html\s*[\s\S]*?```/i, '').trim();

      return (
        <div className="space-y-3">
          {textContent && (
            <p className="text-sm leading-relaxed">{textContent}</p>
          )}

          <div className={`border rounded-lg overflow-hidden w-full ${darkMode ? 'border-slate-600' : 'border-slate-300'}`}>
            <div className={`flex items-center justify-between p-2 ${darkMode ? 'bg-slate-800/50' : 'bg-slate-100'} border-b ${darkMode ? 'border-slate-600' : 'border-slate-300'}`}>
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-medium">HTML Preview</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopyHtml(htmlContent)}
                  className={`p-1 hover:${darkMode ? 'bg-slate-700' : 'bg-slate-200'} rounded text-xs transition-colors`}
                  title="Copy HTML"
                >
                  {copiedMessageId === 'html-copied' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </button>
                <button
                  onClick={() => handleHtmlPreview(htmlContent)}
                  className={`p-1 hover:${darkMode ? 'bg-slate-700' : 'bg-slate-200'} rounded text-xs transition-colors`}
                  title="Preview HTML"
                >
                  <Eye className="h-3 w-3" />
                </button>
                <button
                  onClick={() => handleFullScreenHtml(htmlContent)}
                  className={`p-1 hover:${darkMode ? 'bg-slate-700' : 'bg-slate-200'} rounded text-xs transition-colors`}
                  title="Full Screen Preview"
                >
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="p-3 w-full max-h-80 overflow-y-auto">
              <iframe
                className="w-full h-80 block border rounded"
                srcDoc={htmlContent}
                sandbox="allow-scripts allow-same-origin"
                title="HTML Preview"
              />
            </div>
          </div>
        </div>
      );
    }

    return <p className="text-sm leading-relaxed">{message.content}</p>;
  };


  const themeClasses = darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900';
  const cardClasses = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const inputClasses = darkMode ? 'bg-slate-700/50 border-slate-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900';

  // Full Screen HTML Preview
  if (fullScreenHtml && htmlPreview) {
    return (
      <div className="fixed inset-0 z-[70] bg-black">
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
            <span className="text-white text-sm">HTML Preview</span>
            <button
              onClick={() => handleApplyChanges(htmlPreview)}
              disabled={isApplying}
              className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded-md text-white text-sm transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Apply HTML Changes"
            >
              {isApplying ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Applying...
                </>
              ) : (
                <>
                  <Edit className="h-3 w-3" />
                  Apply Changes
                </>
              )}
            </button>
            <div className="flex items-center gap-1">
              <button onClick={() => setPreviewMode('desktop')} className={`p-2 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Desktop View">
                <Monitor className="h-4 w-4 text-white" />
              </button>
              <button onClick={() => setPreviewMode('tablet')} className={`p-2 rounded-md transition-colors ${previewMode === 'tablet' ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Tablet View">
                <Tablet className="h-4 w-4 text-white" />
              </button>
              <button onClick={() => setPreviewMode('mobile')} className={`p-2 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Mobile View">
                <Smartphone className="h-4 w-4 text-white" />
              </button>
            </div>
            <button onClick={() => setFullScreenHtml(false)} className="p-2 hover:bg-white/10 rounded-md transition-colors" title="Exit Full Screen">
              <Shrink className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className={`${previewMode === 'mobile' ? 'w-[375px] h-[667px] border-8 border-gray-800 rounded-3xl' : previewMode === 'tablet' ? 'w-[768px] h-[1024px] border-4 border-gray-800 rounded-xl' : 'w-full h-full'} overflow-hidden shadow-2xl`}>
            <iframe
              srcDoc={htmlPreview}
              className="w-full h-full border-none"
              title="HTML Preview Full Screen"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>
      </div>
    );
  }

  // Original Full Screen Preview
  if (fullScreenPreview) {
    return (
      <div className="fixed inset-0 z-[60] bg-black">
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
            <span className="text-white text-sm">Full Screen Preview</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPreviewMode('desktop')} className={`p-2 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Desktop View">
                <Monitor className="h-4 w-4 text-white" />
              </button>
              <button onClick={() => setPreviewMode('tablet')} className={`p-2 rounded-md transition-colors ${previewMode === 'tablet' ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Tablet View">
                <Tablet className="h-4 w-4 text-white" />
              </button>
              <button onClick={() => setPreviewMode('mobile')} className={`p-2 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Mobile View">
                <Smartphone className="h-4 w-4 text-white" />
              </button>
            </div>
            <button onClick={handleRefreshPreview} className="p-2 hover:bg-white/10 rounded-md transition-colors" title="Refresh Preview">
              <RefreshCw className="h-4 w-4 text-white" />
            </button>
            <button onClick={toggleFullScreenPreview} className="p-2 hover:bg-white/10 rounded-md transition-colors" title="Exit Full Screen">
              <Shrink className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className={`${previewMode === 'mobile' ? 'w-[375px] h-[667px] border-8 border-gray-800 rounded-3xl' : previewMode === 'tablet' ? 'w-[768px] h-[1024px] border-4 border-gray-800 rounded-xl' : 'w-full h-full'} overflow-hidden shadow-2xl`}>
            <iframe
              key={`${website.uuid}-${previewKey}-fullscreen`}
              src={`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${website.uuid}`}
              className="w-full h-full border-none"
              title="Website Full Screen Preview"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 ${themeClasses} backdrop-blur-sm z-50 flex flex-col transition-all duration-300`}>
      <div className={`${cardClasses} border flex flex-col h-full overflow-hidden shadow-2xl transition-all duration-300`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-50/50'}`}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl  flex items-center justify-center">
                <img src={logo} className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
            </div>
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Redesignr Ai Assistant
                <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-yellow-400 text-yellow-900 uppercase">
                  Beta
                </span>
              </h2>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {website?.source || 'Untitled Website'} • {messages.length - 1} interactions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-3 rounded-lg">
              <div className="text-md font-semibold ">
                {user?.aiToken} Ai Tokens
              </div>
            </div>
            <button
              onClick={handleNewChat}
              className={`p-2 hover:${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg transition-colors`}
              title="New Chat"
            >
              <Trash2 className={`h-4 w-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 hover:${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg transition-colors`}
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? <Sun className={`h-4 w-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} /> : <Moon className={`h-4 w-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />}
            </button>
            <button
              onClick={handleRefreshPreview}
              className={`p-2 hover:${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg transition-colors`}
              title="Refresh Preview"
            >
              <RefreshCw className={`h-4 w-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            </button>
            <button
              onClick={handleDownload}
              className={`p-2 hover:${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg transition-colors`}
              title="Download Website"
            >
              <Download className={`h-4 w-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            </button>
            <button
              onClick={handleClearChat}
              className={`p-2 hover:${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg transition-colors`}
              title="Clear Chat"
            >
              <Trash2 className={`h-4 w-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`p-2 hover:${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg transition-colors`}
              title={showPreview ? 'Hide Preview' : 'Show Preview'}
            >
              {showPreview ? <EyeOff className={`h-4 w-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} /> : <Eye className={`h-4 w-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />}
            </button>
            <button
              onClick={onClose}
              className={`p-2 hover:${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg transition-colors`}
              title="Close Chat"
            >
              <X className={`h-4 w-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Chat Panel */}
          <div className={`${showPreview ? (showHistory ? 'w-1/2' : 'w-1/2') : (showHistory ? 'flex-1' : 'w-full')} flex flex-col ${showPreview ? 'border-r' : ''} ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-3  ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${message.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                      : message.isError
                        ? 'bg-red-500'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                      }`}>
                      {message.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                    </div>
                    <div className={`rounded-xl p-4 relative group ${message.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                      : message.isError
                        ? (darkMode ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-red-50 text-red-700 border border-red-200')
                        : (darkMode ? 'bg-slate-700/70 text-slate-200 border border-slate-600/50' : 'bg-slate-50 text-slate-700 border border-slate-200')
                      }`}>
                      {message.role === 'model' && !message.content && isLoading ? (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      ) : (
                        renderMessageContent(message)
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs opacity-70">{formatTime(message.timestamp)}</p>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleCopyMessage(message)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            {copiedMessageId === message.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`p-4 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              {/* 🟢 Toggle: Discussion Mode */}
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                  <span>Discussion Mode</span>
                  <button
                    onClick={() => setDiscussionMode(!discussionMode)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${discussionMode ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${discussionMode ? 'translate-x-5' : 'translate-x-0'
                        }`}
                    />
                  </button>
                </label>
              </div>

              {/* 💬 Message Input Form */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Describe your vision... (e.g., 'Make the hero section more vibrant')"
                  disabled={isLoading}
                  className={`flex-1 ${inputClasses} rounded-xl px-4 py-3 placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 transition-all duration-200`}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className={`px-4 py-3 rounded-xl text-white hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600`}
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </button>
              </form>
            </div>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className={`w-1/2 flex flex-col ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
              <div className={`flex items-center justify-between p-3 border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <h3 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {htmlPreview ? 'HTML Preview' : 'Live Preview'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Live</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {htmlPreview && (
                    <button
                      onClick={() => handleApplyChanges(htmlPreview)}
                      disabled={isApplying}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded-md text-white text-sm transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Apply HTML Changes"
                    >
                      {isApplying ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Applying...
                        </>
                      ) : (
                        <>
                          <Edit className="h-3 w-3" />
                          Apply
                        </>
                      )}
                    </button>
                  )}
                  <button
                    onClick={toggleFullScreenPreview}
                    className={`p-2 hover:${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg transition-colors`}
                    title="Full Screen Preview"
                  >
                    <Expand className={`h-4 w-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                  </button>
                  <div className="flex items-center gap-1 p-1 bg-slate-200 dark:bg-slate-700 rounded-lg">
                    <button
                      onClick={() => setPreviewMode('desktop')}
                      className={`p-2 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-white dark:bg-slate-600 shadow-sm' : 'hover:bg-slate-100 dark:hover:bg-slate-600'}`}
                      title="Desktop View"
                    >
                      <Monitor className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setPreviewMode('tablet')}
                      className={`p-2 rounded-md transition-colors ${previewMode === 'tablet' ? 'bg-white dark:bg-slate-600 shadow-sm' : 'hover:bg-slate-100 dark:hover:bg-slate-600'}`}
                      title="Tablet View"
                    >
                      <Tablet className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setPreviewMode('mobile')}
                      className={`p-2 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-white dark:bg-slate-600 shadow-sm' : 'hover:bg-slate-100 dark:hover:bg-slate-600'}`}
                      title="Mobile View"
                    >
                      <Smartphone className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className={`p-2 hover:${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg transition-colors`}
                    title={isMinimized ? 'Maximize' : 'Minimize'}
                  >
                    {isMinimized ? <Maximize2 className={`h-4 w-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} /> : <Minimize2 className={`h-4 w-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />}
                  </button>
                </div>
              </div>
              <div className="flex-1 relative flex items-center justify-center p-4">
                <div className={`relative rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ${previewMode === 'mobile' ? 'border-8 border-slate-800' : ''}`} style={getPreviewDimensions()}>
                  {htmlPreview ? (
                    <iframe
                      srcDoc={htmlPreview}
                      className="w-full h-full border-none"
                      title="HTML Preview"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                  ) : (
                    <iframe
                      key={`${website.uuid}-${previewKey}`}
                      src={`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${website.uuid}`}
                      className="w-full h-full border-none"
                      title="Website Preview"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignChat;