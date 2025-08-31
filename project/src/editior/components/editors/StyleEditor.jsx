import React, { useState, useEffect } from 'react';
import { useEditor } from '../../context/EditorContext';
import { updateElementStyle } from '../../utils/domUtils';
import { PaintBucket, Box, Type, Layout, Expand as ArrowsExpand } from 'lucide-react';
import ColorSection from './style/ColorSection'; // Assuming this needs its own theming
import BorderSection from './style/BorderSection'; // Assuming this needs its own theming
import ImageSection from './style/ImageSection'; // Assuming this needs its own theming
import PositionSection from './style/PositionSection'; // Assuming this needs its own theming

const StyleEditor = () => {
  const { selectedElement, html, setHtml, iframeRef, addToHistory } = useEditor();
  const [styles, setStyles] = useState({
    // Colors and Background
    color: '',
    backgroundColor: '',
    opacity: '',
    position: '',
    top: '',
    right: '',
    bottom: '',
    left: '',
    zIndex: '',

    // Typography
    width: '',
    height: '',
    fontSize: '',
    fontWeight: '',
    textAlign: '',
    letterSpacing: '',
    lineHeight: '',
    textTransform: '',

    // Spacing
    padding: '',
    margin: '',

    // Layout
    display: '',
    flexDirection: '',
    justifyContent: '',
    alignItems: '',
    gap: '',

    // Border and Shadow
    borderRadius: '',
    borderWidth: '',
    borderColor: '',
    borderStyle: '',
    boxShadow: '',
    objectFit: '',
    objectPosition: '',
    src: '',
    alt: '',
    transform: '',
    transition: '',
    transformOrigin: '',
    scale: '',
    rotate: '',
    translateX: '',
    translateY: '',
  });

  const transformOriginOptions = [
    'center center',
    'top left',
    'top center',
    'top right',
    'center left',
    'center right',
    'bottom left',
    'bottom center',
    'bottom right'
  ];

  useEffect(() => {
    if (selectedElement && iframeRef.current) {
      const computedStyles = getComputedStyle(selectedElement);

      setStyles({
        color: rgbToHex(computedStyles.color),
        backgroundColor: rgbToHex(computedStyles.backgroundColor),
        position: computedStyles.position,
        top: computedStyles.top,
        right: computedStyles.right,
        bottom: computedStyles.bottom,
        left: computedStyles.left,
        zIndex: computedStyles.zIndex,
        opacity: computedStyles.opacity,
        fontSize: computedStyles.fontSize,
        fontWeight: computedStyles.fontWeight,
        textAlign: computedStyles.textAlign,
        letterSpacing: computedStyles.letterSpacing,
        lineHeight: computedStyles.lineHeight,
        textTransform: computedStyles.textTransform,
        padding: computedStyles.padding,
        margin: computedStyles.margin,
        display: computedStyles.display,
        flexDirection: computedStyles.flexDirection,
        justifyContent: computedStyles.justifyContent,
        alignItems: computedStyles.alignItems,
        gap: computedStyles.gap,
        borderRadius: computedStyles.borderRadius,
        borderWidth: computedStyles.borderWidth,
        borderColor: rgbToHex(computedStyles.borderColor),
        borderStyle: computedStyles.borderStyle,
        boxShadow: computedStyles.boxShadow,
        objectFit: computedStyles.objectFit,
        objectPosition: computedStyles.objectPosition,
        src: selectedElement.tagName.toLowerCase() === 'img' ? (selectedElement).src : '',
        alt: selectedElement.tagName.toLowerCase() === 'img' ? (selectedElement).alt : '',
        width: selectedElement.tagName.toLowerCase() === 'img' ? (selectedElement).width.toString() : '',
        height: selectedElement.tagName.toLowerCase() === 'img' ? (selectedElement).height.toString() : '',
        transform: computedStyles.transform,
        transformOrigin: computedStyles.transformOrigin,
        scale: computedStyles.transform.match(/scale\((.*?)\)/)?.[1] || '',
        rotate: computedStyles.transform.match(/rotate\((.*?)\)/)?.[1] || '',
        translateX: computedStyles.transform.match(/translateX\((.*?)\)/)?.[1] || '',
        translateY: computedStyles.transform.match(/translateY\((.*?)\)/)?.[1] || '',
        transition: computedStyles.transition,
      });
    }
  }, [selectedElement, iframeRef]);

  const handleTransformChange = () => {
    const transforms = [];
    if (styles.scale) transforms.push(`scale(${styles.scale})`);
    if (styles.rotate) transforms.push(`rotate(${styles.rotate})`);
    if (styles.translateX) transforms.push(`translateX(${styles.translateX})`);
    if (styles.translateY) transforms.push(`translateY(${styles.translateY})`);
    
    // Get current styles for transform and apply new ones
    setStyles(prev => {
        const newTransformValue = transforms.length ? transforms.join(' ') : 'none';
        if (selectedElement && iframeRef.current) {
            const newHtml = updateElementStyle(
                selectedElement,
                { ...prev, transform: newTransformValue }, // update only transform temporarily for this call
                iframeRef.current,
                html,
                true // Indicate it's a partial update for transform
            );
            if (newHtml) {
                setHtml(newHtml);
                // Note: addToHistory might be called in handleApplyStyles for final state
            }
        }
        return { ...prev, transform: newTransformValue };
    });
  };


  const handleStyleChange = (property, value) => {
    setStyles(prev => ({
      ...prev,
      [property]: value
    }));

    // Live update for transform-related properties
    if (['scale', 'rotate', 'translateX', 'translateY', 'transformOrigin'].includes(property)) {
        // We need to construct the full transform value
        setStyles(prevStyles => {
            const currentScale = property === 'scale' ? value : prevStyles.scale;
            const currentRotate = property === 'rotate' ? value : prevStyles.rotate;
            const currentTranslateX = property === 'translateX' ? value : prevStyles.translateX;
            const currentTranslateY = property === 'translateY' ? value : prevStyles.translateY;
            const currentTransformOrigin = property === 'transformOrigin' ? value : prevStyles.transformOrigin;

            const transforms = [];
            if (currentScale) transforms.push(`scale(${currentScale})`);
            if (currentRotate) transforms.push(`rotate(${currentRotate})`);
            if (currentTranslateX) transforms.push(`translateX(${currentTranslateX})`);
            if (currentTranslateY) transforms.push(`translateY(${currentTranslateY})`);
            
            const transformValue = transforms.length ? transforms.join(' ') : 'none';

            if (selectedElement && iframeRef.current) {
                const newHtml = updateElementStyle(
                    selectedElement,
                    { transform: transformValue, transformOrigin: currentTransformOrigin },
                    iframeRef.current,
                    html,
                    true // Indicate it's a partial/live update
                );
                if (newHtml) {
                    setHtml(newHtml);
                }
            }
            // Return the updated state for setStyles
            return {
                ...prevStyles,
                [property]: value, // Ensure the changed property is updated
                transform: transformValue // Also update the composite transform property in state
            };
        });
    } else if (selectedElement && iframeRef.current) {
        // For other properties, apply them live as well
        const newHtml = updateElementStyle(
            selectedElement,
            { [property]: value },
            iframeRef.current,
            html,
            true // Indicate it's a partial/live update
        );
        if (newHtml) {
            setHtml(newHtml);
        }
    }
  };

  const handleApplyStyles = () => {
    if (!selectedElement || !iframeRef.current) return;

    // Construct the final style object to apply
    // This ensures transform is correctly constructed from individual parts if they were the last changed
    const transforms = [];
    if (styles.scale) transforms.push(`scale(${styles.scale})`);
    if (styles.rotate) transforms.push(`rotate(${styles.rotate}deg)`); // ensure deg for rotate
    if (styles.translateX) transforms.push(`translateX(${styles.translateX})`);
    if (styles.translateY) transforms.push(`translateY(${styles.translateY})`);
    const finalTransform = transforms.length ? transforms.join(' ') : (styles.transform && styles.transform !== 'none' ? styles.transform : 'none');


    const stylesToApply = { ...styles, transform: finalTransform };
    // Ensure rotate has 'deg' if it's just a number
    if (stylesToApply.rotate && !String(stylesToApply.rotate).endsWith('deg')) {
        stylesToApply.rotate = `${stylesToApply.rotate}deg`;
        // Reconstruct transform if rotate was modified
        const updatedTransforms = [];
        if (stylesToApply.scale) updatedTransforms.push(`scale(${stylesToApply.scale})`);
        if (stylesToApply.rotate) updatedTransforms.push(`rotate(${stylesToApply.rotate})`);
        if (stylesToApply.translateX) updatedTransforms.push(`translateX(${stylesToApply.translateX})`);
        if (stylesToApply.translateY) updatedTransforms.push(`translateY(${stylesToApply.translateY})`);
        stylesToApply.transform = updatedTransforms.length ? updatedTransforms.join(' ') : 'none';
    }


    const newHtml = updateElementStyle(
      selectedElement,
      stylesToApply,
      iframeRef.current,
      html
    );

    if (newHtml) {
      setHtml(newHtml);
      addToHistory(newHtml); // Add to history only on explicit apply
    }
  };

  const rgbToHex = (rgb) => {
    if (!rgb || typeof rgb !== 'string') return '';
    if (rgb.startsWith('#')) return rgb;
    if (rgb === 'transparent' || rgb === 'none' || !rgb.startsWith('rgb')) {
      // Handle transparent, none, or if it's already a named color or other format
      return rgb;
    }

    const matches = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
    if (!matches) return '';

    const r = parseInt(matches[1], 10);
    const g = parseInt(matches[2], 10);
    const b = parseInt(matches[3], 10);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0')}`;
  };


  if (!selectedElement) return null;

  // Common input class string for styling consistency
  const inputBaseClasses = "w-full p-2 bg-slate-700 border border-slate-600 text-slate-200 rounded-md placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm";
  const labelBaseClasses = "block text-xs font-medium text-slate-400 mb-1";
  const sectionTitleClasses = "flex items-center text-sm font-semibold text-slate-200 mb-3";


  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 text-slate-300">
      <div className="space-y-6">
        {/*
          The following sections (Color, Position, Border) are assumed to be components.
          They would need internal theming similar to the "Transform" section below if they contain inputs/labels.
          Example: <ColorSection styles={styles} handleStyleChange={handleStyleChange} inputBaseClasses={inputBaseClasses} labelBaseClasses={labelBaseClasses} sectionTitleClasses={sectionTitleClasses} />
        */}
        {/* <ColorSection styles={styles} handleStyleChange={handleStyleChange} /> */}
        {/* <PositionSection styles={styles} handleStyleChange={handleStyleChange} /> */}
        {/* <BorderSection styles={styles} handleStyleChange={handleStyleChange} /> */}

        {selectedElement?.tagName.toLowerCase() === 'img' && (
          <ImageSection styles={styles} handleStyleChange={handleStyleChange} />
        )}

        {/* Transform Section - Themed Example */}
        <div>
          <h3 className={sectionTitleClasses}>
            <ArrowsExpand className="w-4 h-4 mr-2 text-indigo-400" />
            Transform
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="transformOrigin" className={labelBaseClasses}>Transform Origin</label>
              <select
                id="transformOrigin"
                value={styles.transformOrigin}
                onChange={(e) => handleStyleChange('transformOrigin', e.target.value)}
                className={inputBaseClasses}
              >
                {transformOriginOptions.map(option => (
                  <option key={option} value={option} className="bg-slate-700 text-slate-200">
                    {option.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="scale" className={labelBaseClasses}>Scale</label>
                <input
                  id="scale"
                  type="number"
                  min="0"
                  step="0.01" // finer step for scale
                  value={styles.scale}
                  onChange={(e) => handleStyleChange('scale', e.target.value)}
                  className={inputBaseClasses}
                  placeholder="e.g., 1 or 1.5"
                />
              </div>
              <div>
                <label htmlFor="rotate" className={labelBaseClasses}>Rotate (deg)</label>
                <input
                  id="rotate"
                  type="number"
                  value={styles.rotate ? String(styles.rotate).replace('deg', '') : ''}
                  onChange={(e) => handleStyleChange('rotate', `${e.target.value}`)} // Keep it unitless here, add 'deg' in apply/transform
                  className={inputBaseClasses}
                  placeholder="e.g., 45"
                />
              </div>
              <div>
                <label htmlFor="translateX" className={labelBaseClasses}>Translate X</label>
                <input
                  id="translateX"
                  type="text" // Can be px, %, etc.
                  value={styles.translateX}
                  onChange={(e) => handleStyleChange('translateX', e.target.value)}
                  className={inputBaseClasses}
                  placeholder="e.g., 20px or 5%"
                />
              </div>
              <div>
                <label htmlFor="translateY" className={labelBaseClasses}>Translate Y</label>
                <input
                  id="translateY"
                  type="text" // Can be px, %, etc.
                  value={styles.translateY}
                  onChange={(e) => handleStyleChange('translateY', e.target.value)}
                  className={inputBaseClasses}
                  placeholder="e.g., 20px or 5%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleApplyStyles}
        className="mt-8 w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
      >
        Apply Styles
      </button>
    </div>
  );
};

export default StyleEditor;