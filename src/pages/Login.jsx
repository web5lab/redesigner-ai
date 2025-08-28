import React from 'react';
import { Github, Mail, Zap, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { UserSelector } from '../store/global.Selctor';
import { Navigate, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';

const Login = () => {
  const [isNewUser, setIsNewUser] = React.useState(false);
  const user = useSelector(UserSelector);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/github`;
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-indigo-400 font-bold text-2xl mb-4">
            <img src={logo} className="h-12 w-12" />
            <span onClick={() => {
              navigate('/');
            }}>redesignr<span className="text-purple-400">.ai</span></span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {isNewUser ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-slate-400">
            {isNewUser 
              ? 'Start your journey with redesignr.ai'
              : 'Sign in to continue to redesignr.ai'
            }
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex p-1 bg-slate-900/50 rounded-lg mb-6">
            <button
              onClick={() => setIsNewUser(false)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                !isNewUser
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsNewUser(true)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                isNewUser
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleGithubLogin}
              className="w-full flex items-center justify-center gap-3 bg-slate-700/50 hover:bg-slate-700 text-white px-4 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] group"
            >
              <Github className="h-5 w-5" />
              {isNewUser ? 'Sign up with GitHub' : 'Continue with GitHub'}
              <ArrowRight className="h-5 w-5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </button>
            
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-slate-700/50 hover:bg-slate-700 text-white px-4 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] group"
            >
              <Mail className="h-5 w-5" />
              {isNewUser ? 'Sign up with Gmail' : 'Continue with Gmail'}
              <ArrowRight className="h-5 w-5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              {isNewUser ? 'By signing up, you agree to our ' : 'By continuing, you agree to our '}
              <a href="#" className="text-indigo-400 hover:text-indigo-300">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</a>
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            {isNewUser ? 'Already have an account? ' : "Don't have an account? "}
            <button 
              onClick={() => setIsNewUser(!isNewUser)}
              className="text-indigo-400 hover:text-indigo-300"
            >
              {isNewUser ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;