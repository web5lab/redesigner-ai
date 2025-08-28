import React, { useState } from 'react';
import { X } from 'lucide-react';
import { sendMessageApi } from '../../../store/global.Action';
import toast from 'react-hot-toast';

const ShareSingleDesign = ({ website, isOpen, onClose }) => {
    const [description, setDescription] = useState('');
    const handleSubmit = async () => {
        await sendMessageApi({
            data: {
                content: description,
                website: website._id
            }
        })

        toast.success('Design shared with the community!');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl max-w-lg w-full border border-slate-700 shadow-2xl animate-fadeInScaleUp">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Share Design with Community</h3>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div >
                        <div className="mb-6">
                          
                            <div
                                key={website._id}
                                className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all`}
                            >
                                <div className="aspect-video">
                                    <img
                                        src={`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${website?.uuid}/screenshot-cropped.png`}
                                        alt={website.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                            </div>

                        </div>

                        <div className="mb-6">
                            <label htmlFor="design-description" className="block text-white font-medium mb-2">
                                text Message (Optional)
                            </label>
                            <textarea
                                id="design-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Tell the community about your design..."
                                rows={3}
                                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleSubmit()
                                }}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                            >
                                Share with Community
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareSingleDesign;