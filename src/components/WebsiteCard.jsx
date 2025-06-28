import { Code2Icon, Edit3, Eye, LayoutGrid, Sparkles, Wand2, X, Plus, FileEdit, Share2Icon, CodeIcon, LayoutDashboard } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { UserSelector } from '../store/global.Selctor';

function WebsiteCard({ website, index, handlePreview, handleOpenEditDesignPopup, setSharePopup, openNewWebsiteModal }) {
    const [timeLeft, setTimeLeft] = useState('');
    const mainContentAnimation = "opacity-0 animate-fadeInUp";
    const cn = (...classes) => classes.filter(Boolean).join(' ');
    const user = useSelector(UserSelector)

    useEffect(() => {
        if (website.status !== 'pending') return;

        const interval = setInterval(() => {
            const created = new Date(website.createdAt);
            const now = new Date();
            const end = new Date(created.getTime() + 10 * 60 * 400); // 10 mins from createdAt
            const diff = end - now;

            if (diff <= 0) {
                setTimeLeft('Less than a minute');
                clearInterval(interval);
                return;
            }

            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            setTimeLeft(`${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [website.status, website.createdAt]);

    const getStatusConfig = (status) => {
        switch (status) {
            case 'completed':
                return {
                    badgeClass: 'bg-green-500 text-white border border-green-500/50',
                    icon: <Sparkles className="w-3 h-3" />,
                    text: 'Completed'
                };
            case 'pending':
                return {
                    badgeClass: 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/50 animate-pulse',
                    icon: <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping scale-75"></div>,
                    text: 'In Progress'
                };
            case 'editing':
                return {
                    badgeClass: 'bg-blue-500/30 text-blue-300 border border-blue-500/50',
                    icon: <FileEdit className="w-3 h-3" />,
                    text: 'Editing'
                };
            case 'addingPage':
                return {
                    badgeClass: 'bg-purple-500/30 text-purple-300 border border-purple-500/50',
                    icon: <Plus className="w-3 h-3" />,
                    text: 'Adding Page'
                };
            case 'error':
            default:
                return {
                    badgeClass: 'bg-red-500/30 text-red-300 border border-red-500/50',
                    icon: <X className="w-3 h-3" />,
                    text: 'Error'
                };
        }
    };

    const handleFormatSelect = async () => {
        const currentPlan = user?.currentPlan || 'Free';
        if (currentPlan === 'Free' || currentPlan === 'free') {
            setTimeout(() => {
                toast.success("Oops! This feature is part of our premium plan. Upgrade to unlock it!", {
                    duration: 5000,
                    position: 'top-center',
                    style: {
                        background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
                        color: '#fff',
                        padding: '16px',
                        borderRadius: '10px',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2), 0 20px 40px -20px rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    },
                    icon: <Sparkles className="text-yellow-300" />,
                });
            }, 300);
            return;
        }

        // const htmlUrl = designs[currentDesign] // Not used directly here

        try {
            const designToDownload = website?.uuid;
            if (!designToDownload) {
                toast.error("No design selected to download.");
                return;
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/download-page/${designToDownload}/zip`);
            if (!response.ok) {
                throw new Error('Zip download failed');
            }

            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `website.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
            toast.success("Download started!");
        } catch (error) {
            console.error('Error downloading HTML:', error);
            toast.error("Failed to download HTML file.");
        }

    };

    const handleCardClick = () => {
        if (website.status === 'completed') {
            handlePreview(website);
        } else if (website.status === 'pending') {
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-slate-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-slate-700`}>
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <div className="w-10 h-10 rounded-full border-2 border-t-yellow-400 border-yellow-400/30 animate-spin"></div>
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-yellow-300">Still Brewing...</p>
                                <p className="mt-1 text-sm text-slate-400">Your website redesign is currently in progress. Please check back shortly.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-slate-700">
                        <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-400 hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Dismiss
                        </button>
                    </div>
                </div>
            ), { duration: 5000 });
        } else if (website.status === 'editing') {
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-slate-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-slate-700`}>
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <FileEdit className="w-10 h-10 text-blue-400" />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-blue-300">Currently Editing</p>
                                <p className="mt-1 text-sm text-slate-400">This website is being edited. Changes will be available soon.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-slate-700">
                        <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-400 hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Dismiss
                        </button>
                    </div>
                </div>
            ), { duration: 5000 });
        } else if (website.status === 'addingPage') {
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-slate-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-slate-700`}>
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <Plus className="w-10 h-10 text-purple-400" />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-purple-300">Adding New Page</p>
                                <p className="mt-1 text-sm text-slate-400">A new page is being added to this website. Please wait while we process your request.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-slate-700">
                        <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-400 hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Dismiss
                        </button>
                    </div>
                </div>
            ), { duration: 5000 });
        }
    };

    const statusConfig = getStatusConfig(website.status);

    return (
        <div
            key={website._id || website.uuid}
            className={`group relative rounded-xl border border-slate-700/80 bg-slate-800/60 backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:border-indigo-500/70 ${mainContentAnimation}`}
            style={{ animationDelay: `${0.4 + index * 0.1}s` }}
        >
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                <span className={cn("px-2.5 py-1 text-xs rounded-full font-semibold shadow-md flex items-center gap-1.5", statusConfig.badgeClass)}>
                    {statusConfig.icon}
                    <span className="hidden sm:inline">{statusConfig.text}</span>
                </span>
            </div>

            {website.type && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-blue-500/80 text-blue-100 text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md flex items-center gap-1">
                    <LayoutGrid className="w-3 h-3" /> <span className="hidden sm:inline">{website.type}</span>
                </div>
            )}

            <div className="aspect-[16/10] relative cursor-pointer overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800/70 group" onClick={handleCardClick}>
                {website.status != 'completed' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-10 transition-opacity duration-300">
                        <Wand2 className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-500/50" />
                    </div>
                )}

                {website.status === 'completed' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70   transition-opacity duration-300">
                        <img src={`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${website?.uuid}/screenshot-cropped.png`} alt="" srcset="" />
                    </div>
                )}

                {website.status === 'pending' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-sm p-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 border-t-yellow-400 border-yellow-400/30 animate-spin mb-2 sm:mb-3"></div>
                        <p className="text-xs sm:text-sm font-medium text-yellow-300">Generating Preview...</p>
                        <p className="text-[10px] sm:text-xs text-slate-300 mt-1">Time left: {timeLeft}</p>
                    </div>
                )}

                {website.status === 'editing' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900/30 backdrop-blur-sm p-2">
                        <div className="bg-blue-500/30 p-2 sm:p-3 rounded-full mb-2 border border-blue-500/50">
                            <FileEdit className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300 animate-pulse" />
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-blue-300 text-center">Currently Editing</p>
                        <p className="text-[10px] sm:text-xs text-slate-300 mt-1 text-center">Making changes...</p>
                    </div>
                )}

                {website.status === 'addingPage' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-purple-900/30 backdrop-blur-sm p-2">
                        <div className="bg-purple-500/30 p-2 sm:p-3 rounded-full mb-2 border border-purple-500/50">
                            <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-purple-300 animate-bounce" />
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-purple-300 text-center">Adding New Page</p>
                        <p className="text-[10px] sm:text-xs text-slate-300 mt-1 text-center">Processing request...</p>
                    </div>
                )}

                {website.status === 'error' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/30 backdrop-blur-sm p-2">
                        <div className="bg-red-500/30 p-2 sm:p-3 rounded-full mb-2 border border-red-500/50">
                            <X className="w-6 h-6 sm:w-8 sm:h-8 text-red-300" />
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-red-300 text-center">Preview Generation Failed</p>
                    </div>
                )}
            </div>

            <div className="p-4 sm:p-5">
                <h3 className="text-white font-semibold truncate text-base sm:text-lg mb-1" title={website.source || 'Untitled Website'}>
                    {website.source || website?.instruction}
                </h3>
                <p className="text-slate-400 text-xs mb-3 sm:mb-4">
                    Updated: {new Date(website.updatedAt).toLocaleDateString()}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-2 sm:mb-2.5">
                    {website.status === 'completed' && (
                        <>
                            <button
                                onClick={handleFormatSelect}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-1 sm:gap-1.5 px-2 py-2 sm:px-3 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                            >
                                <CodeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Export Code
                            </button>
                            {/* <button
                                onClick={() => handleOpenEditDesignPopup(website)}
                                target="_blank"
                                rel="noopener noreferrer"
                                disabled
                                className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-2 sm:px-3 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                            >
                                <Code2Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Deploy {'(Coming Soon)'}
                            </button> */}
                            <button
                                onClick={() => handlePreview(website)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-2 sm:px-3 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                            >
                                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Preview
                            </button>
                            <button
                                onClick={() => {
                                    openNewWebsiteModal(website);
                                }}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-2 sm:px-3 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                            >
                                <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add Page
                            </button>
                            <button
                                onClick={() => setSharePopup({ isOpen: true, website })}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-2 sm:px-3 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                            >
                                <Share2Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Share
                            </button>
                        </>
                    )}

                    {(website.status === 'editing' || website.status === 'addingPage') && (
                        <div className="col-span-2 flex items-center justify-center py-2 text-xs text-slate-400">
                            Actions unavailable during {website.status === 'editing' ? 'editing' : 'page addition'}
                        </div>
                    )}
                    {(website.status === 'pending' || website.status === 'error') && (
                        <div className="col-span-2 flex items-center justify-center py-2 text-xs text-slate-400">
                            {website.status === 'pending' ? 'Please wait for completion' : 'Actions unavailable due to error'}
                        </div>
                    )}
                </div>
                {/* <button
                    onClick={handleFormatSelect}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-1 sm:gap-1.5 px-2 py-2 sm:px-3 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                    <CodeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Export Code
                </button> */}
            </div>
        </div>
    );
}

export default WebsiteCard;