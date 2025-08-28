import { ArrowLeft, Sparkles, Github, Chrome, Shield, Zap, Star, CheckCircle, Crown } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logedInSelector } from '../store/global.Selctor';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
  
  // Enhanced SVG Components
  const GoogleLogo = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    </svg>
  );
  
  const GitHubLogo = () => (
    <Github className="w-5 h-5 mr-3" />
  );
  
  export function Login() {
    const navigate = useNavigate();
    const logedIn = useSelector(logedInSelector);
    const [isLoading, setIsLoading] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null);
  
    useEffect(() => {
      if (logedIn) {
        navigate('/dashboard');
      }
    }, [logedIn, navigate]);
  
    const handleGithubLogin = () => {
      setIsLoading(true);
      window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/github`;
    };
  
    const handleGoogleLogin = () => {
      setIsLoading(true);
      window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
    };
  
    return (
      <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-indigo-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-tr from-purple-400/30 to-pink-600/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-32 left-32 w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>
  
        {/* Premium Header */}
        <header className="absolute top-0 left-0 right-0 z-20 px-6 py-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
              <span className="font-semibold text-gray-700 group-hover:text-gray-900">Back to Home</span>
            </button>
            
            {/* Status Badge */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full border border-green-200 shadow-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">Secure Login</span>
              <Shield className="w-4 h-4" />
            </div>
          </div>
        </header>
  
        {/* Main Content */}
        <div className="relative z-10 w-full max-w-lg mx-auto px-4">
          {/* Premium Card Container */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl transform scale-110"></div>
            
            {/* Main Card */}
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12 transform transition-all duration-700 hover:scale-[1.02]">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl rotate-12 blur-sm"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-pink-500/30 to-red-500/30 rounded-2xl -rotate-12 blur-sm"></div>
              
             
  
              {/* Logo and Brand Section */}
              <div className="text-center space-y-6 mb-10 pt-4">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-30 scale-110"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl transform transition-transform duration-300 hover:scale-110 hover:rotate-6">
                    <img src={logo} className="w-16 h-16 rounded-full" alt="CustomerBot Logo" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h1 className="text-4xl lg:text-5xl font-extrabold">
                    <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                      Welcome to
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      CustomerBot
                    </span>
                  </h1>
                  
                  <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                    Your intelligent AI assistant for seamless customer experiences. 
                    <span className="font-semibold text-blue-600"> Sign in to unlock the future.</span>
                  </p>
                </div>
              </div>
          
              {/* Enhanced Login Section */}
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Login Method</h2>
                  <p className="text-gray-600">Secure authentication in one click</p>
                </div>
  
                {/* Google Login Button */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  onMouseEnter={() => setHoveredButton('google')}
                  onMouseLeave={() => setHoveredButton(null)}
                  disabled={isLoading}
                  className="group relative w-full flex items-center justify-center px-6 py-4 bg-white hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 rounded-xl border-2 border-gray-200 hover:border-red-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 transform transition-transform duration-500 ${hoveredButton === 'google' ? 'scale-100' : 'scale-0'} rounded-xl`}></div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <GoogleLogo />
                  <span className="relative font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                    {isLoading ? 'Connecting...' : 'Continue with Google'}
                  </span>
              
                </button>
  
                {/* GitHub Login Button */}
                <button
                  type="button"
                  onClick={handleGithubLogin}
                  onMouseEnter={() => setHoveredButton('github')}
                  onMouseLeave={() => setHoveredButton(null)}
                  disabled={isLoading}
                  className="group relative w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 transform transition-transform duration-500 ${hoveredButton === 'github' ? 'scale-100' : 'scale-0'} rounded-xl`}></div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <GitHubLogo />
                  <span className="relative font-semibold group-hover:text-gray-100 transition-colors">
                    {isLoading ? 'Connecting...' : 'Continue with GitHub'}
                  </span>
                 
                </button>
              </div>
  
           
            </div>
          </div>
        </div>
  
        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 shadow-2xl flex items-center gap-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg font-semibold text-gray-700">Connecting securely...</span>
            </div>
          </div>
        )}
      </main>
    );
  }