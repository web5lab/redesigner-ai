import { Layout } from 'lucide-react';

const PositionSection = ({ styles, handleStyleChange }) => {
  return (
    <div>
      <h3 className="flex items-center text-sm font-medium text-gray-700 mb-3">
        <Layout className="w-4 h-4 mr-2" />
        Position
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Position Type</label>
          <select
            value={styles.position}
            onChange={(e) => handleStyleChange('position', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="static">Static</option>
            <option value="relative">Relative</option>
            <option value="absolute">Absolute</option>
            <option value="fixed">Fixed</option>
            <option value="sticky">Sticky</option>
          </select>
        </div>
        {styles.position !== 'static' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Top</label>
                <input
                  type="text"
                  value={styles.top}
                  onChange={(e) => handleStyleChange('top', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g., 0 or 10px"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Right</label>
                <input
                  type="text"
                  value={styles.right}
                  onChange={(e) => handleStyleChange('right', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g., 0 or 10px"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Bottom</label>
                <input
                  type="text"
                  value={styles.bottom}
                  onChange={(e) => handleStyleChange('bottom', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g., 0 or 10px"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Left</label>
                <input
                  type="text"
                  value={styles.left}
                  onChange={(e) => handleStyleChange('left', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g., 0 or 10px"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Z-Index</label>
              <input
                type="number"
                value={styles.zIndex}
                onChange={(e) => handleStyleChange('zIndex', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., 1, 10, 100"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PositionSection;