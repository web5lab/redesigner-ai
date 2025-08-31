import { ElementType } from '../types/editor';

export const findElementType = (element) => {
  const tagName = element.tagName.toLowerCase();
  
  if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || 
      tagName === 'h4' || tagName === 'h5' || tagName === 'h6' || tagName === 'span') {
    return ElementType.Heading;
  }
  
  if (tagName === 'p') {
    return ElementType.Paragraph;
  }
  
  if (tagName === 'a') {
    return ElementType.Link;
  }
  
  if (tagName === 'img') {
    return ElementType.Image;
  }
  
  if (tagName === 'button' || 
      (element.classList.contains('btn') || 
       element.classList.contains('button'))) {
    return ElementType.Button;
  }
  
  if (tagName === 'div' || tagName === 'section' || tagName === 'article') {
    return ElementType.Container;
  }
  
  if (tagName === 'ul' || tagName === 'ol') {
    return ElementType.List;
  }
  
  if (tagName === 'li') {
    return ElementType.ListItem;
  }
  
  if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
    return ElementType.FormElement;
  }
  
  return ElementType.Other;
};

export const getElementPath = (element, iframe) => {
  const path = [];
  let currentElement = element;
  
  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) return path;
  
  while (currentElement && currentElement !== iframeDoc.body) {
    const tagName = currentElement.tagName.toLowerCase();
    let elementIdentifier = tagName;
    
    // Add id if available
    if (currentElement.id) {
      elementIdentifier += `#${currentElement.id}`;
    } 
    // Otherwise, add classes (max 2)
    else if (currentElement.classList.length > 0) {
      const classes = Array.from(currentElement.classList).slice(0, 2).join('.');
      if (classes) {
        elementIdentifier += `.${classes}`;
      }
    }
    
    path.unshift(elementIdentifier);
    currentElement = currentElement.parentElement;
  }
  
  return path;
};