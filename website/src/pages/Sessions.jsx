import React, { useState, useEffect, useRef } from 'react';
import { ChatSessions } from '../components/ChatSessions';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { getChatSessions } from '../store/global.Action';
import { activeBotSelector, SessionsSelector } from '../store/global.Selctor';
import { MessageSquare, Send, Download, Trash2, Edit3, MoreVertical, Sparkles, Clock, Users, TrendingUp, Zap, Bot, User, Copy, Share2, Archive } from 'lucide-react';

export function Sessions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeBot = useSelector(activeBotSelector);
  const sessions = useSelector(SessionsSelector);
  const [selectedSession, setSelectedSession] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSaveQAModal, setShowSaveQAModal] = useState(false);
  const [currentQA, setCurrentQA] = useState({ question: '', answer: '' });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(getChatSessions({ botId: activeBot._id }));
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      setSelectedSession(sessions[0]);
    }
  }, [sessions]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedSession, editingMessageId]);

  const handleDeleteSession = async (sessionId) => {
    try {
      await api.deleteSession(sessionId);
      setSessions(prev => prev.filter(session => session._id !== sessionId));
      if (selectedSession && selectedSession._id === sessionId) {
        setSelectedSession(sessions.find(s => s._id !== sessionId) || null);
      }
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  const handleSessionSelect = (session) => {
    setSelectedSession(session);
    setEditingMessageId(null);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const updatedSession = {
      ...selectedSession,
      messages: [
        ...(selectedSession.messages || []),
        {
          _id: Date.now().toString(),
          sender: 'user',
          content: newMessage,
          timestamp: new Date(),
          role: 'user'
        }
      ]
    };
    setSelectedSession(updatedSession);
    setNewMessage('');

    setIsTyping(true);
    setTimeout(() => {
      const botResponse = {
        _id: `bot-${Date.now()}`,
        sender: 'bot',
        content: getAutoResponse(newMessage),
        timestamp: new Date(),
        role: 'bot'
      };

      setSelectedSession({
        ...updatedSession,
        messages: [...updatedSession.messages, botResponse]
      });
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const getAutoResponse = (userMessage) => {
    const responses = [
      "I understand your interest in this topic. Let me provide more details...",
      "That's an excellent question. Here's what I know about that...",
      "I've researched this before. The key points are...",
      "Based on my knowledge, I can tell you that...",
      "Interesting perspective! Here's some additional information..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const startEditing = (message) => {
    setEditingMessageId(message._id);
    setEditedContent(message.content);
  };

  const cancelEditing = () => {
    setEditingMessageId(null);
    setEditedContent('');
  };

  const saveEdit = () => {
    if (!editedContent.trim()) return;

    const updatedMessages = selectedSession.messages.map(msg =>
      msg._id === editingMessageId ? { ...msg, content: editedContent } : msg
    );

    setSelectedSession({
      ...selectedSession,
      messages: updatedMessages
    });

    const editedMessage = selectedSession.messages.find(msg => msg._id === editingMessageId);
    if (editedMessage && editedMessage.role === 'bot') {
      const userMessageIndex = updatedMessages.findIndex(
        msg => msg._id === editingMessageId
      ) - 1;

      if (userMessageIndex >= 0) {
        const userMessage = updatedMessages[userMessageIndex];
        setCurrentQA({
          question: userMessage.content,
          answer: editedContent
        });
        setShowSaveQAModal(true);
      }
    }

    setEditingMessageId(null);
    setEditedContent('');
  };

  const saveQAPair = () => {
    console.log('Saving Q&A pair:', currentQA);
    setShowSaveQAModal(false);
  };

  const exportToJSON = () => {
    if (!selectedSession) return;

    const sessionData = {
      sessionId: selectedSession._id,
      sessionName: selectedSession.name,
      botId: activeBot._id,
      botName: activeBot.name,
      messages: selectedSession.messages,
      createdAt: selectedSession.createdAt,
      updatedAt: selectedSession.updatedAt
    };

    const dataStr = JSON.stringify(sessionData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `chat_session_${selectedSession._id}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none -z-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative flex w-full h-screen z-10">
        {/* Enhanced Left Sidebar - Sessions List */}
        <div className="w-96 flex-shrink-0 bg-white/80 backdrop-blur-sm border-r border-white/50 shadow-lg">
         

          {/* Enhanced Sessions List */}
          <div className="flex-1 h-full overflow-hidden">
            <ChatSessions
              sessions={sessions}
              activeSessionId={selectedSession?._id}
              onSessionSelect={handleSessionSelect}
              onSessionDelete={handleDeleteSession}
            />
          </div>
        </div>

        {/* Enhanced Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white/60 backdrop-blur-sm">
          {selectedSession ? (
            <>
              {/* Enhanced Chat Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      {activeBot.name}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{selectedSession.name || 'Conversation'}</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span>{formatTimestamp(selectedSession.updatedAt)}</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span className="text-green-600 font-medium">Online</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="group p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-105"
                    onClick={() => setShowExportModal(true)}
                    title="Export chat"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    className="group p-3 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 hover:scale-105"
                    title="Share chat"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    className="group p-3 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 hover:scale-105"
                    title="Archive chat"
                  >
                    <Archive className="w-5 h-5" />
                  </button>
                  <button
                    className="group p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-105"
                    onClick={() => handleDeleteSession(selectedSession._id)}
                    title="Delete chat"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Enhanced Messages Area */}
              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                {selectedSession.messages && selectedSession.messages.length > 0 ? (
                  <div className="space-y-6 max-w-4xl mx-auto">
                    {selectedSession.messages.map((message, index) => (
                      <div
                        key={message._id || index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
                      >
                        {message.role !== 'user' && (
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0 shadow-lg">
                            <Bot className="w-5 h-5" />
                          </div>
                        )}

                        <div className={`flex flex-col max-w-3xl ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                          {editingMessageId === message._id ? (
                            <div className={`rounded-2xl p-6 shadow-lg border ${
                              message.role === 'user' 
                                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200' 
                                : 'bg-white border-gray-200'
                            }`}>
                              <textarea
                                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                rows={4}
                                style={{ minWidth: '400px' }}
                              />
                              <div className="flex justify-end space-x-3 mt-4">
                                <button
                                  onClick={cancelEditing}
                                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={saveEdit}
                                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md font-medium"
                                >
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              className={`relative rounded-2xl px-6 py-4 shadow-lg transition-all duration-200 hover:shadow-xl ${
                                message.role === 'user'
                                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none'
                                  : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none hover:border-blue-200'
                              }`}
                            >
                              <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                              <div className={`text-xs mt-3 flex items-center gap-2 ${
                                message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                              }`}>
                                <Clock className="w-3 h-3" />
                                <span>{formatTimestamp(message.timestamp)}</span>
                              </div>

                              {/* Enhanced Edit Button */}
                              {message.role === 'bot' && (
                                <button
                                  onClick={() => startEditing(message)}
                                  className="absolute -top-2 -right-2 p-2 bg-white border border-gray-200 text-blue-600 hover:text-white hover:bg-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                                  title="Edit response"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        {message.role === 'user' && (
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold ml-4 flex-shrink-0 shadow-lg">
                            <User className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0 shadow-lg">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-6 py-4 shadow-lg">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                              <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                            </div>
                            <span className="text-sm text-gray-500 italic ml-2">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-blue-500 mb-6 shadow-lg">
                      <MessageSquare className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Start a conversation</h3>
                    <p className="text-gray-600 mb-6 max-w-md">Send a message to begin chatting with {activeBot.name}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Sparkles className="w-4 h-4" />
                      <span>Powered by advanced AI technology</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Message Input */}
              <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm">
                <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
                  <div className="flex items-end gap-4">
                    <div className="flex-1 relative">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        rows={1}
                        className="w-full px-6 py-4 pr-16 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 shadow-sm resize-none bg-white/80 backdrop-blur-sm"
                        style={{ minHeight: '56px', maxHeight: '120px' }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                          }
                        }}
                      />
                      <div className="absolute right-4 bottom-4 flex items-center gap-2">
                        <button
                          type="button"
                          className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
                          title="Attach file"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className={`group relative p-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl ${
                        newMessage.trim()
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white hover:scale-105'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!newMessage.trim() || isTyping}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                      <Send className="w-5 h-5 relative z-10" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span>Press Enter to send, Shift + Enter for new line</span>
                    <span>{newMessage.length}/2000</span>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center bg-gradient-to-br from-white/60 to-blue-50/60">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-blue-500 mb-8 shadow-xl">
                <MessageSquare className="w-16 h-16" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                No conversation selected
              </h3>
              <p className="text-gray-600 mb-8 max-w-md text-lg">Select a chat from the sidebar or create a new one to get started</p>
              <button
                className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                onClick={() => navigate('/preview')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <Sparkles className="w-6 h-6 relative z-10" />
                <span className="font-semibold text-lg relative z-10">Start New Chat</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Export Chat Session</h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-8 leading-relaxed">
              This will export the current chat session as a JSON file that you can download and share.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-6 py-3 text-gray-700 hover:text-gray-900 rounded-xl border border-gray-300 hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  exportToJSON();
                  setShowExportModal(false);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md font-medium"
              >
                Export Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Save Q&A Modal */}
      {showSaveQAModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Save Q&A Pair</h3>
              </div>
              <button
                onClick={() => setShowSaveQAModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Question</label>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 text-sm leading-relaxed">
                  {currentQA.question}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Answer</label>
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  value={currentQA.answer}
                  onChange={(e) => setCurrentQA({ ...currentQA, answer: e.target.value })}
                  rows={6}
                  placeholder="Enter the answer..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowSaveQAModal(false)}
                className="flex-1 px-6 py-3 text-gray-700 hover:text-gray-900 rounded-xl border border-gray-300 hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveQAPair}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all shadow-md font-medium"
              >
                Save to Knowledge Base
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}