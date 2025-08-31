import React from 'react';
import { PaintBucket } from 'lucide-react';

const ColorSection = ({ styles, handleStyleChange }) => {
  return (
    <div>
      <h3 className="flex items-center text-sm font-medium text-gray-700 mb-3">
        <PaintBucket className="w-4 h-4 mr-2" />
        Colors & Opacity
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Text Color</label>
          <div className="flex">
            <input
              type="color"
              value={styles.color}
              onChange={(e) => handleStyleChange('color', e.target.value)}
              className="w-10 h-10 rounded-l border border-gray-300"
            />
            <input
              type="text"
              value={styles.color}
              onChange={(e) => handleStyleChange('color', e.target.value)}
              className="flex-1 p-2 border border-l-0 border-gray-300 rounded-r"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Background</label>
          <div className="flex">
            <input
              type="color"
              value={styles.backgroundColor}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="w-10 h-10 rounded-l border border-gray-300"
            />
            <input
              type="text"
              value={styles.backgroundColor}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="flex-1 p-2 border border-l-0 border-gray-300 rounded-r"
            />
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">Opacity</label>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={styles.opacity}
              onChange={(e) => handleStyleChange('opacity', e.target.value)}
              className="flex-1 mr-2"
            />
            <input
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={styles.opacity}
              onChange={(e) => handleStyleChange('opacity', e.target.value)}
              className="w-20 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSection;