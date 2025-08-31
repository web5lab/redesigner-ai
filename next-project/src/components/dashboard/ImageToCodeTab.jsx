import React, { useState } from 'react';
import { Upload, Image, Wand2, Sparkles, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ImageToCodeTab = ({ user, onImageToCode, mainContentAnimation, setShowBilling }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [customInstructions, setCustomInstructions] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('Image size must be less than 10MB');
        return;
      }
      setSelectedImage(file);
    } else {
      toast.error('Please upload a valid image file');
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    const currentPlan = user?.currentPlan || 'Free';
    if (currentPlan === 'Free' || currentPlan === 'free') {
      setTimeout(() => {
        toast.success("This feature is only available in paid plans.", {
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

    if (!selectedImage) {
      toast.error('Please upload an image first');
      return;
    }

    onImageToCode({
      mode: 'image-to-code',
      selectedImage: selectedImage,
      customInstructions: customInstructions.trim()
    });
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className={`${mainContentAnimation}`} style={{ animationDelay: '0.5s' }}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Image to Code</h2>
          <div className="text-sm text-slate-400">
            Your plan: <span className="text-indigo-400 font-medium">{user?.currentPlan || 'Free'}</span>
          </div>
        </div>
        <p className="text-slate-400 text-sm">
          Upload any design image, screenshot, or mockup and our AI will convert it into clean, responsive code.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Image Upload Area */}
        <div className="space-y-4">
          <label className="block text-white font-medium">
            Upload Design Image
          </label>
          
          {!selectedImage ? (
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-indigo-500 bg-indigo-500/10' 
                  : 'border-slate-600 bg-slate-800/30 hover:border-slate-500 hover:bg-slate-800/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="p-4 bg-indigo-500/20 rounded-full mb-4">
                    <Upload className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Drop your image here or click to browse
                  </h3>
                  <p className="text-slate-400 mb-4">
                    Supports JPG, PNG, WEBP up to 10MB
                  </p>
                  <div className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Choose File
                  </div>
                </div>
              </label>
            </div>
          ) : (
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-white font-medium">Selected Image</h4>
                <button
                  onClick={removeImage}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                  title="Remove image"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-slate-700 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">{selectedImage.name}</p>
                  <p className="text-slate-400 text-sm">
                    {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Custom Instructions */}
        <div className="space-y-2">
          <label htmlFor="imageInstructions" className="block text-white font-medium">
            Additional Instructions (Optional)
          </label>
          <textarea
            id="imageInstructions"
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            rows={4}
            placeholder="Any specific requirements or modifications you'd like (e.g., 'Make it responsive', 'Add hover effects', 'Use different colors')"
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Features Info */}
        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-700/30 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Wand2 className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-medium mb-2">AI Image to Code Features</h3>
              <ul className="text-purple-200 text-sm space-y-1">
                <li>• Converts any design image into clean HTML/CSS code</li>
                <li>• Automatically generates responsive layouts</li>
                <li>• Preserves design elements and styling</li>
                <li>• Works with screenshots, mockups, and hand-drawn sketches</li>
                <li>• Exports as React components or vanilla HTML</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleSubmit}
            disabled={!selectedImage}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
              selectedImage 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg transform hover:scale-105'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Image className="h-5 w-5" />
            Convert to Code
          </button>
        </div>

        {/* Plan upgrade prompt for free users */}
        {(!user?.currentPlan || user.currentPlan.toLowerCase() === 'free') && (
          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-700/30 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-2">Unlock Image to Code</h3>
            <p className="text-indigo-200 mb-4">
              Upgrade your plan to convert any design image into clean, responsive code with AI.
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
    </div>
  );
};

export default ImageToCodeTab;