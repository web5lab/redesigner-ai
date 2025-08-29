import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { 
  Bot, 
  Crown, 
  Sparkles, 
  Shield, 
  Zap,
  Github,
  Chrome,
  Loader2
} from 'lucide-react'
import { logedInSelector } from '../store/selectors'
import { setLoggedIn, setProfile } from '../store/slice'

export function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(logedInSelector)
  const [isLoading, setIsLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState(null)

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setLoginMethod('google')
    
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`
  }

  const handleGithubLogin = async () => {
    setIsLoading(true)
    setLoginMethod('github')
    
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/github`
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-64 h-64 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-6">
        {/* Logo and Brand */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-30 scale-110"></div>
            <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Crown className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-extrabold mb-3">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              CustomerBot
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            AI-Powered Customer Support
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Secure & Private</span>
          </div>
        </div>

        {/* Login Methods */}
        <div className="space-y-4 mb-8">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 p-4 bg-white hover:bg-gray-50 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 haptic-medium disabled:opacity-50"
          >
            {isLoading && loginMethod === 'google' ? (
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            ) : (
              <Chrome className="w-5 h-5 text-blue-600" />
            )}
            <span className="font-semibold text-gray-700">
              {isLoading && loginMethod === 'google' ? 'Connecting...' : 'Continue with Google'}
            </span>
          </button>

          <button
            onClick={handleGithubLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 p-4 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 haptic-medium disabled:opacity-50"
          >
            {isLoading && loginMethod === 'github' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Github className="w-5 h-5" />
            )}
            <span className="font-semibold">
              {isLoading && loginMethod === 'github' ? 'Connecting...' : 'Continue with GitHub'}
            </span>
          </button>
        </div>

        {/* Features Preview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">What you'll get</h3>
          
          <div className="space-y-3">
            {[
              { icon: Zap, text: 'Instant AI responses', color: 'text-yellow-600 bg-yellow-100' },
              { icon: Bot, text: 'Smart chatbot creation', color: 'text-blue-600 bg-blue-100' },
              { icon: Crown, text: 'Premium features', color: 'text-purple-600 bg-purple-100' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${feature.color}`}>
                  <feature.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Enterprise Security</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>99.9% Uptime</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-400">
            Trusted by 10,000+ businesses worldwide
          </p>
        </div>
      </div>
    </div>
  )
}