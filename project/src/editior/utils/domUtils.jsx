export const updateElementContent = (
  element,
  content,
  iframe,
  currentHtml
)=> {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) return null;
  
  // Update the element's content
  element.textContent = content;
  
  // Return the updated HTML
  return iframeDoc.documentElement.outerHTML;
};

export const updateElementStyle = (
  element,
  styles,
  iframe,
  currentHtml
) => {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) return null;
  
  // Extract image-specific properties
  const imageProps = ['src', 'alt', 'width', 'height'];
  const imageAttributes = {};
  const styleProperties = {};
  
  Object.entries(styles).forEach(([key, value]) => {
    if (imageProps.includes(key)) {
      console.log("key",key , value);
      imageAttributes[key] = value;
      console.log(imageAttributes);
    } else {
      styleProperties[key] = value;
    }
  });
  console.log("Element tag:", element.tagName, "instanceof HTMLImageElement?", element instanceof HTMLImageElement);

  if (element.tagName?.toLowerCase() === 'img') {
    // Handle src attribute
    if (imageAttributes.src) {
      try {
        new URL(imageAttributes.src);
        element.src = imageAttributes.src;
      } catch {
        // const fallbackWidth = parseInt(imageAttributes.width || '300');
        // const fallbackHeight = parseInt(imageAttributes.height || '200');
        element.src = `https://via.placeholder.com/${fallbackWidth}x${fallbackHeight}`;
      }
    }
  
    // Handle alt attribute
    if (imageAttributes.alt !== undefined) {
      element.alt = imageAttributes.alt;
    }
  
    // Handle width and height via CSS
    // ['width', 'height'].forEach(prop => {
    //   if (imageAttributes[prop]) {
    //     const value = imageAttributes[prop].replace('px', '');
    //     const numValue = parseInt(value);
    //     if (!isNaN(numValue)) {
    //       element.style[prop] = `${numValue}px`;
    //     }
    //   }
    // });
  
    // Apply any other inline styles
    // Object.entries(styleProperties).forEach(([prop, value]) => {
    //   if (value) {
    //     try {
    //       element.style[prop] = value;
    //     } catch (error) {
    //       console.warn(`Failed to set style property ${prop}:`, error);
    //     }
    //   }
    // });
  }
  
  
  // Return the updated HTML
  return iframeDoc.documentElement.outerHTML;
};

export const createElement = (
  type,
  parentElement,
  iframe,
  currentHtml,
  attributes
) => {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) return null;
  
  // Create a new element
  const newElement = iframeDoc.createElement(type);
  
  // Set default content based on element type
  switch (type) {
    case 'div':
      newElement.className = 'p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200';
      newElement.textContent = 'New container';
      break;
    case 'p':
      newElement.className = 'text-gray-600 leading-relaxed mb-4';
      newElement.textContent = 'New paragraph text';
      break;
    case 'h1':
      newElement.className = 'text-4xl font-bold text-gray-900 mb-6';
      newElement.textContent = 'New Heading';
      break;
    case 'h2':
      newElement.className = 'text-3xl font-semibold text-gray-900 mb-4';
      newElement.textContent = 'New Heading';
      break;
    case 'h3':
      newElement.className = 'text-2xl font-medium text-gray-900 mb-3';
      newElement.textContent = 'New Heading';
      break;
    case 'h4':
      newElement.className = 'text-xl font-medium text-gray-900 mb-2';
      newElement.textContent = 'New Heading';
      break;
    case 'h5':
      newElement.className = 'text-lg font-medium text-gray-900 mb-2';
      newElement.textContent = 'New Heading';
      break;
    case 'h6':
      newElement.className = 'text-base font-medium text-gray-900 mb-2';
      newElement.textContent = 'New Heading';
      break;
    case 'button':
      newElement.className = 'px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors duration-200';
      newElement.textContent = 'New Button';
      break;
    case 'img':
      const width = attributes?.width || '300';
      const height = attributes?.height || '200';
      const imgSrc = attributes?.src || `https://via.placeholder.com/${width}x${height}`;
      
      // Validate URL
      try {
        new URL(imgSrc);
        newElement.src = imgSrc;
      } catch {
        newElement.src = `https://via.placeholder.com/${width}x${height}`;
      }
      
      newElement.alt = 'Placeholder image';
      newElement.className = 'w-full h-auto object-cover rounded-lg shadow-sm hover:shadow-md transition-all duration-200 filter hover:brightness-105';
      newElement.setAttribute('loading', 'lazy');
      newElement.setAttribute('width', width);
      newElement.setAttribute('height', height);
      break;
    case 'ul':
    case 'ol':
      newElement.className = 'space-y-2 list-disc list-inside text-gray-600 mb-4';
      newElement.innerHTML = '<li class="hover:text-gray-900 transition-colors duration-200">List item 1</li><li class="hover:text-gray-900 transition-colors duration-200">List item 2</li>';
      break;
    case 'input':
      newElement.type = 'text';
      newElement.className = 'w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200';
      newElement.placeholder = 'Enter text...';
      break;
    case 'a':
      newElement.href = '#';
      newElement.textContent = 'New Link';
      newElement.className = 'text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200';
      break;
    default:
      newElement.className = 'p-4 bg-gray-50 rounded border border-gray-200';
      newElement.textContent = 'New Element';
  }
  
  // Append the new element to the parent
  parentElement.appendChild(newElement);
  
  // Return the updated HTML
  return iframeDoc.documentElement.outerHTML;
};

export const replaceElement = (
  oldElement,
  newType,
  iframe,
  currentHtml
) => {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) return null;
  
  // Create the new element
  const newElement = iframeDoc.createElement(newType);
  
  // Copy classes from old element
  newElement.className = oldElement.className;
  
  // Copy common attributes
  const commonAttrs = ['id', 'style', 'title', 'data-*'];
  for (const attr of oldElement.attributes) {
    if (commonAttrs.includes(attr.name) || attr.name.startsWith('data-')) {
      newElement.setAttribute(attr.name, attr.value);
    }
  }
  
  // Handle specific element types
  switch (newType) {
    case 'img':
      const width = oldElement instanceof HTMLImageElement ? oldElement.getAttribute('width') || '300' : '300';
      const height = oldElement instanceof HTMLImageElement ? oldElement.getAttribute('height') || '200' : '200';
      newElement.setAttribute('src', `https://via.placeholder.com/${width}x${height}`);
      newElement.setAttribute('alt', 'Placeholder image');
      newElement.setAttribute('loading', 'lazy');
      if (!newElement.className) {
        newElement.className = 'w-full h-auto object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200';
      }
      
      // Copy image-specific styles if they exist
      const computedStyle = window.getComputedStyle(oldElement);
      ['objectFit', 'objectPosition', 'width', 'height'].forEach(prop => {
        if (computedStyle[prop]) {
          newElement.style[prop] = computedStyle[prop];
        }
      });
      break;
    case 'a':
      newElement.setAttribute('href', '#');
      newElement.textContent = oldElement.textContent || 'New Link';
      break;
    case 'button':
      newElement.textContent = oldElement.textContent || 'New Button';
      if (!newElement.className.includes('px-')) {
        newElement.className += ' px-4 py-2';
      }
      break;
    case 'input':
      newElement.setAttribute('type', 'text');
      newElement.setAttribute('placeholder', 'Enter text...');
      break;
    default:
      newElement.textContent = oldElement.textContent || 'New Element';
  }
  
  // Replace the old element with the new one
  oldElement.parentNode?.replaceChild(newElement, oldElement);
  
  return iframeDoc.documentElement.outerHTML;
};

export const removeElement = (
  element,
  iframe,
  currentHtml
) => {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) return null;
  
  // Make sure we're not removing the body or html elements
  if (element === iframeDoc.body || element === iframeDoc.documentElement) {
    return null;
  }
  
  // Remove the element
  element.parentElement?.removeChild(element);
  
  // Return the updated HTML
  return iframeDoc.documentElement.outerHTML;
};

export const replaceHtmlElement = (
  targetElement,
  iframe,
  newElement
) => {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) return null;

  // Prevent replacing <body> or <html> directly
  if (targetElement === iframeDoc.body || targetElement === iframeDoc.documentElement) {
    return null;
  }

  // Create an element from string if newElement is a string
  let replacementNode;
  if (typeof newElement === 'string') {
    const wrapper = iframeDoc.createElement('div');
    wrapper.innerHTML = newElement.trim();
    replacementNode = wrapper.firstElementChild ;
    if (!replacementNode) return null;
  } else {
    replacementNode = newElement;
  }

  // Replace the target element
  targetElement.replaceWith(replacementNode);

  // Return the updated HTML
  return iframeDoc.documentElement.outerHTML;
};
