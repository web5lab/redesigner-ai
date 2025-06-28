import React, { useEffect, useRef } from 'react';
import { useEditor } from '../context/EditorContext'; // Assuming this path is correct
import { findElementType } from '../utils/elementUtils'; // Assuming this path is correct
import { Smartphone, Tablet, Monitor } from 'lucide-react';

const viewportSizes = {
  mobile: { width: '375px', height: '667px' },
  tablet: { width: '768px', height: '1024px' },
  desktop: { width: '100%', height: '100%' }
};

const Preview = ({viewport}) => {
  const {
    html,
    // setHtml, // setHtml is not used in this component, can be removed if not needed elsewhere
    setSelectedElement,
    setSelectedElementType,
    iframeRef
  } = useEditor();

  const handleIframeLoad = () => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    if (!iframeDoc) return;

    // Ensure the iframe body has a background if the content doesn't specify one
    // This helps in case the content itself is transparent or lacks a body background
    if (iframeDoc.body && !iframeDoc.body.style.backgroundColor) {
        iframeDoc.body.style.backgroundColor = '#FFFFFF'; // Default content background, can be themed
    }


    // Add click event listeners to all elements in the iframe
    iframeDoc.body.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent event from bubbling up further if necessary

      // Clear any existing highlights
      const allElements = iframeDoc.querySelectorAll('*');
      allElements.forEach(el => {
        // Ensure classList exists before trying to use it
        if (el.classList) {
          el.classList.remove('sb-element-selected');
        }
      });

      if (e.target === iframeDoc.body || e.target === iframeDoc.documentElement) {
        setSelectedElement(null);
        setSelectedElementType(null);
        return;
      }

      const target = e.target;
      if (target && target.classList) {
        target.classList.add('sb-element-selected');
      }

      setSelectedElement(target);
      setSelectedElementType(findElementType(target));
    }, true);

    // Add custom styles to the iframe
    const style = iframeDoc.createElement('style');
    style.textContent = `
      .sb-element-selected {
        outline: 2px solid #4F46E5 !important; /* Indigo-600 for selected */
        outline-offset: 2px !important;
        box-shadow: 0 0 0 2px #4F46E5; /* Optional: adds more visual weight */
      }

      * {
        cursor: pointer !important;
      }

      *:hover {
        outline: 1px dashed #6366F1 !important; /* Indigo-500 for hover */
        outline-offset: 1px !important;
      }

      /* Ensure body takes up full height for selection to work properly */
      /* and for visual consistency if the content is short */
      body {
        min-height: 100vh;
        margin: 0; /* Reset default margin */
      }
      html {
        height: 100%;
      }
    `;
    iframeDoc.head.appendChild(style);
  };

  // Re-trigger iframe load logic if HTML content changes
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow && html !== undefined) {
      // A common way to reload iframe content preserving scroll & state is complex.
      // For simplicity, if srcDoc changes, onLoad should re-trigger.
      // However, directly manipulating contentDocument after initial load might be more reliable for updates.
      // For now, we rely on onLoad being called when srcDoc changes or the iframe is first loaded.
      // If direct manipulation is needed:
      // const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      // if (iframeDoc) {
      //   iframeDoc.open();
      //   iframeDoc.write(html);
      //   iframeDoc.close();
      //   handleIframeLoad(); // Re-apply event listeners and styles
      // }
    }
  }, [html]);


  return (
    // The parent div of Preview already has bg-slate-700 from EditorLayout
    <div className="h-full w-full relative flex flex-col items-center justify-center p-4">
     

      {/* Iframe container */}
      <div
        className={`mx-auto transition-all duration-300 ease-in-out bg-white overflow-hidden
                    ${viewport !== 'desktop' ? 'border-2 border-slate-600 shadow-2xl rounded-lg' : 'border-0 rounded-none'}
                    ${viewport === 'mobile' ? 'max-w-[375px] max-h-[667px]' : ''}
                    ${viewport === 'tablet' ? 'max-w-[768px] max-h-[1024px]' : ''}
                    ${viewport === 'desktop' ? 'w-full h-full' : 'aspect-[var(--aspect-ratio)]'}`}
        style={{
          width: viewportSizes[viewport].width,
          height: viewportSizes[viewport].height,
          // @ts-ignore
          '--aspect-ratio': viewport === 'mobile' ? '375 / 667' : (viewport === 'tablet' ? '768 / 1024' : '16 / 9'),
        }}
      >
        <iframe
          ref={iframeRef}
          srcDoc={html} // Use srcDoc to inject HTML content
          title="HTML Preview"
          className="w-full h-full border-0" // Iframe itself should not have a border
          onLoad={handleIframeLoad}
          sandbox="allow-scripts allow-same-origin" // Adjust sandbox as needed for security vs functionality
        />
      </div>
    </div>
  );
};

export default Preview;