import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'wagmi';
import { authenticateUser, clearError } from '../store/authSlice';
import { useSignMessage } from '../hooks/useSignMessage';
import { useReferralCode } from '../hooks/useReferralCode';
import { 
  Trophy, 
  Zap, 
  Shield, 
  Coins, 
  Star, 
  Sparkles, 
  Crown, 
  Gem,
  ArrowRight,
  Play,
  Gift,
  TrendingUp,
  Users,
  Award,
  Rocket,
  Target,
  ChevronDown,
  RotateCcw,
  Gamepad2,
  Wallet,
  Lock,
  CheckCircle,
  Globe,
  Smartphone,
  Layers,
  Infinity,
  Flame,
  Lightning,
  Heart,
  MessageCircle,
  Twitter,
  Youtube,
  Instagram,
  ExternalLink,
  ArrowUp,
  Menu,
  X,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  DollarSign,
  TrendingDown,
  Eye,
  Clock,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Send,
  ChevronRight,
  Hexagon,
  Layers3,
  Cpu,
  Database,
  Network,
  Fingerprint,
  Radar,
  Orbit
} from 'lucide-react';
import TradingSection from '../components/TradingSection';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wallet = useAccount();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [isSigningIn, setIsSigningIn] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeTestimonial, setActiveTestimonial] = React.useState(0);
  const { signAuthMessage, isPending: isSigningPending } = useSignMessage();
  const { referralCode, clearReferralCode, getPendingReferralCode } = useReferralCode();

  // Handle signing message to access casino
  const handleSignInToCasino = async () => {
    if (!wallet.isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setIsSigningIn(true);
      dispatch(clearError());
      
      // Sign authentication message
      const authData = await signAuthMessage(wallet.address);
      
      // Get pending referral code
      const pendingReferralCode = getPendingReferralCode();
      
      // Authenticate user with signature
      await dispatch(authenticateUser({
        walletAddress: wallet.address,
        signature: authData.signature,
        message: authData.message,
        timestamp: authData.timestamp,
        referralCode: pendingReferralCode
      })).unwrap();
      
      // Clear referral code after successful authentication
      if (pendingReferralCode) {
        clearReferralCode();
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      if (!error.message?.includes('rejected') && !error.message?.includes('denied')) {
        alert('Failed to sign in. Please try again.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const actuallySigningIn = isSigningIn || isSigningPending;

  // Navigate to game when authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/game');
    }
  }, [isAuthenticated, navigate]);

  // Clear error when wallet disconnects
  React.useEffect(() => {
    if (!wallet.isConnected) {
      dispatch(clearError());
    }
  }, [wallet.isConnected, dispatch]);

  // Auto-rotate testimonials
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Show referral notification if there's a pending referral code
  const showReferralNotification = referralCode && !isAuthenticated;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Rest of the JSX code... */}
    </div>
  );
};

export default LandingPage;