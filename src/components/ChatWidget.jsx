import React, { useState, useRef } from 'react';

const ChatWidget = () => {
    const [chatMessages, setChatMessages] = useState([{
        type: 'bot',
        message: "Hi there! I'm your AI assistant. How can I help you today?",
        timestamp: Date.now(),
        agent: 'AI Assistant'
    }]);
    const [isTransferring, setIsTransferring] = useState(false);
    const [currentAgent, setCurrentAgent] = useState('AI Assistant');

    const chatContainerRef = useRef(null);

    function emitCloseEvent() {
        window.parent.postMessage(
            { type: "CHATBOT" },
            "*"
        );
    }






    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };




    return (
        <div className="w-full rounded-2xl  h-[100vh] bg-red-300 flex flex-col overflow-hidden transform transition-all duration-300 ease-in-out scale-100 opacity-100 origin-bottom-right">

            {/* Header: Fixed height, doesn't shrink */}
            <div className="bg-gradient-to-r from-sky-500 to-indigo-600 p-4 text-white relative flex items-center justify-between flex-shrink-0">
                {/* ... Header content ... */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{currentAgent}</h3>
                        <div className="flex items-center space-x-1 text-xs opacity-90">
                            <div className={`w-2 h-2 rounded-full ${isTransferring ? 'bg-yellow-400' : 'bg-green-400'} animate-pulse-slow`}></div>
                            <span> Online</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2 pl-4 flex-shrink-0">
                    <button
                        className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                        title="Clear chat"
                    >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                    {/* Changed minimize to close icon for typical widget behavior */}
                    <button
                        onClick={() => emitCloseEvent()}
                        className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                        title="Close chat"
                    >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Message Container: Uses flex-1 to grow and fill vertical space */}
            {/* Removed the redundant h-full here */}
            <div
                ref={chatContainerRef}
                className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 custom-scrollbar"
            >
                {chatMessages.map((msg, index) => (
                    <div key={index}>

                        <div className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className="max-w-[85%] sm:max-w-[80%]">
                                {/* Agent name above bot messages */}
                                {msg.type === 'bot' && msg.agent && msg.agent !== currentAgent && msg.agent !== 'AI Assistant' && msg.agent !== 'System' && !isTransferring && (
                                    // Only show if it's a bot message and the agent is different from the current display agent
                                    // and it's not the initial AI or system message during transfer
                                    <div className="text-[10px] text-gray-500 mb-0.5 px-1">
                                        {msg.agent}
                                    </div>
                                )}
                                <div
                                    className={`px-4 py-2 rounded-2xl shadow-sm ${msg.type === 'user'
                                        ? 'bg-sky-500 text-white rounded-br-md'
                                        : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                                        }`}
                                >
                                    <div className="flex justify-center">
                                        <div className=" text-blue-800 px-3 py-1 rounded-full text-xs font-medium text-start max-w-xs">
                                            This is just a demo. You can activate the full chatbot experience by visiting{' '}
                                            <a
                                                href="https://customerbot.in"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline text-blue-600 hover:text-blue-700"
                                            >
                                                customerbot.in
                                            </a>
                                        </div>
                                    </div>

                                    <p className={`text-xs mt-1 text-right ${msg.type === 'user' ? 'text-sky-100' : 'text-gray-500'}`}>
                                        {formatTime(msg.timestamp)}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}


            </div>

            {/* Input Area: Fixed height, doesn't shrink */}
            <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
                {/* ... Input content ... */}
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 border text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm placeholder-gray-500"
                    />
                    <button
                        className="w-9 h-9 flex items-center justify-center bg-sky-500 text-white rounded-full hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="w-4 h-4 rotate-90 transform origin-center" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Footer: Fixed height, doesn't shrink */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-center flex-shrink-0">
                {/* ... Footer content ... */}
                <div className="flex items-center justify-center space-x-1">
                    <span className="text-[10px] text-gray-500">Powered by</span>
                    <div className="flex items-center space-x-0.5">
                        <svg className="w-3 h-3 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                        <a href='http://customerbot.in/' target='_blank' className="text-xs font-semibold text-sky-600">CustomerBot</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChatWidget; 