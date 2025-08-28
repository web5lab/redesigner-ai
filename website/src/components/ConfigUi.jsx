import { Palette, Paintbrush, User, Settings, Upload, Moon, X, Sun, Save, Sparkles, Zap, Crown, Eye, Sliders, Type, MessageSquare, Smartphone } from 'lucide-react';
import { activeBotSelector, uiConfigSelector } from '../store/global.Selctor';
import { useDispatch, useSelector } from 'react-redux';
import { setUiConfig } from '../store/global.Slice';
import { updateChatBot } from '../store/global.Action';
import { useState } from 'react';
import toast from 'react-hot-toast';

// Constants
const COLOR_PALETTES = [
    { primary: '#3B82F6', secondary: '#1c1d1d', bg: '#f0f9ff', theme: 'light', name: 'Ocean Blue' },
    { primary: '#6366F1', secondary: '#EC4899', bg: '#f3f4ff', theme: 'light', name: 'Purple Pink' },
    { primary: '#818CF8', secondary: '#FB7185', bg: '#111827', theme: 'dark', name: 'Dark Violet' },
    { primary: '#10B981', secondary: '#F59E0B', bg: '#f0fdf4', theme: 'light', name: 'Emerald Gold' },
    { primary: '#F59E0B', secondary: '#EF4444', bg: '#fffbeb', theme: 'light', name: 'Sunset' },
    { primary: '#0ea5e9', secondary: '#14b8a6', bg: '#e0f7fa', theme: 'light', name: 'Tropical Aqua' },
    { primary: '#d946ef', secondary: '#9333ea', bg: '#fdf4ff', theme: 'light', name: 'Lavender Dream' },
    { primary: '#f43f5e', secondary: '#f97316', bg: '#fff1f2', theme: 'light', name: 'Coral Punch' },
    { primary: '#84cc16', secondary: '#065f46', bg: '#f7fee7', theme: 'light', name: 'Lime Forest' },
    { primary: '#0f172a', secondary: '#475569', bg: '#1e293b', theme: 'dark', name: 'Midnight Slate' },
    { primary: '#facc15', secondary: '#f472b6', bg: '#fff9db', theme: 'light', name: 'Lemonade Pop' },
    { primary: '#22d3ee', secondary: '#3b82f6', bg: '#ecfeff', theme: 'light', name: 'Skyline' }
];

const BOT_AVATAR_OPTIONS = [
    { name: 'Default Bot', value: 'https://customerbot.in/avatars/bot1.png' },
    { name: 'Friendly Bot', value: 'https://customerbot.in/avatars/bot2.png' },
    { name: 'Professional Bot', value: 'https://customerbot.in/avatars/bot3.png' },
    { name: 'Creative Bot', value: 'https://customerbot.in/avatars/bot4.png' },
];

const USER_AVATAR_OPTIONS = [
    { name: 'Default User', value: 'https://customerbot.in/avatars/user1.png' },
    { name: 'Cool User', value: 'https://customerbot.in/avatars/user2.png' },
    { name: 'Professional User', value: 'https://customerbot.in/avatars/user3.png' },
    { name: 'Creative User', value: 'https://customerbot.in/avatars/user4.png' },
];

const FONT_SIZES = [
    { label: 'Small', value: '14px' },
    { label: 'Medium', value: '16px' },
    { label: 'Large', value: '18px' },
    { label: 'Extra Large', value: '20px' },
];

export const ConfigUI = () => {
    const [saving, setsaving] = useState(false)
    const [botIcon, setbotIcon] = useState();
    const [userIcon, setuserIcon] = useState()
    const dispatch = useDispatch();
    const uiConfig = useSelector(uiConfigSelector);
    const activeBot = useSelector(activeBotSelector);

    const {
        selectedPalette,
        isCustomColorMode,
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
        setbotIcon(file);
    };

    const handleUserAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => dispatch(setUiConfig({ userAvatar: reader.result }));
            reader.readAsDataURL(file);
        }
        setuserIcon(file);
    };

    const handleSaveChanges = async () => {
        setsaving(true);
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
                customSecondaryColor: response.bot.secondaryColour, systemPrompt: response.bot.systemPrompt, botName: response.bot.name, customQuestions: response.bot.customQuestions, botAvatar: response.bot.icon, userAvatar: response.bot.userIcon, customPrimaryColor: response.bot.primaryColour, customBgColor: response.bot.backgroundColour, themeMode: response.bot.themeMode, selectedFontSize: response.bot.typography, welcomeMessage: response.bot.welcomeMessage,
                popupMessage: response.bot.popupMessage,
            }));

            setsaving(false);
        } catch (error) {
            console.error("Error saving changes:", error);
            setsaving(false);
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
        <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 max-h-[700px] h-[90vh] rounded-none sm:rounded-3xl shadow-none sm:shadow-2xl border-0 sm:border border-white/50 backdrop-blur-sm sm:sticky sm:top-6 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 sm:p-6 text-white relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-50"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm">
                            <Sliders className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold">Chat Customization</h2>
                            <p className="text-blue-100 text-sm sm:text-base">Design your perfect chat experience</p>
                        </div>
                    </div>
                    {
                        saving ? (
                            <button className="group relative px-4 py-2 sm:px-6 sm:py-3 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 border border-white/30 w-full sm:w-auto">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative flex items-center justify-center gap-2">
                                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-white text-sm sm:text-base">Saving...</span>
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                                </div>
                            </button>
                        ) : (
                            <button onClick={handleSaveChanges} className="group relative px-4 py-2 sm:px-6 sm:py-3 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 border border-white/30 w-full sm:w-auto">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative flex items-center justify-center gap-2">
                                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="font-semibold text-sm sm:text-base">Save Changes</span>
                                </div>
                            </button>
                        )
                    }
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-8">
                <div className="space-y-6 sm:space-y-8">
                    {/* Bot Persona / System Prompt Section -- NEW */}
                    <section className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/50 shadow-lg">
                        <div className="flex items-center mb-4 sm:mb-6">
                            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 mr-3 sm:mr-4 shadow-lg">
                                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Bot Persona</h3>
                                <p className="text-gray-600 text-sm sm:text-base">Define the bot's core instructions and personality.</p>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="system-prompt" className="block text-sm font-semibold text-gray-700 mb-3">System Prompt</label>
                            <textarea
                                id="system-prompt"
                                value={systemPrompt || ''}
                                onChange={(e) => dispatch(setUiConfig({ systemPrompt: e.target.value }))}
                                className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base min-h-[120px] resize-y"
                                placeholder="e.g., You are a friendly and helpful assistant for a SaaS company. Always be polite and end your responses with a cheerful emoji."
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                This prompt guides the AI's behavior. It sets the tone, personality, and rules the bot must follow.
                            </p>
                        </div>
                    </section>

                    {/* Appearance Section */}
                    <section className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/50 shadow-lg">
                        <div className="flex items-center mb-4 sm:mb-6">
                            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 mr-3 sm:mr-4 shadow-lg">
                                <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Visual Appearance</h3>
                                <p className="text-gray-600 text-sm sm:text-base">Customize colors and themes</p>
                            </div>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            {/* Color Palette */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 sm:mb-4">Color Schemes</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                    {COLOR_PALETTES.map((palette, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setThemeMode(palette.theme);
                                                setCustomPrimaryColor(palette.primary);
                                                setCustomSecondaryColor(palette.secondary);
                                                setCustomBgColor(palette.bg);
                                            }}
                                            className={`group relative p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${!isCustomColorMode && selectedPalette === palette
                                                ? 'ring-2 ring-offset-2 ring-blue-500 border-blue-500'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 mb-2 sm:mb-3">
                                                <div
                                                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full shadow-md"
                                                    style={{ backgroundColor: palette.primary }}
                                                />
                                                <div
                                                    className="w-4 h-4 sm:w-6 sm:h-6 rounded-full shadow-md"
                                                    style={{ backgroundColor: palette.secondary }}
                                                />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-medium text-gray-900">{palette.name}</p>
                                                <p className="text-xs text-gray-500 capitalize">{palette.theme} theme</p>
                                            </div>
                                            {!isCustomColorMode && selectedPalette === palette && (
                                                <div className="absolute top-2 right-2">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <Crown className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    ))}

                                    <button
                                        className={`group relative p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${isCustomColorMode
                                            ? 'ring-2 ring-offset-2 ring-purple-500 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50'
                                            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-center mb-2 sm:mb-3">
                                            <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
                                                <Paintbrush className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium text-gray-900">Custom Colors</p>
                                            <p className="text-xs text-gray-500">Create your own</p>
                                        </div>
                                        {isCustomColorMode && (
                                            <div className="absolute top-2 right-2">
                                                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                                    <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Custom Colors */}
                            {isCustomColorMode && (
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-purple-200">
                                    <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                                        <Paintbrush className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                                        Custom Color Palette
                                    </h4>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
                                        {[
                                            { label: 'Primary Color', value: customPrimaryColor, setter: setCustomPrimaryColor, desc: 'Main accent color' },
                                            { label: 'Secondary Color', value: customSecondaryColor, setter: setCustomSecondaryColor, desc: 'Supporting color' },
                                            { label: 'Background Color', value: customBgColor, setter: setCustomBgColor, desc: 'Chat background' },
                                        ].map((color) => (
                                            <div key={color.label} className="bg-white p-3 sm:p-4 rounded-xl border border-purple-200">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">{color.label}</label>
                                                <div className=" items-center gap-3">
                                                    <input
                                                        type="color"
                                                        value={color.value}
                                                        onChange={e => color.setter(e.target.value)}
                                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 border-gray-200 cursor-pointer shadow-sm"
                                                    />
                                                    <div>
                                                        <span className="text-xs font-mono text-gray-600 block">{color.value}</span>
                                                        <span className="text-xs text-gray-500">{color.desc}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Theme Mode</label>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            {[
                                                { mode: 'light', icon: <Sun className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Light Mode' },
                                                { mode: 'dark', icon: <Moon className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Dark Mode' }
                                            ].map(({ mode, icon, label }) => (
                                                <label
                                                    key={mode}
                                                    className={`flex-1 flex items-center justify-center gap-3 p-3 sm:p-4 rounded-xl border cursor-pointer transition-all ${themeMode === mode
                                                        ? 'border-purple-500 bg-purple-100 text-purple-700'
                                                        : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                                                        }`}
                                                >
                                                    {icon}
                                                    <span className="font-medium text-sm sm:text-base">{label}</span>
                                                    <input
                                                        type="radio"
                                                        value={mode}
                                                        checked={themeMode === mode}
                                                        onChange={() => setThemeMode(mode)}
                                                        className="hidden"
                                                    />
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Typography Section */}
                    <section className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/50 shadow-lg">
                        <div className="flex items-center mb-4 sm:mb-6">
                            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 mr-3 sm:mr-4 shadow-lg">
                                <Type className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Typography</h3>
                                <p className="text-gray-600 text-sm sm:text-base">Adjust text size and readability</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3 sm:mb-4">Font Size</label>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                {FONT_SIZES.map((size) => (
                                    <button
                                        key={size.value}
                                        onClick={() => setSelectedFontSize(size.value)}
                                        className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ${selectedFontSize === size.value
                                            ? 'border-green-500 bg-green-50 text-green-700'
                                            : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
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

                    {/* Avatar Section */}
                    <section className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/50 shadow-lg">
                        <div className="flex items-center mb-4 sm:mb-6">
                            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 mr-3 sm:mr-4 shadow-lg">
                                <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Avatar Settings</h3>
                                <p className="text-gray-600 text-sm sm:text-base">Customize chat avatars</p>
                            </div>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            {[
                                { title: 'Bot Avatar', options: BOT_AVATAR_OPTIONS, current: botAvatar, setter: setBotAvatar, handler: handleBotAvatarUpload },
                                { title: 'User Avatar', options: USER_AVATAR_OPTIONS, current: userAvatar, setter: setUserAvatar, handler: handleUserAvatarUpload },
                            ].map((avatar) => (
                                <div key={avatar.title}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 sm:mb-4">{avatar.title}</label>
                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                        {avatar.options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => avatar.setter(option.value)}
                                                className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 hover:scale-105 ${avatar.current === option.value
                                                    ? 'ring-2 ring-offset-2 ring-blue-500 border-blue-500'
                                                    : 'border-gray-200 hover:border-blue-300'
                                                    }`}
                                                style={{
                                                    backgroundImage: `url(${option.value})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                                title={option.name}
                                            >
                                                {avatar.current === option.value && (
                                                    <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <Crown className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                        <label className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-all group">
                                            <Upload className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400 group-hover:text-gray-600" />
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
                    <section className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/50 shadow-lg">
                        <div className="flex items-center mb-4 sm:mb-6">
                            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 mr-3 sm:mr-4 shadow-lg">
                                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Chat Configuration</h3>
                                <p className="text-gray-600 text-sm sm:text-base">Bot behavior and initial messages</p> {/* Updated description */}
                            </div>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            {/* Bot Name (Keep existing) */}
                            <div>
                                <label htmlFor="bot-name" className="block text-sm font-semibold text-gray-700 mb-3">Bot Name</label>
                                <input
                                    id="bot-name"
                                    type="text"
                                    value={botName || ''} // Use || ''
                                    onChange={(e) => dispatch(setUiConfig({ botName: e.target.value }))}
                                    className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                                    placeholder="Enter bot name (e.g., AI Assistant)"
                                />
                            </div>

                            {/* Welcome Message -- NEW */}
                            <div>
                                <label htmlFor="welcome-message" className="block text-sm font-semibold text-gray-700 mb-3">Welcome Message</label>
                                <textarea
                                    id="welcome-message"
                                    value={welcomeMessage || ''} // Use || '' to handle null/undefined
                                    onChange={(e) => setWelcomeMessage(e.target.value)} // Use helper or dispatch directly
                                    className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base min-h-[80px] resize-y"
                                    placeholder="Enter the first message the bot sends when a user opens the chat."
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    This message will appear as the very first message from the bot when the chat window is opened.
                                </p>
                            </div>

                            {/* Popup Message -- NEW */}
                            <div>
                                <label htmlFor="popup-message" className="block text-sm font-semibold text-gray-700 mb-3">Popup Message</label>
                                <textarea
                                    id="popup-message"
                                    value={popupMessage || ''} // Use || '' to handle null/undefined
                                    onChange={(e) => setPopupMessage(e.target.value)} // Use helper or dispatch directly
                                    className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base min-h-[80px] resize-y"
                                    placeholder="Enter a short message to display in a small popup/bubble next to the closed chat icon."
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    This message is often used as a small notification bubble next to the chat icon to encourage users to open the chat. Keep it concise.
                                </p>
                            </div>

                            {/* Quick Questions (Keep existing) */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Quick Questions</label>
                                <div className="space-y-3">
                                    {customQuestions?.map((question, index) => ( // Use ?. to handle potential null/undefined
                                        <div key={index} className="flex items-center gap-3">
                                            <input
                                                type="text"
                                                value={question || ''} // Use || ''
                                                onChange={(e) => {
                                                    const newQuestions = [...(customQuestions || [])]; // Handle initial empty state
                                                    newQuestions[index] = e.target.value;
                                                    dispatch(setUiConfig({ customQuestions: newQuestions }));
                                                }}
                                                className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                                                placeholder="Enter a quick question"
                                            />
                                            <button
                                                onClick={() => {
                                                    const newQuestions = (customQuestions || []).filter((_, i) => i !== index); // Handle initial empty state
                                                    dispatch(setUiConfig({ customQuestions: newQuestions }));
                                                }}
                                                className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors flex-shrink-0"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            if ((customQuestions || []).length < 5) { // Handle initial empty state
                                                dispatch(setUiConfig({
                                                    customQuestions: [...(customQuestions || []), '']
                                                }));
                                            }
                                        }}
                                        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-orange-400 hover:text-orange-600 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                                        disabled={(customQuestions || []).length >= 5} // Handle initial empty state
                                    >
                                        <Zap className="w-4 h-4" />
                                        Add Quick Question ({(customQuestions || []).length}/5) {/* Handle initial empty state */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>


                </div>
            </div>
        </div>
    );
};