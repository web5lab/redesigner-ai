import React from 'react';
import { CodeViewer } from './CodeViewer';

const WebsitePreview = ({  data , onClose , setPreviewWebsite }) => {
  console.log(data)
  return (
    <div className="fixed inset-0 bg-slate-950/98 backdrop-blur-lg z-50 flex flex-col">
       <CodeViewer id={data?.uuid} setPreviewWebsite={setPreviewWebsite} multiDesign={data.multiDesign} multiDesignlist={data.multiDesignlist}  onClose={onClose} />
    </div>
  );
};

export default WebsitePreview;