import React from 'react';
import { CodeViewer } from './CodeViewer';

const WebsitePreview = ({  data , handleOpenDesignChat,handleFormatSelect ,onClose , setPreviewWebsite }) => {
  console.log(data)
  return (
    <div className="fixed inset-0 bg-slate-950/98 backdrop-blur-lg z-50 flex flex-col">
       <CodeViewer id={data?.uuid} website={data} handleOpenDesignChat={handleOpenDesignChat} setPreviewWebsite={setPreviewWebsite} handleFormatSelect={handleFormatSelect} multiDesign={data.multiDesign} multiDesignlist={data.multiDesignlist}  onClose={onClose} />
    </div>
  );
};

export default WebsitePreview;