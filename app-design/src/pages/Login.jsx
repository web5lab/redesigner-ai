import { ArrowLeft, Github } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logedInSelector } from '../store/selectors'
import { useEffect, useState } from 'react'

const GoogleLogo = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
  </svg>
)

export function Login() {
  const navigate = useNavigate()
  const logedIn = useSelector(logedInSelector)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (logedIn) {
      navigate('/')
    }
  }, [logedIn, navigate])

  const handleGithubLogin = () => {
    setIsLoading(true)
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/github`
  }

  const handleGoogleLogin = () => {
    setIsLoading(true)
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to home</span>
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-900 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              <span className="font-semibold text-gray-900">CustomerBot</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Sign in to CustomerBot
            </h1>
            <p className="text-gray-600">
              Welcome back! Please sign in to continue.
            </p>
          </div>

          <div className="space-y-4">
            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <GoogleLogo />
              <span className="font-medium text-gray-700">
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </span>
            </button>

            {/* GitHub Login */}
            <button
              onClick={handleGithubLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Github className="w-5 h-5 mr-3" />
              <span className="font-medium">
                {isLoading ? 'Signing in...' : 'Continue with GitHub'}
              </span>
            </button>
          </div>

          {/* Terms */}
          <p className="mt-8 text-center text-sm text-gray-500">
            By signing in, you agree to our{' '}
            <a href="#" className="text-gray-900 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-gray-900 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
              <span className="text-gray-700">Signing you in...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}