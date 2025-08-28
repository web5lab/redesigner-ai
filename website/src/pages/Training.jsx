import { useState } from 'react';
import { TrainingSources } from '../components/TrainingSources';
import { QATraining } from '../components/QATraining';
import { useDispatch } from 'react-redux';
import { scrapPdfData, scrapWebsiteUrl } from '../store/global.Action';
import { FileText, Globe, MessageSquare, Brain, Zap, Target, Upload, Link, Type } from 'lucide-react';

export function Training() {
  const [activeTab, setActiveTab] = useState('pdf');
  const dispatch = useDispatch();

  const [trainingItems, setTrainingItems] = useState({
    pdf: [{ name: 'documentation.pdf', status: 'completed' }],
    websites: [{ name: 'https://example.com', status: 'processing' }],
    text: [],
  });

  const [qaPairs, setQaPairs] = useState([
    { question: 'What is Web3?', answer: 'Web3 refers to the next generation of the internet...' },
  ]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setTrainingItems((prev) => ({
      ...prev,
      pdf: [...prev.pdf, { name: file.name, status: 'processing' }],
    }));

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      dispatch(scrapPdfData({ data: formData }));

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Upload failed');

      setTrainingItems((prev) => ({
        ...prev,
        pdf: prev.pdf.map((item) =>
          item.name === file.name ? { ...item, status: 'completed', data: result } : item
        ),
      }));
    } catch (error) {
      setTrainingItems((prev) => ({
        ...prev,
        pdf: prev.pdf.map((item) =>
          item.name === file.name ? { ...item, status: 'failed' } : item
        ),
      }));
    }
  };

  const handleWebsiteAdd = (e) => {
    e.preventDefault();
    const url = new FormData(e.currentTarget).get('url');
    if (url) {
      dispatch(scrapWebsiteUrl({ url: url.toString() }));
      setTrainingItems((prev) => ({
        ...prev,
        websites: [...prev.websites, { name: url.toString(), status: 'processing' }],
      }));
      e.currentTarget.reset();
    }
  };

  const handleTextAdd = (e) => {
    e.preventDefault();
    const text = new FormData(e.currentTarget).get('text');
    if (text) {
      setTrainingItems((prev) => ({
        ...prev,
        text: [...prev.text, { name: 'Text Document', content: text.toString(), status: 'processing' }],
      }));
      e.currentTarget.reset();
    }
  };

  const handleAddQA = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const question = formData.get('question');
    const answer = formData.get('answer');
    if (question && answer) {
      setQaPairs((prev) => [...prev, { question: question.toString(), answer: answer.toString() }]);
      e.currentTarget.reset();
    }
  };

  const handleEditQA = (index, question, answer) => {
    setQaPairs((prev) =>
      prev.map((pair, i) => (i === index ? { question, answer } : pair))
    );
  };

  const handleDeleteQA = (index) => {
    setQaPairs((prev) => prev.filter((_, i) => i !== index));
  };

  const tabs = [
    { 
      key: 'pdf', 
      label: 'PDF Documents', 
      icon: FileText, 
      gradient: 'from-red-500 to-pink-500',
      description: 'Upload and process PDF documents'
    },
    { 
      key: 'websites', 
      label: 'Websites', 
      icon: Globe, 
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Scrape content from web pages'
    },
    { 
      key: 'text', 
      label: 'Text Sources', 
      icon: Type, 
      gradient: 'from-green-500 to-emerald-500',
      description: 'Add custom text content'
    },
    { 
      key: 'qa', 
      label: 'Q&A Pairs', 
      icon: MessageSquare, 
      gradient: 'from-purple-500 to-indigo-500',
      description: 'Create question-answer pairs'
    },
  ];

  const getTabStats = (key) => {
    switch (key) {
      case 'pdf': return trainingItems.pdf.length;
      case 'websites': return trainingItems.websites.length;
      case 'text': return trainingItems.text.length;
      case 'qa': return qaPairs.length;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Background Pattern - Fixed z-index and positioning */}
      <div className="fixed inset-0 opacity-30 pointer-events-none -z-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto p-6 space-y-8 z-10">
       

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {tabs.map((tab) => (
            <div key={tab.key} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${tab.gradient} shadow-lg`}>
                  <tab.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{getTabStats(tab.key)}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{tab.label}</h3>
              <p className="text-sm text-gray-600">{tab.description}</p>
            </div>
          ))}
        </div>

        {/* Main Training Interface */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="flex items-center justify-between p-6">
              <div className="flex space-x-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`group relative flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-xl ${
                      activeTab === tab.key
                        ? 'bg-white shadow-lg text-gray-900 scale-105'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      activeTab === tab.key 
                        ? `bg-gradient-to-r ${tab.gradient} shadow-md` 
                        : 'bg-gray-100 group-hover:bg-gradient-to-r group-hover:' + tab.gradient
                    }`}>
                      <tab.icon className={`w-4 h-4 transition-colors duration-300 ${
                        activeTab === tab.key ? 'text-white' : 'text-gray-500 group-hover:text-white'
                      }`} />
                    </div>
                    <span>{tab.label}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.key 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {getTabStats(tab.key)}
                    </span>
                  </button>
                ))}
              </div>
              
              <button className="group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <Zap className="w-5 h-5 relative z-10" />
                <span className="font-semibold relative z-10">Start Training</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <div className="transition-all duration-300">
              {activeTab === 'pdf' && (
                <TrainingSources items={trainingItems.pdf} type="pdf" onFileUpload={handleFileUpload} />
              )}

              {activeTab === 'websites' && (
                <TrainingSources items={trainingItems.websites} type="websites" onWebsiteAdd={handleWebsiteAdd} />
              )}

              {activeTab === 'text' && (
                <TrainingSources items={trainingItems.text} type="text" onTextAdd={handleTextAdd} />
              )}

              {activeTab === 'qa' && (
                <QATraining
                  pairs={qaPairs}
                  onAddQA={handleAddQA}
                  onEditQA={handleEditQA}
                  onDeleteQA={handleDeleteQA}
                />
              )}
            </div>
          </div>
        </div>

        {/* Training Tips */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Training Tips</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Upload diverse content to improve AI understanding</li>
                <li>• Use clear, well-structured documents for better results</li>
                <li>• Add Q&A pairs for specific scenarios your bot should handle</li>
                <li>• Regular training updates keep your AI current and accurate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}