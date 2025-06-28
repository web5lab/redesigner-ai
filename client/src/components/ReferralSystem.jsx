import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReferralHistory } from '../store/referralSlice';
import { Users, Copy, Gift, TrendingUp, Share2, CheckCircle, Clock, Star, Link, Award } from 'lucide-react';


const ReferralSystem = ({ userAddress }) => {
  const dispatch = useDispatch();
  const { stats, history } = useSelector((state) => state.referral);

  const [copied, setCopied] = useState(false);
  const referralLink = stats.referralLink || `https://xxxgaminghub.app/ref/${stats.referralCode}`;

  React.useEffect(() => {
    dispatch(getReferralHistory());
  }, [dispatch]);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocial = (platform) => {
    const text = `🎰 Join me on XXX Gaming Hub - the ultimate Web3 gaming platform! Use my referral code ${stats.referralCode} and get bonus rewards! 🎁`;
    const url = referralLink;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  const formatAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Refer & Earn</h1>
        <p className="text-gray-600">Invite friends and earn rewards together!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.totalReferrals}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Referrals</h3>
          <p className="text-sm text-gray-600">Friends invited</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.completedReferrals}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Active Referrals</h3>
          <p className="text-sm text-gray-600">Friends playing</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.pendingReferrals}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Pending</h3>
          <p className="text-sm text-gray-600">Awaiting signup</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.totalRewardsEarned.toLocaleString()}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Rewards Earned</h3>
          <p className="text-sm text-gray-600">XXX tokens</p>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Referral Link</h2>
        
        <div className="bg-white rounded-lg p-4 border border-purple-200 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Referral Code</p>
              <p className="text-2xl font-bold text-purple-600">{stats.referralCode}</p>
            </div>
            <button
              onClick={copyReferralLink}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all flex items-center space-x-2"
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-purple-200 mb-4">
          <p className="text-sm text-gray-600 mb-2">Share Link</p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
            />
            <button
              onClick={copyReferralLink}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => shareOnSocial('twitter')}
            className="bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center justify-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Twitter</span>
          </button>
          
          <button
            onClick={() => shareOnSocial('telegram')}
            className="bg-blue-400 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-all flex items-center justify-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Telegram</span>
          </button>
          
          <button
            onClick={() => shareOnSocial('whatsapp')}
            className="bg-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center justify-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-yellow-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">How Referral Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Link className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Share Your Link</h3>
            <p className="text-gray-600">Send your unique referral link to friends via social media or direct message</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Friend Joins</h3>
            <p className="text-gray-600">Your friend signs up using your link and connects their wallet</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Earn Rewards</h3>
            <p className="text-gray-600">Both you and your friend receive bonus tokens and free spins!</p>
          </div>
        </div>
      </div>

      {/* Reward Tiers */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Referral Rewards</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-yellow-200 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Per Referral</h3>
            <p className="text-2xl font-bold text-yellow-600">200 XXX</p>
            <p className="text-sm text-gray-600">+ 5 Free Spins</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-200 text-center">
            <Award className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">5 Referrals</h3>
            <p className="text-2xl font-bold text-blue-600">1,500 XXX</p>
            <p className="text-sm text-gray-600">Bonus Reward</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-purple-200 text-center">
            <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">10 Referrals</h3>
            <p className="text-2xl font-bold text-purple-600">5,000 XXX</p>
            <p className="text-sm text-gray-600">+ Rare NFT</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-pink-200 text-center">
            <Gift className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">25 Referrals</h3>
            <p className="text-2xl font-bold text-pink-600">15,000 XXX</p>
            <p className="text-sm text-gray-600">VIP Status</p>
          </div>
        </div>
      </div>

      {/* Referral History */}
      <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Your Referrals</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Friend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {history.map((referral) => (
                <tr key={referral.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {formatAddress(referral.referredAddress || 'Unknown')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      referral.status === 'active' || referral.status === 'completed'
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {referral.status === 'active' || referral.status === 'completed' ? 'Active' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(referral.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {referral.rewardClaimed ? (
                      <span className="text-green-600 font-semibold text-sm">200 XXX Claimed</span>
                    ) : referral.status === 'active' || referral.status === 'completed' ? (
                      <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                        Claim 200 XXX
                      </button>
                    ) : (
                      <span className="text-gray-500 text-sm">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReferralSystem;