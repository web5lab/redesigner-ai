import React, { useState } from 'react';
import { X, Upload, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { websiteSelector } from '../../../store/global.Selctor';

const ShareDesignModal = ({ isOpen, onClose, onShare }) => {
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [description, setDescription] = useState('');
  const websites = useSelector(websiteSelector);

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(websites.length / pageSize);

  const paginatedWebsites = websites.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSubmit = () => {
    if (!selectedDesign) {
      toast.error('Please select a design to share');
      return;
    }
    onShare({
      id: selectedDesign._id,
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

          <div >
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">
                Select Design
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {paginatedWebsites.map((design) => (
                  <div
                    key={design._id}
                    onClick={() => setSelectedDesign(design)}
                    className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${selectedDesign?.id === design.id
                      ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
                      : 'border-slate-700 hover:border-slate-600'
                      }`}
                  >
                    <div className="aspect-video">
                      <img
                        src={`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${design?.uuid}/screenshot-cropped.png`}
                        alt={design.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {selectedDesign?._id === design._id && (
                      <div className="absolute top-2 right-2 bg-indigo-500 rounded-full p-1">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-4 gap-2 text-sm">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-50"
                >
                  Prev
                </button>

                {/* First page */}
                <button
                  onClick={() => goToPage(1)}
                  className={`px-3 py-1 rounded-md ${currentPage === 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                >
                  1
                </button>

                {/* Second page if needed */}
                {totalPages > 1 && currentPage > 3 && (
                  <span className="px-2 text-slate-400">...</span>
                )}

                {/* Nearby pages */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p !== 1 &&
                      p !== totalPages &&
                      Math.abs(p - currentPage) <= 1
                  )
                  .map((p) => (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={`px-3 py-1 rounded-md ${currentPage === p
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                    >
                      {p}
                    </button>
                  ))}

                {/* Last page */}
                {totalPages > 2 && currentPage < totalPages - 2 && (
                  <span className="px-2 text-slate-400">...</span>
                )}
                {totalPages > 1 && (
                  <button
                    onClick={() => goToPage(totalPages)}
                    className={`px-3 py-1 rounded-md ${currentPage === totalPages
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                  >
                    {totalPages}
                  </button>
                )}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-50"
                >
                  Next
                </button>
              </div>

            </div>

            <div className="mb-6">
              <label htmlFor="design-description" className="block text-white font-medium mb-2">
                text Message (Optional)
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
                onClick={() => {
                  handleSubmit()
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
              >
                Share with Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareDesignModal;