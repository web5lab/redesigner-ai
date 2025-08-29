import { Palette, User, Settings, Upload, Moon, X, Sun, Save, Eye, Sliders, Type, MessageSquare } from 'lucide-react';
import { activeBotSelector, uiConfigSelector } from '../store/global.Selctor';
import { useDispatch, useSelector } from 'react-redux';
import { setUiConfig } from '../store/global.Slice';
import { updateChatBot } from '../store/global.Action';
import { useState } from 'react';
import toast from 'react-hot-toast';

const COLOR_PALETTES = [
    { primary: '#374151', secondary: '#1f2937', bg: '#f9fafb', theme: 'light', name: 'Gray' },
    { primary: '#1f2937', secondary: '#111827', bg: '#f3f4f6', theme: 'light', name: 'Dark Gray' },
    { primary: '#3b82f6', secondary: '#1e40af', bg: '#eff6ff', theme: 'light', name: 'Blue' },
    { primary: '#059669', secondary: '#047857', bg: '#ecfdf5', theme: 'light', name: 'Green' },
    { primary: '#dc2626', secondary: '#b91c1c', bg: '#fef2f2', theme: 'light', name: 'Red' },
    { primary: '#7c3aed', secondary: '#5b21b6', bg: '#f5f3ff', theme: 'light', name: 'Purple' }
];

const FONT_SIZES = [
    { label: 'Small', value: '14px' },
    { label: 'Medium', value: '16px' },
    { label: 'Large', value: '18px' },
    { label: 'Extra Large', value: '20px' },
];

export const ConfigUI = () => {
    const [saving, setSaving] = useState(false)
    const [botIcon, setBotIcon] = useState();
    const [userIcon, setUserIcon] = useState()
    const dispatch = useDispatch();
    const uiConfig = useSelector(uiConfigSelector);
    const activeBot = useSelector(activeBotSelector);

    const {
        customPrimaryColor,
        customSecondaryColor,
        customBgColor,
        themeMode,
        botAvatar,
        userAvatar,
        selectedFontSize,
        botName,
        customQuestions,
        systemPrompt,
        welcomeMessage,
        popupMessage,
    } = uiConfig;

    const handleBotAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => dispatch(setUiConfig({ botAvatar: reader.result }));
            reader.readAsDataURL(file);
        }
        setBotIcon(file);
    };

    const handleUserAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => dispatch(setUiConfig({ userAvatar: reader.result }));
            reader.readAsDataURL(file);
        }
        setUserIcon(file);
    };

    const handleSaveChanges = async () => {
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('name', botName);
            formData.append('icon', botIcon);
            formData.append('userIcon', userIcon);
            formData.append('botAvatar', botAvatar);
            formData.append('userAvatar', userAvatar);
            formData.append('customPrimaryColor', customPrimaryColor);
            formData.append('customSecondaryColor', customSecondaryColor);
            formData.append('customBgColor', customBgColor);
            formData.append('themeMode', themeMode);
            formData.append('selectedFontSize', selectedFontSize);
            formData.append('customQuestions', JSON.stringify(customQuestions));
            formData.append('systemPrompt', systemPrompt);
            formData.append('welcomeMessage', welcomeMessage || '');
            formData.append('popupMessage', popupMessage || '');

            const response = await updateChatBot({
                data: formData, botId: activeBot._id
            });

            toast.success("Changes saved successfully!");

            dispatch(setUiConfig({
                customSecondaryColor: response.bot.secondaryColour, 
                systemPrompt: response.bot.systemPrompt, 
                botName: response.bot.name, 
                customQuestions: response.bot.customQuestions, 
                botAvatar: response.bot.icon, 
                userAvatar: response.bot.userIcon, 
                customPrimaryColor: response.bot.primaryColour, 
                customBgColor: response.bot.backgroundColour, 
                themeMode: response.bot.themeMode, 
                selectedFontSize: response.bot.typography, 
                welcomeMessage: response.bot.welcomeMessage,
                popupMessage: response.bot.popupMessage,
            }));

            setSaving(false);
        } catch (error) {
            console.error("Error saving changes:", error);
            setSaving(false);
        }
    };

    const setCustomPrimaryColor = (color) => dispatch(setUiConfig({ customPrimaryColor: color }))
    const setCustomSecondaryColor = (color) => dispatch(setUiConfig({ customSecondaryColor: color }))
    const setCustomBgColor = (color) => dispatch(setUiConfig({ customBgColor: color }))
    const setThemeMode = (mode) => dispatch(setUiConfig({ themeMode: mode }))
    const setUserAvatar = (avatar) => dispatch(setUiConfig({ userAvatar: avatar }))
    const setBotAvatar = (avatar) => dispatch(setUiConfig({ botAvatar: avatar }))
    const setSelectedFontSize = (size) => dispatch(setUiConfig({ selectedFontSize: size }))

    return (
        <div className="bg-white h-[700px] rounded-lg border border-gray-200 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gray-50 p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white border border-gray-200">
                            <Sliders className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Chat Customization</h2>
                            <p className="text-gray-600">Design your perfect chat experience</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleSaveChanges} 
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Bot Persona */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-6">
                        <div className="p-2 rounded-lg bg-gray-100 mr-4">
                            <Eye className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Bot Persona</h3>
                            <p className="text-gray-600">Define the bot's core instructions and personality</p>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="system-prompt" className="block text-sm font-medium text-gray-700 mb-3">System Prompt</label>
                        <textarea
                            id="system-prompt"
                            value={systemPrompt || ''}
                            onChange={(e) => dispatch(setUiConfig({ systemPrompt: e.target.value }))}
                            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent min-h-[120px] resize-y"
                            placeholder="e.g., You are a friendly and helpful assistant for a SaaS company. Always be polite and end your responses with a cheerful emoji."
                        />
                        <p className="mt-2 text-xs text-gray-500">
                            This prompt guides the AI's behavior. It sets the tone, personality, and rules the bot must follow.
                        </p>
                    </div>
                </section>

                {/* Appearance */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-6">
                        <div className="p-2 rounded-lg bg-gray-100 mr-4">
                            <Palette className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Visual Appearance</h3>
                            <p className="text-gray-600">Customize colors and themes</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Color Palette */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-4">Color Schemes</label>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {COLOR_PALETTES.map((palette, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setThemeMode(palette.theme);
                                            setCustomPrimaryColor(palette.primary);
                                            setCustomSecondaryColor(palette.secondary);
                                            setCustomBgColor(palette.bg);
                                        }}
                                        className="p-4 rounded-lg border-2 transition-all hover:border-gray-400 border-gray-200"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div
                                                className="w-6 h-6 rounded-full"
                                                style={{ backgroundColor: palette.primary }}
                                            />
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: palette.secondary }}
                                            />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-medium text-gray-900">{palette.name}</p>
                                            <p className="text-xs text-gray-500 capitalize">{palette.theme} theme</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Theme Mode */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Theme Mode</label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { mode: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light Mode' },
                                    { mode: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark Mode' }
                                ].map(({ mode, icon, label }) => (
                                    <button
                                        key={mode}
                                        onClick={() => setThemeMode(mode)}
                                        className={`flex items-center justify-center gap-3 p-4 rounded-lg border transition-all ${
                                            themeMode === mode
                                                ? 'border-gray-900 bg-gray-50'
                                                : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        {icon}
                                        <span className="font-medium">{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Typography */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-6">
                        <div className="p-2 rounded-lg bg-gray-100 mr-4">
                            <Type className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Typography</h3>
                            <p className="text-gray-600">Adjust text size and readability</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-4">Font Size</label>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {FONT_SIZES.map((size) => (
                                <button
                                    key={size.value}
                                    onClick={() => setSelectedFontSize(size.value)}
                                    className={`p-4 rounded-lg border-2 transition-all ${
                                        selectedFontSize === size.value
                                            ? 'border-gray-900 bg-gray-50'
                                            : 'border-gray-200 hover:border-gray-400'
                                    }`}
                                >
                                    <div className="text-center">
                                        <div className="font-semibold mb-1" style={{ fontSize: size.value }}>Aa</div>
                                        <div className="text-xs">{size.label}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Avatar Settings */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-6">
                        <div className="p-2 rounded-lg bg-gray-100 mr-4">
                            <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Avatar Settings</h3>
                            <p className="text-gray-600">Customize chat avatars</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { title: 'Bot Avatar', current: botAvatar, handler: handleBotAvatarUpload },
                            { title: 'User Avatar', current: userAvatar, handler: handleUserAvatarUpload },
                        ].map((avatar) => (
                            <div key={avatar.title}>
                                <label className="block text-sm font-medium text-gray-700 mb-4">{avatar.title}</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                        {avatar.current ? (
                                            <img src={avatar.current} alt={avatar.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-6 h-6 text-gray-400 m-3" />
                                        )}
                                    </div>
                                    <label className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                        <Upload className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm font-medium text-gray-600">Upload</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={avatar.handler}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Chat Settings */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-6">
                        <div className="p-2 rounded-lg bg-gray-100 mr-4">
                            <MessageSquare className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Chat Configuration</h3>
                            <p className="text-gray-600">Bot behavior and initial messages</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Bot Name */}
                        <div>
                            <label htmlFor="bot-name" className="block text-sm font-medium text-gray-700 mb-3">Bot Name</label>
                            <input
                                id="bot-name"
                                type="text"
                                value={botName || ''}
                                onChange={(e) => dispatch(setUiConfig({ botName: e.target.value }))}
                                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                placeholder="Enter bot name (e.g., AI Assistant)"
                            />
                        </div>

                        {/* Welcome Message */}
                        <div>
                            <label htmlFor="welcome-message" className="block text-sm font-medium text-gray-700 mb-3">Welcome Message</label>
                            <textarea
                                id="welcome-message"
                                value={welcomeMessage || ''}
                                onChange={(e) => dispatch(setUiConfig({ welcomeMessage: e.target.value }))}
                                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent min-h-[80px] resize-y"
                                placeholder="Enter the first message the bot sends when a user opens the chat."
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                This message will appear as the very first message from the bot when the chat window is opened.
                            </p>
                        </div>

                        {/* Popup Message */}
                        <div>
                            <label htmlFor="popup-message" className="block text-sm font-medium text-gray-700 mb-3">Popup Message</label>
                            <textarea
                                id="popup-message"
                                value={popupMessage || ''}
                                onChange={(e) => dispatch(setUiConfig({ popupMessage: e.target.value }))}
                                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent min-h-[80px] resize-y"
                                placeholder="Enter a short message to display in a small popup/bubble next to the closed chat icon."
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                This message is often used as a small notification bubble next to the chat icon to encourage users to open the chat. Keep it concise.
                            </p>
                        </div>

                        {/* Quick Questions */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Quick Questions</label>
                            <div className="space-y-3">
                                {customQuestions?.map((question, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            value={question || ''}
                                            onChange={(e) => {
                                                const newQuestions = [...(customQuestions || [])];
                                                newQuestions[index] = e.target.value;
                                                dispatch(setUiConfig({ customQuestions: newQuestions }));
                                            }}
                                            className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="Enter a quick question"
                                        />
                                        <button
                                            onClick={() => {
                                                const newQuestions = (customQuestions || []).filter((_, i) => i !== index);
                                                dispatch(setUiConfig({ customQuestions: newQuestions }));
                                            }}
                                            className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => {
                                        if ((customQuestions || []).length < 5) {
                                            dispatch(setUiConfig({
                                                customQuestions: [...(customQuestions || []), '']
                                            }));
                                        }
                                    }}
                                    className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all flex items-center justify-center gap-2"
                                    disabled={(customQuestions || []).length >= 5}
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    Add Quick Question ({(customQuestions || []).length}/5)
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};