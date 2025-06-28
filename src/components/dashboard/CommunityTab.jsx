import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Share2, Filter, Search, User, ThumbsUp, Send, MoreHorizontal, Image as ImageIcon, Smile, Paperclip, Clock, Bookmark, Eye } from 'lucide-react';
import { useSelector } from 'react-redux';
import { UserSelector } from '../../store/global.Selctor';
import toast from 'react-hot-toast';

const CommunityTab = ({ mainContentAnimation, setShowBilling }) => {
  const [activeSection, setActiveSection] = useState('designs');
  const [showCommentInput, setShowCommentInput] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const user = useSelector(UserSelector);

  // Mock data for community designs
  const [communityDesigns, setCommunityDesigns] = useState([
    {
      id: 1,
      title: "Modern SaaS Landing Page",
      author: "Alex Johnson",
      authorAvatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "2025-01-15",
      image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      likes: 42,
      comments: [
        { id: 1, author: "Sarah Chen", authorAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", text: "Love the clean design! How did you achieve that gradient effect?", date: "2025-01-16", likes: 5 },
        { id: 2, author: "Mike Rodriguez", authorAvatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", text: "The typography choices are excellent. What font are you using for headings?", date: "2025-01-16", likes: 3 }
      ],
      tags: ["SaaS", "Landing Page", "Modern"],
      views: 230,
      bookmarked: false
    },
    {
      id: 2,
      title: "E-commerce Product Showcase",
      author: "Emma Thompson",
      authorAvatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "2025-01-14",
      image: "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      likes: 38,
      comments: [
        { id: 1, author: "David Kim", authorAvatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", text: "The product images really pop! Great work on the lighting.", date: "2025-01-15", likes: 7 }
      ],
      tags: ["E-commerce", "Product", "Minimal"],
      views: 185,
      bookmarked: true
    },
    {
      id: 3,
      title: "Portfolio for Photographers",
      author: "James Wilson",
      authorAvatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "2025-01-12",
      image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      likes: 56,
      comments: [
        { id: 1, author: "Lisa Wang", authorAvatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", text: "The gallery layout is perfect for showcasing photography work!", date: "2025-01-13", likes: 4 },
        { id: 2, author: "Tom Wilson", authorAvatar: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", text: "How did you implement the lightbox feature?", date: "2025-01-14", likes: 2 }
      ],
      tags: ["Portfolio", "Photography", "Gallery"],
      views: 310,
      bookmarked: false
    },
    {
      id: 4,
      title: "Tech Blog Redesign",
      author: "Rachel Green",
      authorAvatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "2025-01-10",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      likes: 29,
      comments: [],
      tags: ["Blog", "Tech", "Redesign"],
      views: 142,
      bookmarked: false
    }
  ]);

  // Mock data for community discussions
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "Best practices for responsive design in 2025",
      author: "Alex Johnson",
      authorAvatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "2025-01-15",
      content: "I've been working on optimizing responsive designs for various devices. What techniques are you all using in 2025 to ensure your designs look great on everything from watches to large screens?",
      likes: 24,
      replies: [
        { id: 1, author: "Sarah Chen", authorAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", text: "Container queries have been a game-changer for me. They allow for much more granular control than traditional media queries.", date: "2025-01-16", likes: 8 },
        { id: 2, author: "Mike Rodriguez", authorAvatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", text: "I've been using the fluid typography approach with clamp() for font sizing. It scales beautifully across all devices without breakpoints.", date: "2025-01-16", likes: 5 }
      ],
      tags: ["Responsive", "CSS", "Design"],
      views: 187
    },
    {
      id: 2,
      title: "How are you using AI to improve your design workflow?",
      author: "Emma Thompson",
      authorAvatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "2025-01-14",
      content: "I'm curious how everyone is integrating AI tools into their design process. I've been using redesignr.ai for initial concepts, but I'd love to hear about other AI tools in your workflow!",
      likes: 31,
      replies: [
        { id: 1, author: "David Kim", authorAvatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", text: "I've been using AI for generating custom illustrations and icons. It's saved me so much time!", date: "2025-01-15", likes: 12 }
      ],
      tags: ["AI", "Workflow", "Tools"],
      views: 215
    },
    {
      id: 3,
      title: "Feedback on my portfolio redesign?",
      author: "James Wilson",
      authorAvatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "2025-01-12",
      content: "I just redesigned my portfolio using redesignr.ai and made some custom tweaks. Would love to get some constructive feedback from the community! Here's the link: portfolio.example.com",
      likes: 18,
      replies: [
        { id: 1, author: "Lisa Wang", authorAvatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", text: "The animations are smooth and the project showcases are well organized. I'd suggest improving the contrast on your contact form for better accessibility.", date: "2025-01-13", likes: 6 }
      ],
      tags: ["Portfolio", "Feedback", "Showcase"],
      views: 142
    }
  ]);

  const handleLike = (id, type) => {
    if (type === 'design') {
      setCommunityDesigns(prevDesigns => 
        prevDesigns.map(design => 
          design.id === id ? { ...design, likes: design.likes + 1 } : design
        )
      );
    } else if (type === 'discussion') {
      setDiscussions(prevDiscussions => 
        prevDiscussions.map(discussion => 
          discussion.id === id ? { ...discussion, likes: discussion.likes + 1 } : discussion
        )
      );
    } else if (type === 'comment') {
      setCommunityDesigns(prevDesigns => 
        prevDesigns.map(design => ({
          ...design,
          comments: design.comments.map(comment => 
            comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
          )
        }))
      );
    } else if (type === 'reply') {
      setDiscussions(prevDiscussions => 
        prevDiscussions.map(discussion => ({
          ...discussion,
          replies: discussion.replies.map(reply => 
            reply.id === id ? { ...reply, likes: reply.likes + 1 } : reply
          )
        }))
      );
    }
  };

  const handleBookmark = (id) => {
    setCommunityDesigns(prevDesigns => 
      prevDesigns.map(design => 
        design.id === id ? { ...design, bookmarked: !design.bookmarked } : design
      )
    );
  };

  const handleAddComment = (designId) => {
    if (!commentText.trim()) return;
    
    const currentPlan = user?.currentPlan || 'Free';
    if (currentPlan === 'Free' || currentPlan === 'free') {
      toast.error("Commenting is available on paid plans. Please upgrade to participate in the community.");
      setShowBilling(true);
      return;
    }

    setCommunityDesigns(prevDesigns => 
      prevDesigns.map(design => {
        if (design.id === designId) {
          return {
            ...design,
            comments: [
              ...design.comments,
              {
                id: Date.now(),
                author: user?.name || 'Anonymous User',
                authorAvatar: user?.profilePicture || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                text: commentText,
                date: new Date().toISOString().split('T')[0],
                likes: 0
              }
            ]
          };
        }
        return design;
      })
    );
    
    setCommentText('');
    setShowCommentInput(null);
  };

  const handleAddReply = (discussionId) => {
    if (!commentText.trim()) return;
    
    const currentPlan = user?.currentPlan || 'Free';
    if (currentPlan === 'Free' || currentPlan === 'free') {
      toast.error("Replying is available on paid plans. Please upgrade to participate in the community.");
      setShowBilling(true);
      return;
    }

    setDiscussions(prevDiscussions => 
      prevDiscussions.map(discussion => {
        if (discussion.id === discussionId) {
          return {
            ...discussion,
            replies: [
              ...discussion.replies,
              {
                id: Date.now(),
                author: user?.name || 'Anonymous User',
                authorAvatar: user?.profilePicture || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                text: commentText,
                date: new Date().toISOString().split('T')[0],
                likes: 0
              }
            ]
          };
        }
        return discussion;
      })
    );
    
    setCommentText('');
    setShowCommentInput(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const filteredDesigns = communityDesigns.filter(design => {
    const matchesSearch = design.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         design.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'popular') return matchesSearch && design.likes > 30;
    if (filter === 'recent') return matchesSearch && new Date(design.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    if (filter === 'bookmarked') return matchesSearch && design.bookmarked;
    
    return matchesSearch;
  });

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'popular') return matchesSearch && discussion.likes > 20;
    if (filter === 'recent') return matchesSearch && new Date(discussion.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    return matchesSearch;
  });

  return (
    <div className={`${mainContentAnimation}`} style={{ animationDelay: '0.5s' }}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Community</h2>
          <div className="text-sm text-slate-400">
            Your plan: <span className="text-indigo-400 font-medium">{user?.currentPlan || 'Free'}</span>
          </div>
        </div>
        <p className="text-slate-400 text-sm">
          Connect with other designers, share your work, and get inspired by the community.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700 mb-6">
        <button
          onClick={() => setActiveSection('designs')}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeSection === 'designs'
              ? 'text-indigo-400 border-indigo-400'
              : 'text-slate-400 border-transparent hover:text-slate-300'
          }`}
        >
          Shared Designs
        </button>
        <button
          onClick={() => setActiveSection('discussions')}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeSection === 'discussions'
              ? 'text-indigo-400 border-indigo-400'
              : 'text-slate-400 border-transparent hover:text-slate-300'
          }`}
        >
          Discussions
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <input
            type="text"
            placeholder={`Search ${activeSection === 'designs' ? 'designs' : 'discussions'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10 pr-8 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
          >
            <option value="all">All</option>
            <option value="popular">Popular</option>
            <option value="recent">Recent</option>
            {activeSection === 'designs' && <option value="bookmarked">Bookmarked</option>}
          </select>
        </div>
      </div>

      {/* Content based on active section */}
      {activeSection === 'designs' ? (
        <>
          {filteredDesigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDesigns.map((design) => (
                <div key={design.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
                  <div className="relative">
                    <img
                      src={design.image}
                      alt={design.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => handleBookmark(design.id)}
                        className={`p-2 rounded-full ${
                          design.bookmarked
                            ? 'bg-indigo-500 text-white'
                            : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/70'
                        }`}
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={design.authorAvatar}
                          alt={design.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-white text-sm font-medium">{design.author}</p>
                          <p className="text-slate-400 text-xs">{formatDate(design.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-xs">
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {design.views}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-white font-semibold mb-2">{design.title}</h3>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {design.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-slate-700/50 text-slate-300 px-2 py-0.5 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-700/50 pt-3 mt-3">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLike(design.id, 'design')}
                          className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                          <Heart className="h-4 w-4" />
                          <span className="text-xs">{design.likes}</span>
                        </button>
                        <button
                          onClick={() => setShowCommentInput(showCommentInput === design.id ? null : design.id)}
                          className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-xs">{design.comments.length}</span>
                        </button>
                        <button
                          className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                      <button className="text-slate-400 hover:text-white transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {/* Comments */}
                    {design.comments.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <h4 className="text-sm font-medium text-slate-300">Comments</h4>
                        {design.comments.map((comment) => (
                          <div key={comment.id} className="bg-slate-700/30 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <img
                                  src={comment.authorAvatar}
                                  alt={comment.author}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                <p className="text-white text-xs font-medium">{comment.author}</p>
                              </div>
                              <p className="text-slate-400 text-xs">{formatDate(comment.date)}</p>
                            </div>
                            <p className="text-slate-300 text-sm mb-2">{comment.text}</p>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleLike(comment.id, 'comment')}
                                className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors text-xs"
                              >
                                <ThumbsUp className="h-3 w-3" />
                                <span>{comment.likes}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Comment Input */}
                    {showCommentInput === design.id && (
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src={user?.profilePicture || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                            alt="Your Avatar"
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <p className="text-white text-xs font-medium">{user?.name || 'You'}</p>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-grow bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <button
                            onClick={() => handleAddComment(design.id)}
                            disabled={!commentText.trim()}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <ImageIcon className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No designs found</h3>
              <p className="text-slate-400 max-w-md mx-auto">
                {searchQuery 
                  ? `No designs match your search for "${searchQuery}". Try different keywords or filters.` 
                  : "There are no designs in this category yet. Be the first to share your work!"}
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          {filteredDiscussions.length > 0 ? (
            <div className="space-y-6">
              {filteredDiscussions.map((discussion) => (
                <div key={discussion.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={discussion.authorAvatar}
                        alt={discussion.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-white font-medium">{discussion.author}</p>
                        <p className="text-slate-400 text-xs">{formatDate(discussion.date)}</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-white transition-colors">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-3">{discussion.title}</h3>
                  <p className="text-slate-300 mb-4">{discussion.content}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {discussion.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-slate-700/50 text-slate-300 px-2 py-0.5 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-slate-700/50 pt-4 mt-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(discussion.id, 'discussion')}
                        className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        <span className="text-xs">{discussion.likes}</span>
                      </button>
                      <button
                        onClick={() => setShowCommentInput(showCommentInput === discussion.id ? null : discussion.id)}
                        className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-xs">{discussion.replies.length}</span>
                      </button>
                      <button
                        className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center text-slate-400 text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      {discussion.views} views
                    </div>
                  </div>
                  
                  {/* Replies */}
                  {discussion.replies.length > 0 && (
                    <div className="mt-5 space-y-3">
                      <h4 className="text-sm font-medium text-slate-300">Replies</h4>
                      {discussion.replies.map((reply) => (
                        <div key={reply.id} className="bg-slate-700/30 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <img
                                src={reply.authorAvatar}
                                alt={reply.author}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              <p className="text-white text-xs font-medium">{reply.author}</p>
                            </div>
                            <p className="text-slate-400 text-xs">{formatDate(reply.date)}</p>
                          </div>
                          <p className="text-slate-300 text-sm mb-2">{reply.text}</p>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleLike(reply.id, 'reply')}
                              className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors text-xs"
                            >
                              <ThumbsUp className="h-3 w-3" />
                              <span>{reply.likes}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Reply Input */}
                  {showCommentInput === discussion.id && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={user?.profilePicture || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                          alt="Your Avatar"
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <p className="text-white text-xs font-medium">{user?.name || 'You'}</p>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add a reply..."
                          className="flex-grow bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button
                          onClick={() => handleAddReply(discussion.id)}
                          disabled={!commentText.trim()}
                          className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <MessageSquare className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No discussions found</h3>
              <p className="text-slate-400 max-w-md mx-auto">
                {searchQuery 
                  ? `No discussions match your search for "${searchQuery}". Try different keywords or filters.` 
                  : "There are no discussions in this category yet. Start a new conversation!"}
              </p>
            </div>
          )}
        </>
      )}

      {/* Create New Post Button */}
      <div className="fixed bottom-6 right-6 z-10">
        <button
          onClick={() => {
            const currentPlan = user?.currentPlan || 'Free';
            if (currentPlan === 'Free' || currentPlan === 'free') {
              toast.error("Creating posts is available on paid plans. Please upgrade to participate in the community.");
              setShowBilling(true);
              return;
            }
            
            toast.success("This feature is coming soon!");
          }}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
        >
          {activeSection === 'designs' ? <ImageIcon className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </button>
      </div>

      {/* Plan upgrade prompt for free users */}
      {(!user?.currentPlan || user.currentPlan.toLowerCase() === 'free') && (
        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-700/30 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-2">Unlock Community Features</h3>
          <p className="text-indigo-200 mb-4">
            Upgrade your plan to actively participate in the community. Share your designs, join discussions, and connect with other designers.
          </p>
          <button
            onClick={() => setShowBilling(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all"
          >
            View Plans
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunityTab;