import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Github, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import GoogleIcon from '../assets/google.svg';

export function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [stage, setStage] = useState('signup'); // 'signup', 'otp-send', 'otp-verify'
  const [otpSentTo, setOtpSentTo] = useState('');
  const [otpAttempts, setOtpAttempts] = useState(0);

  const signup = async (email, password) => {}
  const sendOTP = async (email) => {}
  const verifyOTP = async (email, otp) => {}

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    // Reset previous errors
    setError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send OTP to email
      await sendOTP(email);
      setOtpSentTo(email);
      setStage('otp-verify');
      setOtpAttempts(0);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    try {
      // Verify OTP
      const otpVerified = await verifyOTP(email, otp);
      
      if (otpVerified) {
        // Complete signup if OTP is correct
        await signup(email, password);
        navigate('/', { replace: true });
      } else {
        // Increment OTP attempts
        const newAttempts = otpAttempts + 1;
        setOtpAttempts(newAttempts);

        if (newAttempts >= 3) {
          // Reset to signup stage after 3 failed attempts
          setStage('signup');
          setError('Too many incorrect OTP attempts. Please start over.');
        } else {
          setError(`Incorrect OTP. Attempt ${newAttempts} of 3`);
        }
      }
    } catch (err) {
      setError('OTP verification failed');
    }
  };

  const handleResendOTP = async () => {
    try {
      await sendOTP(email);
      setError('');
      setOtpAttempts(0);
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  const handleGithubSignup = async () => {
    try {
      await sendOTP(email);
      setError('');
      setOtpAttempts(0);
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };
  const handleMetaMaskSignup = () => {
    
  }
  // Render OTP verification form
  const renderOTPVerification = () => (
    <form onSubmit={handleOTPVerification} className="space-y-4">
      <div>
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
          Enter OTP sent to {otpSentTo}
        </label>
        <input
          id="otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength="6"
          required
          className="mt-1 block w-full rounded-lg border border-blue-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter 6-digit OTP"
        />
      </div>

      <div className="flex justify-between items-center">
        <button 
          type="button" 
          onClick={handleResendOTP}
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          Resend OTP
        </button>
        <p className="text-sm text-gray-500">
          Attempts left: {3 - otpAttempts}
        </p>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Verify OTP
      </button>
    </form>
  );

  // Render initial signup form
  const renderSignupForm = () => (
    <form onSubmit={handleEmailSignup} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-lg border border-blue-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-lg border border-blue-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
          Confirm password
        </label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-lg border border-blue-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Continue
      </button>
    </form>
  );

  return (
    <AuthLayout
      title={stage === 'otp-verify' ? 'Verify Email' : 'Create an account'}
      subtitle={stage === 'otp-verify' ? 'Enter the OTP sent to your email' : 'Start your Web3 journey today'}
    >
      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-50 flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {stage === 'otp-verify' ? renderOTPVerification() : renderSignupForm()}

        {stage === 'signup' && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleGithubSignup}
                className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg border border-blue-200 bg-white text-sm font-medium text-gray-700 hover:bg-blue-50"
              >
                <Github className="w-5 h-5" />
              </button>
              <button
                onClick={handleMetaMaskSignup}
                className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg border border-blue-200 bg-white text-sm font-medium text-gray-700 hover:bg-blue-50"
              >
                <img src={GoogleIcon} alt="MetaMask" className="w-5 h-5" />
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </AuthLayout>
  );
}