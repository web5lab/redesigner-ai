import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Globe,
  Crown,
  Zap,
  Save
} from 'lucide-react'
import { userSelector } from '../store/selectors'
import { setLogout } from '../store/slice'

const settingsGroups = [
  {
    title: 'Account',
    items: [
      { id: 'profile', label: 'Profile', icon: User, color: 'text-blue-600 bg-blue-100' },
      { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-green-600 bg-green-100' },
      { id: 'security', label: 'Security', icon: Shield, color: 'text-red-600 bg-red-100' }
    ]
  },
  {
    title: 'Preferences',
    items: [
      { id: 'appearance', label: 'Appearance', icon: Palette, color: 'text-purple-600 bg-purple-100' },
      { id: 'language', label: 'Language', icon: Globe, color: 'text-orange-600 bg-orange-100' }
    ]
  }
]

export function Settings() {
  const dispatch = useDispatch()
  const user = useSelector(userSelector)
  const [activeSection, setActiveSection] = useState(null)
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.profilePicture || ''
  })
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    marketing: false
  })
  const [appearance, setAppearance] = useState({
    theme: 'light',
    fontSize: 'medium'
  })

  const handleLogout = () => {
    dispatch(setLogout())
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-white" />
                )}
              </div>
              <button className="text-blue-600 text-sm font-medium">Change Photo</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all haptic-medium">
              Save Changes
            </button>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {key === 'push' ? 'Push Notifications' : 
                     key === 'email' ? 'Email Notifications' : 
                     'Marketing Updates'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {key === 'push' ? 'Receive notifications on your device' :
                     key === 'email' ? 'Get updates via email' :
                     'Product updates and offers'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        )

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'light', label: 'Light', icon: Sun },
                  { value: 'dark', label: 'Dark', icon: Moon }
                ].map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => setAppearance(prev => ({ ...prev, theme: theme.value }))}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all haptic-light ${
                      appearance.theme === theme.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <theme.icon className="w-6 h-6 text-gray-600" />
                    <span className="text-sm font-medium">{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Font Size</label>
              <div className="grid grid-cols-3 gap-2">
                {['small', 'medium', 'large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setAppearance(prev => ({ ...prev, fontSize: size }))}
                    className={`p-3 rounded-xl border-2 transition-all haptic-light ${
                      appearance.fontSize === size
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className={`font-medium ${
                      size === 'small' ? 'text-sm' : 
                      size === 'large' ? 'text-lg' : 'text-base'
                    }`}>
                      Aa
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (activeSection) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Section Header */}
        <div className="p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSection(null)}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors touch-target"
            >
              ←
            </button>
            <h1 className="text-xl font-bold text-gray-900 capitalize">{activeSection}</h1>
          </div>
        </div>

        {/* Section Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {renderSectionContent()}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          
          <div className="relative flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
              <p className="text-blue-100">{user?.email || 'user@example.com'}</p>
              <div className="flex items-center gap-2 mt-2">
                <Crown className="w-4 h-4 text-yellow-300" />
                <span className="text-sm">Premium Member</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">{group.title}</h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-all haptic-light"
                >
                  <div className={`p-2 rounded-xl ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">{item.label}</p>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 hover:bg-red-50 transition-all haptic-medium"
          >
            <div className="p-2 rounded-xl bg-red-100 text-red-600">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-medium text-red-600">Sign Out</span>
          </button>
        </div>

        {/* App Info */}
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">CustomerBot Mobile v1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">© 2024 CustomerBot Technologies</p>
        </div>
      </div>
    </div>
  )
}