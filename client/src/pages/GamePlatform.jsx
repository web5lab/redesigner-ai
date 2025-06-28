import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import UserSidebar from '../components/UserSidebar';
import Dashboard from '../components/Dashboard';
import TicketPurchase from '../components/TicketPurchase';
import SpinWheel from '../components/SpinWheel';
import SpinHistory from '../components/SpinHistory';
import ReferralSystem from '../components/ReferralSystem';
import SocialTasks from '../components/SocialTasks';
import { useAccount } from 'wagmi';


const GamePlatform= () => {
  const navigate = useNavigate();
  const wallet = useAccount();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('spin');
  const [tickets, setTickets] = useState(0);
  const [spinHistory, setSpinHistory] = useState([]);
  const handleWalletDisconnect = () => {
    setUser(null);
    setTickets(0);
    setSpinHistory([]);
  };

  const handleTicketPurchase = (amount) => {
    if (user) {
      setUser({
        ...user,
        tokenBalance: user.tokenBalance - (amount * 10) // 10 XXX per ticket
      });
      setTickets(prev => prev + amount);
    }
  };

  const handleSpin = (result) => {
    setTickets(prev => prev - 1);
    setSpinHistory(prev => [result, ...prev]);
    if (user && result.winAmount > 0) {
      setUser({
        ...user,
        totalWinnings: user.totalWinnings + result.winAmount,
        totalSpins: user.totalSpins + 1,
      });
    }
  };



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
              tokenBalance: user.tokenBalance,
              tickets: tickets,
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
              'Game Platform'
            }
            subtitle={
              activeSection === 'dashboard' ? 'Overview of your gaming activity' :
              activeSection === 'buy' ? 'Purchase tickets to play the spin game' :
              activeSection === 'spin' ? 'Spin the wheel and win amazing prizes' :
              activeSection === 'history' ? 'View your past spins and winnings' :
              activeSection === 'referral' ? 'Invite friends and earn rewards' :
              activeSection === 'tasks' ? 'Complete tasks to earn free rewards' :
              'Welcome to XXX Gaming Hub'
            }
          />
  
          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto p-8">
            {activeSection === 'dashboard' && user && (
              <Dashboard 
                user={user} 
                tickets={tickets}
                recentSpins={spinHistory.slice(0, 3)}
              />
            )}
            
            {activeSection === 'buy' && wallet.address && (
              <TicketPurchase 
                tokenBalance={user?.tokenBalance||1}
                onPurchase={handleTicketPurchase}
              />
            )}
            
            {activeSection === 'spin' && (
              <SpinWheel 
                tickets={tickets}
                onSpin={handleSpin}
                wallet={wallet}
                tokenBalance={user?.tokenBalance}
              />
            )}
            
            {activeSection === 'history' && (
              <SpinHistory history={spinHistory} />
            )}
            
            {activeSection === 'referral' && wallet?.address && (
              <ReferralSystem userAddress={wallet.address} />
            )}
            
            {activeSection === 'tasks' && wallet?.address && (
              <SocialTasks userAddress={wallet?.address} onTaskComplete={(reward) => {
                if (reward.type === 'tickets') {
                  setTickets(prev => prev + reward.amount);
                } else if (reward.type === 'tokens' && user) {
                  setUser(prev => prev ? { ...prev, tokenBalance: prev.tokenBalance + reward.amount } : null);
                }
              }} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
  
};

export default GamePlatform;