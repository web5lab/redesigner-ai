import React from 'react';
import StyledModal from './StyledModal';

const EditDesignPopup = ({ isOpen, onClose, website, onDesignSelect }) => {
  if (!isOpen || !website) return null;

  return (
    <StyledModal isOpen={isOpen} onClose={onClose} title={`Choose Design: "${website.source || 'your site'}"`} maxWidth="max-w-xl">
      {( website.multiDesignlist.length > 0) ? (
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {website.multiDesignlist.map((design, index) => (
            <div
              key={design.uuid}
              className="p-3 bg-slate-700/50 border-slate-600 hover:border-indigo-400 sm:p-4 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between transition-all duration-200 cursor-pointer hover:shadow-lg"
              onClick={() => website.uuid !== design.uuid && onDesignSelect(design.uuid, website._id)}
            >
              <div className="mb-3 sm:mb-0 sm:mr-4 w-full sm:w-auto">
                <h3 className={`font-semibold text-white`}>
                  Design Variant {index + 1}
                </h3>
                <p className="text-xs text-slate-400 truncate max-w-full" title={design.uuid}>UUID: {design.uuid}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDesignSelect(design.uuid, website._id);
                }}
                className={"px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-md transition-colors whitespace-nowrap w-full sm:w-auto mt-2 sm:mt-0"}
              >
                Select Design
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400 text-center py-8">No alternative designs available for this website currently.</p>
      )}
      <div className="mt-6 sm:mt-8 flex justify-end">
        <button
          onClick={onClose}
          className="px-5 py-2.5 text-sm font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors w-full sm:w-auto"
        >
          Close
        </button>
      </div>
    </StyledModal>
  );
};

export default EditDesignPopup;