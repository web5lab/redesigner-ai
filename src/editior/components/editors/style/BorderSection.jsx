import React from 'react';
import { Box } from 'lucide-react';

const borderStyleOptions = ['none', 'solid', 'dashed', 'dotted', 'double'];
const borderRadiusPresets = {
  'none': '0px',
  'sm': '0.125rem',
  'DEFAULT': '0.25rem',
  'md': '0.375rem',
  'lg': '0.5rem',
  'xl': '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  'full': '9999px'
};

const shadowOptions = {
  'none': 'none',
  'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
};

const BorderSection = ({ styles, handleStyleChange }) => {
  return (
    <div>
      <h3 className="flex items-center text-sm font-medium text-gray-700 mb-3">
        <Box className="w-4 h-4 mr-2" />
        Border & Shadow
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Border Radius</label>
          <select
            value={styles.borderRadius}
            onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.entries(borderRadiusPresets).map(([key, value]) => (
              <option key={key} value={value}>
                {key === 'DEFAULT' ? 'Default Radius' : key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Border Width</label>
          <input
            type="text"
            value={styles.borderWidth}
            onChange={(e) => handleStyleChange('borderWidth', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., 1px or 2px"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Border Color</label>
          <div className="flex">
            <input
              type="color"
              value={styles.borderColor}
              onChange={(e) => handleStyleChange('borderColor', e.target.value)}
              className="w-10 h-10 rounded-l border border-gray-300"
            />
            <input
              type="text"
              value={styles.borderColor}
              onChange={(e) => handleStyleChange('borderColor', e.target.value)}
              className="flex-1 p-2 border border-l-0 border-gray-300 rounded-r"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Border Style</label>
          <select
            value={styles.borderStyle}
            onChange={(e) => handleStyleChange('borderStyle', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {borderStyleOptions.map(option => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">Box Shadow</label>
          <select
            value={styles.boxShadow}
            onChange={(e) => handleStyleChange('boxShadow', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.entries(shadowOptions).map(([key, value]) => (
              <option key={key} value={value}>
                {key === 'DEFAULT' ? 'Default Shadow' : key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BorderSection;