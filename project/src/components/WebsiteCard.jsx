import { Code2Icon, Edit3, Eye, LayoutGrid, Sparkles, Wand2, X, Plus, FileEdit, Share2Icon, CodeIcon, LayoutDashboard, Globe, MessageSquare, ChevronDown, ChevronUp, Clock, AlertTriangle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { UserSelector } from '../store/global.Selctor';
import ShareSingleDesign from './dashboard/community/ShareSingleDesign';
import { setEditiorPage } from '../store/global.Slice';

function WebsiteCard({ website, setShowBilling, handleFormatSelect, index, handlePreview, handleOpenEditDesignPopup, handleOpenConvertToWebAppModal, setSharePopup, openNewWebsiteModal, onOpenDesignChat }) {
    const [timeLeft, setTimeLeft] = useState('');
    const [deletionTimeLeft, setDeletionTimeLeft] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [showShareDesign, setShowShareDesign] = useState(false);
    const mainContentAnimation = "opacity-0 animate-fadeInUp";
    const cn = (...classes) => classes.filter(Boolean).join(' ');
    const user = useSelector(UserSelector);

    // Check deletion status for free users
    useEffect(() => {
        if (user?.currentPlan?.toLowerCase() !== 'freeeeeeeee') return;

        const checkDeletionStatus = () => {
            const created = new Date(website.createdAt);
            const now = new Date();
            const sixHoursInMs = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
            const deletionTime = new Date(created.getTime() + sixHoursInMs);
            const timeDiff = deletionTime - now;

            if (timeDiff <= 0) {
                // Website should be deleted
                setIsDeleted(true);
                setDeletionTimeLeft('');
            } else {
                // Website will be deleted in the future
                setIsDeleted(false);
                const hours = Math.floor(timeDiff / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                if (hours > 0) {
                    setDeletionTimeLeft(`${hours}h ${minutes}m`);
                } else if (minutes > 0) {
                    setDeletionTimeLeft(`${minutes}m ${seconds}s`);
                } else {
                    setDeletionTimeLeft(`${seconds}s`);
                }
            }
        };

        checkDeletionStatus();
        const interval = setInterval(checkDeletionStatus, 1000);

        return () => clearInterval(interval);
    }, [user?.currentPlan, website.createdAt]);

    useEffect(() => {
        if (website.status !== 'pending') return;

        const interval = setInterval(() => {
            const created = new Date(website.createdAt);
            const now = new Date();
            const end = new Date(created.getTime() + 4 * 60 * 1000); // 4 mins from createdAt
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

    function detectAndroidAndCall(website) {
        const isAndroid = /Android/i.test(navigator.userAgent);
        if (isAndroid) {
            handlePreview(website);
        } else {
            onOpenDesignChat(website);
        }
      }

    const getStatusConfig = (status) => {
        switch (status) {
            case 'completed':
                return {
                    badgeClass: 'bg-green-500/90 text-white border border-green-500/50 backdrop-blur-sm',
                    icon: <Sparkles className="w-3 h-3" />,
                    text: 'Ready',
                    description: 'Website is ready to use'
                };
            case 'pending':
                return {
                    badgeClass: 'bg-yellow-500/90 text-white border border-yellow-500/50 animate-pulse backdrop-blur-sm',
                    icon: <div className="w-2 h-2 bg-white rounded-full animate-ping scale-75"></div>,
                    text: 'Building',
                    description: 'Creating your website'
                };
            case 'editing':
                return {
                    badgeClass: 'bg-blue-500/90 text-white border border-blue-500/50 backdrop-blur-sm',
                    icon: <FileEdit className="w-3 h-3" />,
                    text: 'Editing',
                    description: 'Making changes to your website'
                };
            case 'addingPage':
                return {
                    badgeClass: 'bg-purple-500/90 text-white border border-purple-500/50 backdrop-blur-sm',
                    icon: <Plus className="w-3 h-3" />,
                    text: 'Adding Page',
                    description: 'Adding a new page to your website'
                };
            case 'error':
            default:
                return {
                    badgeClass: 'bg-red-500/90 text-white border border-red-500/50 backdrop-blur-sm',
                    icon: <X className="w-3 h-3" />,
                    text: 'Error',
                    description: 'Something went wrong'
                };
        }
    };

    const handleCardClick = () => {
        // If website is deleted for free users, show upgrade message
        if (isDeleted && user?.currentPlan?.toLowerCase() === 'freeeeee') {
            setShowBilling(true);
            return;
        }

        if (website.status === 'completed') {
            detectAndroidAndCall(website);
        } else if (website.status === 'pending') {
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-slate-800/95 backdrop-blur-sm shadow-xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-slate-700/50`}>
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <div className="w-10 h-10 rounded-full border-2 border-t-yellow-400 border-yellow-400/30 animate-spin"></div>
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-yellow-300">Still Building...</p>
                                <p className="mt-1 text-sm text-slate-300">Your website is being created. Estimated time: {timeLeft}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-slate-700/50">
                        <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-slate-400 hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            ), { duration: 5000 });
        } else if (website.status === 'editing') {
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-slate-800/95 backdrop-blur-sm shadow-xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-slate-700/50`}>
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <FileEdit className="w-10 h-10 text-blue-400" />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-blue-300">Currently Editing</p>
                                <p className="mt-1 text-sm text-slate-300">Changes are being applied to your website.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-slate-700/50">
                        <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-slate-400 hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            ), { duration: 5000 });
        } else if (website.status === 'addingPage') {
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-slate-800/95 backdrop-blur-sm shadow-xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-slate-700/50`}>
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <Plus className="w-10 h-10 text-purple-400" />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-purple-300">Adding New Page</p>
                                <p className="mt-1 text-sm text-slate-300">A new page is being added to your website.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-slate-700/50">
                        <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-slate-400 hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            ), { duration: 5000 });
        }
    };

    const handleUpgradeClick = () => {
        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gradient-to-r from-indigo-600 to-purple-600 backdrop-blur-sm shadow-xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-indigo-500/50`}>
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <Sparkles className="w-10 h-10 text-yellow-300" />
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-white">Upgrade to Paid Plans</p>
                            <p className="mt-1 text-sm text-indigo-100">
                                Upgrade your plan to remove deletion limits and recover previously deleted websites anytime.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-indigo-500/50">
                    <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        ), { duration: 6000 });
        setShowBilling(true);
    };

    const statusConfig = getStatusConfig(website.status);
    const isCompleted = website.status === 'completed';
    const isProcessing = ['pending', 'editing', 'addingPage'].includes(website.status);
    const isFreeUser = user?.currentPlan?.toLowerCase() === 'freeeeeee';

    return (
        <>
            <ShareSingleDesign website={website} onClose={() => {
                setShowShareDesign(false);
            }} isOpen={showShareDesign} />
            <div
                key={website._id || website.uuid}
                className={`group relative rounded-xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 hover:border-indigo-500/50 hover:bg-slate-800/60 ${mainContentAnimation} ${isDeleted && isFreeUser ? 'opacity-60' : ''}`}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Deletion Warning Banner for Free Users */}
                {isFreeUser && !isDeleted && deletionTimeLeft && (
                    <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium px-3 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>Deletes in {deletionTimeLeft}</span>
                        </div>
                        <button
                            onClick={handleUpgradeClick}
                            className="text-white/90 hover:text-white underline text-xs font-medium"
                        >
                            Upgrade
                        </button>
                    </div>
                )}

                {/* Deleted State Banner for Free Users */}
                {isFreeUser && isDeleted && (
                    <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-medium px-3 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Website Deleted</span>
                        </div>
                        <button
                            onClick={handleUpgradeClick}
                            className="text-white/90 hover:text-white underline text-xs font-medium"
                        >
                            Recover
                        </button>
                    </div>
                )}

                {/* Status Badge */}
                <div className={`absolute ${(isFreeUser && (deletionTimeLeft || isDeleted)) ? 'top-10' : 'top-3'} right-3 sm:right-4 z-20`}>
                    <div className={cn("px-3 py-1.5 text-xs rounded-full font-medium shadow-lg flex items-center gap-2 transition-all duration-300", statusConfig.badgeClass)}>
                        {statusConfig.icon}
                        <span className="hidden sm:inline">{statusConfig.text}</span>
                    </div>
                </div>

                {/* Type Badge */}
                {website.type && (
                    <div className={`absolute ${(isFreeUser && (deletionTimeLeft || isDeleted)) ? 'top-10' : 'top-3'} left-3 sm:left-4 z-20 bg-blue-500/90 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1.5 transition-all duration-300`}>
                        <LayoutGrid className="w-3 h-3" />
                        <span className="hidden sm:inline">{website.type}</span>
                    </div>
                )}

                {/* Preview Section */}
                <div className={`aspect-[16/10] relative cursor-pointer overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 group ${(isFreeUser && (deletionTimeLeft || isDeleted)) ? 'mt-8' : ''}`} onClick={handleCardClick}>
                    {/* Deleted State Overlay */}
                    {isDeleted && isFreeUser && (
                        <div className="absolute inset-0 bg-red-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4">
                            <AlertTriangle className="w-12 h-12 text-red-300 mb-3" />
                            <p className="text-sm font-medium text-red-200 text-center mb-2">Website Deleted</p>
                            <p className="text-xs text-red-300 text-center mb-4">Upgrade your plan to recover this website</p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpgradeClick();
                                }}
                                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-xs font-medium rounded-lg transition-colors"
                            >
                                Upgrade Now
                            </button>
                        </div>
                    )}

                    {/* Completed State */}
                    {isCompleted && !isDeleted && (
                        <div className="absolute inset-0 bg-slate-900/30">
                            <img
                                src={`${import.meta.env.VITE_FILE_SERVER_URL}/saved-pages/${website?.uuid}/screenshot-cropped.png`}
                                alt="Website preview"
                                className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} ${isHovered ? 'scale-105' : 'scale-100'}`}
                                onLoad={() => setImageLoaded(true)}
                                onError={() => setImageError(true)}
                            />
                            {!imageLoaded && !imageError && (
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                                    <div className="animate-pulse flex flex-col items-center">
                                        <div className="w-12 h-12 bg-slate-700 rounded-lg mb-2"></div>
                                        <div className="w-24 h-2 bg-slate-700 rounded"></div>
                                    </div>
                                </div>
                            )}
                            {imageError && (
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70">
                                    <div className="text-center">
                                        <Wand2 className="w-12 h-12 text-indigo-400 mx-auto mb-2" />
                                        <p className="text-sm text-slate-400">Preview Available</p>
                                    </div>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                    <Eye className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pending State */}
                    {website.status === 'pending' && !isDeleted && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-sm p-4">
                            <div className="relative mb-4">
                                <div className="w-12 h-12 rounded-full border-4 border-yellow-400/30 border-t-yellow-400 animate-spin"></div>
                                <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-yellow-500/50 animate-spin" style={{ animationDuration: '3s' }}></div>
                            </div>
                            <p className="text-sm font-medium text-yellow-300 mb-1">Creating Your Website</p>
                            <p className="text-xs text-slate-300 text-center">Time remaining: {timeLeft}</p>
                            <div className="mt-3 w-24 h-1 bg-yellow-400/20 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 animate-pulse rounded-full"></div>
                            </div>
                        </div>
                    )}

                    {/* Editing State */}
                    {website.status === 'editing' && !isDeleted && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-sm p-4">
                            <div className="bg-blue-500/20 p-4 rounded-full mb-3 border border-blue-500/30">
                                <FileEdit className="w-8 h-8 text-blue-300 animate-pulse" />
                            </div>
                            <p className="text-sm font-medium text-blue-300 text-center mb-1">Editing in Progress</p>
                            <p className="text-xs text-slate-300 text-center">Applying your changes...</p>
                        </div>
                    )}

                    {/* Adding Page State */}
                    {website.status === 'addingPage' && !isDeleted && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm p-4">
                            <div className="bg-purple-500/20 p-4 rounded-full mb-3 border border-purple-500/30">
                                <Plus className="w-8 h-8 text-purple-300 animate-bounce" />
                            </div>
                            <p className="text-sm font-medium text-purple-300 text-center mb-1">Adding New Page</p>
                            <p className="text-xs text-slate-300 text-center">Expanding your website...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {website.status === 'error' && !isDeleted && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-900/20 to-red-800/20 backdrop-blur-sm p-4">
                            <div className="bg-red-500/20 p-4 rounded-full mb-3 border border-red-500/30">
                                <X className="w-8 h-8 text-red-300" />
                            </div>
                            <p className="text-sm font-medium text-red-300 text-center mb-1">Generation Failed</p>
                            <p className="text-xs text-slate-300 text-center">Please try again</p>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-base sm:text-lg leading-tight mb-1 truncate" title={website.source || website?.instruction || 'Untitled Website'}>
                                {website.source || website?.instruction || 'Untitled Website'}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <span>Updated: {new Date(website.updatedAt).toLocaleDateString()}</span>
                                {isProcessing && (
                                    <>
                                        <span>•</span>
                                        <span className="text-yellow-400">{statusConfig.description}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Deleted State Actions for Free Users */}
                    {isDeleted && isFreeUser && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-center py-6 text-sm text-red-400 bg-red-900/20 rounded-lg border border-red-500/30">
                                <div className="text-center">
                                    <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
                                    <p className="font-medium">Website Deleted</p>
                                    <p className="text-xs text-slate-500 mt-1">Upgrade to recover and prevent future deletions</p>
                                </div>
                            </div>
                            <button
                                onClick={handleUpgradeClick}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-slate-800"
                            >
                                <Sparkles className="w-4 h-4" />
                                Upgrade to Recover
                            </button>
                        </div>
                    )}

                    {/* Action Buttons */}
                    {!isDeleted && (
                        <div className="space-y-2">
                            {isCompleted && (
                                <>
                                    {/* Primary Actions */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => detectAndroidAndCall(website)}
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-slate-800"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Preview
                                        </button>

                                        <button
                                            onClick={() => detectAndroidAndCall(website)}
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-800"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            Chat & Edit
                                        </button>
                                    </div>

                                    {/* Secondary Actions - Collapsible */}
                                    <div className="space-y-2">
                                        <div className="grid grid-cols-2 gap-2 animate-fadeIn">
                                            <button
                                                onClick={() => openNewWebsiteModal(website)}
                                                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 focus:ring-offset-slate-800"
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                Add Page
                                            </button>

                                            <button
                                                onClick={() => setSharePopup({ isOpen: true, website })}
                                                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-800"
                                            >
                                                <Share2Icon className="w-4 h-4" />
                                                Share
                                            </button>

                                            <button
                                                onClick={() => {
                                                    handleFormatSelect(website?.uuid);
                                                }}
                                                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-slate-800"
                                            >
                                                <CodeIcon className="w-4 h-4" />
                                                Download Code
                                            </button>

                                            <button
                                                onClick={() => handleOpenConvertToWebAppModal(website.uuid)}
                                                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-slate-800"
                                            >
                                                <CodeIcon className="w-4 h-4" />
                                                Edit in Bolt
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowShareDesign(true)}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-slate-800"
                                    >
                                        <Globe className="w-4 h-4" />
                                        Share in Community
                                    </button>
                                </>
                            )}

                            {/* Processing States */}
                            {isProcessing && (
                                <div className="flex items-center justify-center py-6 text-sm text-slate-400 bg-slate-700/30 rounded-lg">
                                    <div className="text-center">
                                        <div className="mb-2">
                                            {website.status === 'pending' && <div className="w-6 h-6 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin mx-auto"></div>}
                                            {website.status === 'editing' && <FileEdit className="w-6 h-6 text-blue-400 animate-pulse mx-auto" />}
                                            {website.status === 'addingPage' && <Plus className="w-6 h-6 text-purple-400 animate-bounce mx-auto" />}
                                        </div>
                                        <p className="font-medium">{statusConfig.description}</p>
                                        <p className="text-xs text-slate-500 mt-1">Actions will be available once complete</p>
                                    </div>
                                </div>
                            )}

                            {/* Error State */}
                            {website.status === 'error' && (
                                <div className="flex items-center justify-center py-6 text-sm text-red-400 bg-red-900/20 rounded-lg border border-red-500/30">
                                    <div className="text-center">
                                        <X className="w-6 h-6 mx-auto mb-2" />
                                        <p className="font-medium">Generation Failed</p>
                                        <p className="text-xs text-slate-500 mt-1">Please try creating a new website</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default WebsiteCard;