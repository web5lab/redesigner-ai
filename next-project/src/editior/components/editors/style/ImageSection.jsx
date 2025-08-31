import React, { useState, useEffect } from 'react';
import { Image, Search, Loader, X } from 'lucide-react';

const DEFAULT_WIDTH = '300';
const DEFAULT_HEIGHT = '200';
// IMPORTANT: Replace with your actual API key and manage it securely (e.g., via environment variables)
const PIXABAY_API_KEY = '22435053-7498cf042dbca3166d7749403'; // e.g., 50294663-e03efa8cbd86d9f5b5dcb5e33

const objectFitOptions = ['fill', 'contain', 'cover', 'none', 'scale-down'];
const objectPositionOptions = [
  'center',
  'top',
  'right',
  'bottom',
  'left',
  'top left',
  'top right',
  'bottom left',
  'bottom right'
];

const ImageSection = ({ styles, handleStyleChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [error, setError] = useState('');

  const searchImages = async () => {
    if (!searchTerm.trim()) return;
    if (PIXABAY_API_KEY === 'YOUR_PIXABAY_API_KEY_HERE') {
        setError('Pixabay API key is not configured.');
        console.warn('Pixabay API key is not configured. Please set it in ImageSection.js');
        return;
    }
    
    setIsSearching(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(searchTerm)}&image_type=photo`
      );
      
      const data = await response.json();
      
      if (data.hits && Array.isArray(data.hits)) {
        setSearchResults(data.hits);
        setShowSearchResults(true);
        if (data.hits.length === 0) {
            setError('No images found for your search term.');
        }
      } else {
        setSearchResults([]);
        setError('No images found or API error.');
      }
    } catch (err) {
      setError('Failed to search images. Check console for details.');
      console.error('Error searching images:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectImage = (imageUrl, imageWidth, imageHeight) => {
    handleStyleChange('src', imageUrl);
    // Optionally set width and height based on selected image, or let user define
    // handleStyleChange('width', imageWidth.toString()); 
    // handleStyleChange('height', imageHeight.toString());
    setShowSearchResults(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchImages();
    }
  };

  return (
    // The parent component (PropertiesPanel) should have a dark background (e.g., bg-slate-800)
    <div className="relative text-slate-300">
      <h3 className="flex items-center text-sm font-medium text-slate-100 mb-3">
        <Image className="w-4 h-4 mr-2 text-slate-400" />
        Image Properties
      </h3>

      {/* Image Search Section */}
      <div className="mb-4 p-3 bg-slate-700/50 rounded-md border border-slate-600/50">
        <div className="text-xs font-medium text-slate-300 mb-2">Search Free Images</div>
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-2 pl-8 bg-slate-600 border border-slate-500 rounded-md text-slate-100 placeholder:text-slate-400 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search Pixabay..."
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
          <button
            onClick={searchImages}
            disabled={isSearching || PIXABAY_API_KEY === 'YOUR_PIXABAY_API_KEY_HERE'}
            className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-slate-500 disabled:text-slate-400 text-sm flex items-center transition-colors"
          >
            {isSearching ? <Loader className="w-4 h-4 animate-spin mr-1" /> : 'Search'}
          </button>
        </div>
        {error && <div className="text-red-400 text-xs mt-2">{error}</div>}
      </div>

      {/* Image Preview */}
      {styles.src && (
        <div className="mb-4 p-3 bg-slate-700/50 rounded-md border border-slate-600/50">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs font-medium text-slate-300">Current Image</div>
            <button
              onClick={() => {
                handleStyleChange('src', '');
                handleStyleChange('alt', ''); // Also clear alt text
              }}
              className="text-slate-400 hover:text-red-400 transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex justify-center items-center bg-slate-600/30 p-2 rounded">
            <img
              src={styles.src}
              alt={styles.alt || 'Preview'}
              style={{
                maxWidth: '100%',
                maxHeight: '150px',
                objectFit: styles.objectFit || 'contain',
                objectPosition: styles.objectPosition || 'center',
              }}
              className="border border-slate-500 rounded"
            />
          </div>
        </div>
      )}

      {/* Search Results Modal */}
      {showSearchResults && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-700">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-700">
              <h4 className="text-lg font-medium text-slate-100">Results for "{searchTerm}"</h4>
              <button
                onClick={() => setShowSearchResults(false)}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700">
              {searchResults.length === 0 ? (
                <div className="text-slate-400 text-center py-8">No images found. Try a different search term.</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {searchResults.map((image) => (
                    <div
                      key={image.id}
                      className="bg-slate-700 border border-slate-600 rounded-md overflow-hidden cursor-pointer hover:border-indigo-500 hover:shadow-lg transition-all duration-200 group"
                      onClick={() => handleSelectImage(image.webformatURL, image.webformatWidth, image.webformatHeight)}
                      title={`Select image: ${image.tags}`}
                    >
                      <img
                        src={image.previewURL}
                        alt={image.tags}
                        className="w-full h-32 object-cover group-hover:opacity-80 transition-opacity"
                      />
                      <div className="p-2 text-xs text-slate-400 truncate">
                        {image.tags || 'Untitled'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-3 text-xs text-slate-500 text-right border-t border-slate-700">
              Images provided by <a href="https://pixabay.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Pixabay</a>
            </div>
          </div>
        </div>
      )}

      {/* Image Properties Form */}
      <div className="space-y-4">
        {/* Uncomment and use if needed
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Object Fit</label>
          <select
            value={styles.objectFit || 'cover'}
            onChange={(e) => handleStyleChange('objectFit', e.target.value)}
            className="w-full p-2 bg-slate-600 border border-slate-500 rounded-md text-slate-100 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {objectFitOptions.map(option => (
              <option key={option} value={option} className="bg-slate-600 text-slate-100">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Object Position</label>
          <select
            value={styles.objectPosition || 'center'}
            onChange={(e) => handleStyleChange('objectPosition', e.target.value)}
            className="w-full p-2 bg-slate-600 border border-slate-500 rounded-md text-slate-100 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {objectPositionOptions.map(option => (
              <option key={option} value={option} className="bg-slate-600 text-slate-100">
                {option.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>
        */}
        <div>
          <label htmlFor="imageUrl" className="block text-xs font-medium text-slate-300 mb-1">Image URL</label>
          <input
            id="imageUrl"
            type="text"
            value={styles.src || ''}
            onChange={(e) => handleStyleChange('src', e.target.value)}
            className="w-full p-2 bg-slate-600 border border-slate-500 rounded-md text-slate-100 placeholder:text-slate-400 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>
         {/* Uncomment and use if needed
        <div>
          <label htmlFor="imageWidth" className="block text-xs font-medium text-slate-300 mb-1">Width (px or %)</label>
          <input
            id="imageWidth"
            type="text"
            value={styles.width || ''} // Use empty string if no default
            onChange={(e) => handleStyleChange('width', e.target.value)}
            className="w-full p-2 bg-slate-600 border border-slate-500 rounded-md text-slate-100 placeholder:text-slate-400 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={DEFAULT_WIDTH}
          />
        </div>
        <div>
          <label htmlFor="imageHeight" className="block text-xs font-medium text-slate-300 mb-1">Height (px or %)</label>
          <input
            id="imageHeight"
            type="text"
            value={styles.height || ''} // Use empty string if no default
            onChange={(e) => handleStyleChange('height', e.target.value)}
            className="w-full p-2 bg-slate-600 border border-slate-500 rounded-md text-slate-100 placeholder:text-slate-400 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={DEFAULT_HEIGHT}
          />
        </div>
        */}
        <div>
          <label htmlFor="altText" className="block text-xs font-medium text-slate-300 mb-1">Alt Text (Accessibility)</label>
          <input
            id="altText"
            type="text"
            value={styles.alt || ''}
            onChange={(e) => handleStyleChange('alt', e.target.value)}
            className="w-full p-2 bg-slate-600 border border-slate-500 rounded-md text-slate-100 placeholder:text-slate-400 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Descriptive text for the image"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageSection;