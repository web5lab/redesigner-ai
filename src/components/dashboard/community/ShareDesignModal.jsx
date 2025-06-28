import React, { useState } from 'react';
import { X, Upload, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const ShareDesignModal = ({ isOpen, onClose, onShare }) => {
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Mock designs for demonstration
  const userDesigns = [
    {
      id: 1,
      title: 'Portfolio Website',
      preview: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      title: 'E-commerce Store',
      preview: 'https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      title: 'SaaS Dashboard',
      preview: 'https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDesign) {
      toast.error('Please select a design to share');
      return;
    }
    
    onShare({
      design: selectedDesign,
      title: title || selectedDesign.title,
      description
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl max-w-lg w-full border border-slate-700 shadow-2xl animate-fadeInScaleUp">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Share Design with Community</h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">
                Select Design
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {userDesigns.map((design) => (
                  <div 
                    key={design.id}
                    onClick={() => setSelectedDesign(design)}
                    className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedDesign?.id === design.id 
                        ? 'border-indigo-500 shadow-lg shadow-indigo-500/20' 
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="aspect-video">
                      <img 
                        src={design.preview} 
                        alt={design.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {selectedDesign?.id === design.id && (
                      <div className="absolute top-2 right-2 bg-indigo-500 rounded-full p-1">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                <div className="relative rounded-lg overflow-hidden cursor-pointer border-2 border-dashed border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center">
                  <div className="aspect-video w-full flex flex-col items-center justify-center text-slate-500 hover:text-slate-400 transition-colors">
                    <Upload className="h-6 w-6 mb-1" />
                    <span className="text-xs">Upload New</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="design-title" className="block text-white font-medium mb-2">
                Title (Optional)
              </label>
              <input
                id="design-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={selectedDesign ? selectedDesign.title : "Enter a title for your design"}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="design-description" className="block text-white font-medium mb-2">
                Description (Optional)
              </label>
              <textarea
                id="design-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell the community about your design..."
                rows={3}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
              >
                Share with Community
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareDesignModal;