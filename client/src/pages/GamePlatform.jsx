import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import UserSidebar from '../components/UserSidebar';
import Dashboard from '../components/Dashboard';
import TicketPurchase from '../components/TicketPurchase';
import SpinWheel from '../components/SpinWheel';
import SpinHistory from '../components/SpinHistory';
import ReferralSystem from '../components/ReferralSystem';
import SocialTasks from '../components/SocialTasks';
import TradeDashboard from '../components/TradeDashboard';
import { useAccount } from 'wagmi';
import { getUserProfile, logout, updateUserBalance, updateUserTickets, updateUserStats } from '../store/authSlice';
import { getRewards, purchaseTickets, spinWheel, getSpinHistory } from '../store/gameSlice';
import { getSocialTasks } from '../store/socialSlice';
import { getReferralStats } from '../store/referralSlice';
import toast from 'react-hot-toast';


const GamePlatform= () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wallet = useAccount();
  
  // Redux state
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const { rewards, spinHistory, lastSpinResult, spinning } = useSelector((state) => state.game);
  
  const [activeSection, setActiveSection] = useState('spin');

  // Load user data and game data on component mount
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserProfile());
      dispatch(getRewards());
      dispatch(getSpinHistory());
      dispatch(getSocialTasks());
      dispatch(getReferralStats());
      
      // Check if user just signed in with referral bonus
      const referralProcessed = localStorage.getItem('referralProcessed');
      if (referralProcessed === 'true') {
        toast.success('🎉 Referral bonus applied! You received 100 XXX tokens and 3 free tickets!', {
          duration: 5000,
          style: {
            background: '#10B981',
            color: '#fff',
          },
        });
        localStorage.removeItem('referralProcessed');
      }
    }
  }, [dispatch, isAuthenticated]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading && !wallet.isConnected) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

  // Check authentication when wallet changes
  useEffect(() => {
    if (!wallet.isConnected) {
      // Wallet disconnected but user is still authenticated, logout
      if (isAuthenticated) {
        dispatch(logout());
        navigate('/');
      }
    }
  }, [wallet.isConnected, isAuthenticated, dispatch, navigate]);

  const handleWalletDisconnect = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleTicketPurchase = async (amount) => {
    try {
      const result = await dispatch(purchaseTickets(amount)).unwrap();
      
      // Update user balance and tickets
      dispatch(updateUserBalance({ xxxhub: result.newBalance }));
      dispatch(updateUserTickets(result.currentTickets));
      
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const handleSpin = async () => {
    try {
      const result = await dispatch(spinWheel()).unwrap();

      // Update user stats
      dispatch(updateUserStats({
        currentTickets: result.userStats.currentTickets,
        totalSpins: result.userStats.totalSpins,
        totalWinnings: result.userStats.totalWinnings
      }));

      // Update balance if tokens were won
      if (result.userStats.newBalance) {
        dispatch(updateUserBalance({ xxxhub: result.userStats.newBalance }));
      }

      // Refresh spin history after a short delay
      setTimeout(() => {
        dispatch(getSpinHistory());
      }, 5000);

    } catch (error) {
      console.error('Spin failed:', error);
    }
  };

  const handleTaskComplete = (reward) => {
    if (reward.type === 'tickets') {
      dispatch(updateUserTickets(user.currentTickets + reward.amount));
    } else if (reward.type === 'tokens') {
      const currentBalance = parseFloat(user.tokenBalances.xxxhub);
      dispatch(updateUserBalance({ xxxhub: (currentBalance + reward.amount).toString() }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading game platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className=" shrink-0 overflow-y-auto border-r border-yellow-200 bg-white">
          <UserSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            wallet={wallet}
            onDisconnect={handleWalletDisconnect}
            userStats={user ? {
              tokenBalance: parseFloat(user.tokenBalances?.xxxhub || '0'),
              tickets: user.currentTickets,
              totalSpins: user.totalSpins,
              totalWinnings: user.totalWinnings
            } : undefined}
          />
        </div>
  
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            onBackToHome={() => navigate('/')}
            title={
              activeSection === 'dashboard' ? 'Dashboard' :
              activeSection === 'buy' ? 'Buy Tickets' :
              activeSection === 'spin' ? 'Spin Game' :
              activeSection === 'history' ? 'Spin History' :
              activeSection === 'referral' ? 'Refer & Earn' :
              activeSection === 'tasks' ? 'Social Tasks' :
              activeSection === 'trade' ? 'Trade Tokens' :
              'Game Platform'
            }
            subtitle={
              activeSection === 'dashboard' ? 'Overview of your gaming activity' :
              activeSection === 'buy' ? 'Purchase tickets to play the spin game' :
              activeSection === 'spin' ? 'Spin the wheel and win amazing prizes' :
              activeSection === 'history' ? 'View your past spins and winnings' :
              activeSection === 'referral' ? 'Invite friends and earn rewards' :
              activeSection === 'tasks' ? 'Complete tasks to earn free rewards' :
              activeSection === 'trade' ? 'Swap tokens on PancakeSwap' :
              'Welcome to XXX Gaming Hub'
            }
          />
  
          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto p-8">
            {activeSection === 'dashboard' && user && (
              <Dashboard 
                user={user} 
                tickets={user.currentTickets}
                recentSpins={spinHistory.slice(0, 3)}
              />
            )}
            
            {activeSection === 'buy' && wallet.address && (
              <TicketPurchase 
                tokenBalance={parseFloat(user?.tokenBalances?.xxxhub || '0')}
                onPurchase={handleTicketPurchase}
              />
            )}
            
            {activeSection === 'spin' && (
              <SpinWheel 
                tickets={user?.currentTickets || 0}
                onSpin={handleSpin}
                wallet={wallet}
                tokenBalance={parseFloat(user?.tokenBalances?.xxxhub || '0')}
                rewards={rewards}
                spinning={spinning}
                lastResult={lastSpinResult}
              />
            )}
            
            {activeSection === 'history' && (
              <SpinHistory history={spinHistory} />
            )}
            
            {activeSection === 'referral' && wallet?.address && (
              <ReferralSystem userAddress={wallet.address} />
            )}
            
            {activeSection === 'tasks' && wallet?.address && (
              <SocialTasks userAddress={wallet?.address} onTaskComplete={handleTaskComplete} />
            )}
            
            {activeSection === 'trade' && (
              <TradeDashboard />
            )}
          </main>
        </div>
      </div>
    </div>
  );
  
};

export default GamePlatform;