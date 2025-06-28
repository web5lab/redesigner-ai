import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Gift, Zap, Trophy, Star, Ticket, Coins, Gem, Crown, Sparkles, Wallet } from 'lucide-react';

const SpinWheel = ({ 
  tickets = 0, 
  onSpin, 
  wallet,
  tokenBalance = 0,
  rewards = [],
  spinning = false,
  lastResult = null
}) => {
  const [showResult, setShowResult] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const wheelRef = useRef(null);
  const resultTimeoutRef = useRef(null);
  
  // Map API rewards to component format
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'coins': return Coins;
      case 'trophy': return Trophy;
      case 'gift': return Gift;
      case 'zap': return Zap;
      case 'crown': return Crown;
      case 'sparkles': return Sparkles;
      case 'gem': return Gem;
      case 'star': return Star;
      default: return Coins;
    }
  };
  
  // Map rewards from API to component format
  const mappedRewards = rewards.filter(r => r.isActive).map(reward => ({
    label: reward.name,
    value: reward.value,
    type: reward.rewardType,
    color: reward.color,
    icon: getIconComponent(reward.icon),
    glow: reward.glowEffect || 'shadow-yellow-500/50',
    position: reward.position
  })).sort((a, b) => a.position - b.position);

  // Show result when lastResult changes
  useEffect(() => {
    if (lastResult && !spinning) {
      // Clear any existing timeout
      if (resultTimeoutRef.current) {
        clearTimeout(resultTimeoutRef.current);
      }
      
      // Set a timeout to show the result after the wheel stops spinning
      resultTimeoutRef.current = setTimeout(() => {
        setShowResult(true);
        // Try to vibrate on mobile devices for tactile feedback
        if (navigator.vibrate) {
          navigator.vibrate(200);
        }
      }, 4500); // Slightly longer than the spin animation
    }
    
    return () => {
      if (resultTimeoutRef.current) {
        clearTimeout(resultTimeoutRef.current);
      }
    };
  }, [lastResult, spinning]);

  // Handle wheel animation when spinning starts
  useEffect(() => {
    if (spinning && wheelRef.current && mappedRewards.length > 0) {
      setIsTransitioning(true);
      
      // Calculate final rotation to land on the winning segment
      let targetPosition = 0;
      
      if (lastResult) {
        // Find the reward with matching position
        const winningReward = mappedRewards.find(r => r.position === lastResult.wheelPosition);
        if (winningReward) {
          const rewardIndex = mappedRewards.indexOf(winningReward);
          const segmentAngle = 360 / mappedRewards.length;
          
          // Calculate angle to center of winning segment, then adjust to point at the top
          targetPosition = 360 - (rewardIndex * segmentAngle) - (segmentAngle / 2);
          
          // Add extra rotations for visual effect (5-10 full rotations)
          const extraRotations = 360 * (5 + Math.floor(Math.random() * 5));
          targetPosition += extraRotations;
        }
      } else {
        // Random rotation if no result yet
        targetPosition = 360 * 8 + Math.random() * 360;
      }
      
      // Apply rotation with easing
      setWheelRotation(targetPosition);
    }
  }, [spinning, mappedRewards.length, lastResult]);

  // Handle transition end
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    
    // Reset wheel rotation when not spinning (without animation)
    if (!spinning && wheelRef.current) {
      // Keep the wheel in its final position until the result is dismissed
      if (!showResult) {
        const currentRotation = wheelRotation % 360;
        setWheelRotation(currentRotation);
      }
    }
  };

  const handleSpin = () => {
    if (tickets <= 0 || spinning || isTransitioning) return;

    setShowResult(false);
    
    // Call the onSpin function which will handle the API call
    if (onSpin) {
      onSpin();
    }
  };

  const resetWheel = () => {
    setShowResult(false);
    
    // Reset wheel position without animation
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'none';
      setWheelRotation(0);
      
      // Force reflow to apply the style change
      wheelRef.current.offsetHeight;
      
      // Restore transition for next spin
      setTimeout(() => {
        if (wheelRef.current) {
          wheelRef.current.style.transition = 'transform 4s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
        }
      }, 50);
    }
  };

  if (mappedRewards.length === 0) {
    return (
      <div className="min-h-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden rounded-2xl flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading rewards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden rounded-2xl">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-800/20 via-transparent to-transparent animate-pulse"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-yellow-500/50">
              <RotateCcw className="w-10 h-10 text-white animate-spin-slow" />
            </div>
          </div>
          
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-4 animate-pulse">
            LUCKY SPIN
          </h1>
          
          <div className="text-2xl font-bold text-white mb-6 animate-bounce">
            🎰 CASINO ROYALE 🎰
          </div>
          
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-2xl px-6 py-3 border-2 border-yellow-400/30 shadow-2xl shadow-yellow-500/25">
            <Ticket className="w-6 h-6 text-yellow-400 animate-pulse" />
            <span className="text-xl font-bold text-yellow-300">
              TICKETS: {tickets}
            </span>
          </div>
          
          {/* Wallet Info */}
          {wallet && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl px-6 py-3 border-2 border-blue-400/30 shadow-2xl shadow-blue-500/25">
                <div className="flex items-center space-x-3">
                  <Wallet className="w-5 h-5 text-blue-400" />
                  <div className="text-center">
                    <p className="text-blue-300 font-bold text-sm">WALLET</p>
                    <p className="text-white font-semibold text-sm">
                      {wallet?.address?.slice(0, 6)}...{wallet?.address?.slice(-4)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl px-6 py-3 border-2 border-green-400/30 shadow-2xl shadow-green-500/25">
                <div className="flex items-center space-x-3">
                  <Coins className="w-5 h-5 text-green-400" />
                  <div className="text-center">
                    <p className="text-green-300 font-bold text-sm">BALANCE</p>
                    <p className="text-white font-semibold text-sm">
                      {tokenBalance.toLocaleString()} XXX
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl px-6 py-3 border-2 border-purple-400/30 shadow-2xl shadow-purple-500/25">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-5 h-5 text-purple-400" />
                  <div className="text-center">
                    <p className="text-purple-300 font-bold text-sm">NETWORK</p>
                    <p className="text-white font-semibold text-sm">
                      {wallet.network || 'BSC'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Spin Wheel */}
        <div className="flex justify-center mb-8 relative">
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-50 blur-xl animate-pulse"></div>
          
          <div className="relative">
            {/* Wheel Base */}
            <div className="absolute inset-0 w-96 h-96 rounded-full bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600 shadow-2xl shadow-orange-500/50 animate-pulse"></div>
            
            {/* Wheel Container */}
            <div className="relative w-96 h-96 mx-auto">
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                <div className="relative">
                  <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-yellow-400 shadow-lg"></div>
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow-lg"></div>
                </div>
              </div>
              
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border-8 border-yellow-400 shadow-2xl shadow-orange-500/50"></div>
              
              {/* Wheel */}
              <div
                ref={wheelRef}
                className="relative w-full h-full rounded-full border-8 border-yellow-400 shadow-2xl overflow-hidden"
                style={{
                  transform: `rotate(${wheelRotation}deg)`,
                  transition: isTransitioning ? 'transform 4s cubic-bezier(0.18, 0.89, 0.32, 1.28)' : 'none'
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {mappedRewards.map((reward, index) => {
                  const angle = (360 / mappedRewards.length) * index;
                  const Icon = reward.icon;
                  
                  return (
                    <div
                      key={index}
                      className="absolute w-full h-full"
                      style={{
                        transform: `rotate(${angle}deg)`,
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((2 * Math.PI) / mappedRewards.length)}% ${50 - 50 * Math.sin((2 * Math.PI) / mappedRewards.length)}%)`,
                        animation: `fadeIn 0.3s ease-out forwards`,
                        animationDelay: `${index * 0.05}s`,
                        opacity: 0
                      }}
                    >
                      <div className={`relative w-full h-full bg-gradient-to-br ${reward.color} shadow-inner`}>
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 shimmer"></div>
                        
                        {/* Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${reward.color} opacity-80 blur-sm`}></div>
                        
                        {/* Content */}
                        <div className="relative flex items-center justify-center h-full">
                          <div 
                            className="text-center text-white transform translate-y-8"
                            style={{ transform: `rotate(${90 - (360 / mappedRewards.length) / 2}deg) translateY(-60px)` }}
                          >
                            <Icon className="w-8 h-8 mx-auto mb-2 drop-shadow-lg" />
                            <p className="text-sm font-black drop-shadow-lg tracking-wide">{reward.label}</p>
                          </div>
                        </div>
                        
                        {/* Inner Border */}
                        <div className="absolute inset-0 border-2 border-white/20 rounded-full"></div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Decorative Dots */}
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-white rounded-full shadow-lg"
                    style={{
                      top: '10px',
                      left: '50%',
                      transform: `translateX(-50%) rotate(${i * 22.5}deg)`,
                      transformOrigin: '50% 182px',
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Center Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center border-2 border-yellow-300">
                  <RotateCcw className={`w-8 h-8 text-white ${spinning ? 'animate-spin-medium' : 'animate-pulse'}`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spin Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleSpin}
            disabled={tickets <= 0 || spinning || isTransitioning}
            className={`relative px-12 py-6 rounded-2xl font-black text-2xl transition-all transform ${
              tickets <= 0 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : spinning || isTransitioning
                ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white cursor-not-allowed scale-95'
                : 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white hover:from-yellow-500 hover:to-red-600 hover:scale-110 active:scale-95 shadow-2xl shadow-orange-500/50'
            } ${spinning || isTransitioning ? 'animate-pulse' : 'animate-bounce'}`}
          >
            {/* Button Glow */}
            {!spinning && !isTransitioning && tickets > 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
            )}
            
            <div className="relative">
              {spinning || isTransitioning ? (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-white text-shadow">SPINNING...</span>
                </div>
              ) : tickets <= 0 ? (
                <span>NO TICKETS!</span>
              ) : (
                <div className="flex items-center space-x-3">
                  <RotateCcw className="w-8 h-8 animate-spin-slow" />
                  <span className="text-shadow">SPIN TO WIN!</span>
                </div>
              )}
            </div>
          </button>
          
          {tickets <= 0 && (
            <p className="text-red-400 mt-4 text-lg font-bold animate-pulse">
              🎫 Buy more tickets to continue playing! 🎫
            </p>
          )}
        </div>

        {/* Result Modal */}
        {showResult && lastResult && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-3xl p-8 max-w-md mx-4 text-center border-4 border-yellow-400 shadow-2xl shadow-yellow-500/50 relative overflow-hidden animate-scaleIn">
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-red-500/10 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className={`w-24 h-24 bg-gradient-to-br ${
                  lastResult.type === 'tokens' ? 'from-green-400 to-emerald-600' :
                  lastResult.type === 'jackpot' ? 'from-cyan-400 to-blue-600' :
                  lastResult.type === 'nft' ? 'from-pink-500 to-rose-700' :
                  lastResult.type === 'bonus' ? 'from-purple-500 to-violet-700' :
                  lastResult.type === 'multiplier' ? 'from-teal-400 to-cyan-600' :
                  'from-indigo-400 to-indigo-600'
                } rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce`}>
                  {lastResult.type === 'tokens' ? <Coins className="w-12 h-12 text-white" /> :
                   lastResult.type === 'jackpot' ? <Crown className="w-12 h-12 text-white" /> :
                   lastResult.type === 'nft' ? <Gem className="w-12 h-12 text-white" /> :
                   lastResult.type === 'bonus' ? <Gift className="w-12 h-12 text-white" /> :
                   lastResult.type === 'multiplier' ? <Sparkles className="w-12 h-12 text-white" /> :
                   <Star className="w-12 h-12 text-white animate-spin-slow" />}
                </div>
                
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4 animate-pulse">
                  {lastResult.winAmount > 0 || lastResult.type !== 'nothing' ? '🎉 WINNER! 🎉' : '🎯 BETTER LUCK NEXT TIME! 🎯'}
                </h2>
                
                <p className="text-2xl font-bold text-white mb-4 animate-bounce">
                  {lastResult.reward}
                </p>
                
                {lastResult.type === 'nothing' && (
                  <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-2 border-indigo-400 rounded-xl p-4 mb-6 backdrop-blur-sm">
                    <p className="text-indigo-300 font-bold">Don't give up! Your next spin could be a big win!</p>
                    <div className="flex justify-center mt-2 space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-2 h-2 rounded-full bg-indigo-400"
                          style={{
                            animation: `bounce 0.8s infinite`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
                
                {lastResult.winAmount > 0 && (
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400 rounded-xl p-4 mb-6 backdrop-blur-sm">
                    <p className="text-green-300 font-bold text-lg">
                      💰 +{lastResult.winAmount.toLocaleString()} COINS! 💰
                    </p>
                  </div>
                )}
                
                <div className="space-y-4">
                  <button
                    onClick={resetWheel}
                    className={`w-full bg-gradient-to-r ${
                      lastResult.type === 'nothing' 
                        ? 'from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700' 
                        : 'from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:to-red-600'
                    } text-white py-4 px-8 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl`}
                  >
                    {lastResult.type === 'nothing' ? '🚀 TRY AGAIN!' : '🎯 CONTINUE PLAYING'}
                  </button>
                  
                  {tickets > 0 && (
                    <button
                      onClick={() => {
                        resetWheel();
                        setTimeout(handleSpin, 500);
                      }}
                      className={`w-full bg-gradient-to-r ${
                        lastResult.type === 'nothing'
                          ? 'from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:to-red-600'
                          : 'from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600'
                      } text-white py-4 px-8 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl`}
                    >
                      {lastResult.type === 'nothing' 
                        ? `🍀 FEELING LUCKY! (${tickets} tickets left)`
                        : `🎰 SPIN AGAIN (${tickets} left)`
                      }
                    </button>
                  )}
                  
                  {lastResult.type === 'nothing' && (
                    <div className="text-center mt-2">
                      <p className="text-indigo-300 text-sm">
                        The odds are in your favor! Every spin brings you closer to winning!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rewards Display */}
        <div className="bg-gradient-to-br from-gray-900/90 via-purple-900/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-yellow-400/30 shadow-2xl shadow-yellow-500/25">
          <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6 text-center">
            🏆 PRIZE POOL 🏆
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mappedRewards.map((reward, index) => {
              const Icon = reward.icon;
              return (
                <div 
                  key={index} 
                  className={`relative bg-gradient-to-br ${reward.color} rounded-xl p-4 text-white text-center shadow-xl ${reward.glow} border-2 border-white/20 hover:scale-105 transition-transform`}
                  style={{
                    animation: `fadeIn 0.5s ease-out forwards`,
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
                  <div className="relative">
                    <Icon className="w-8 h-8 mx-auto mb-2 drop-shadow-lg" />
                    <p className="font-black text-sm tracking-wide drop-shadow-lg">{reward.label}</p>
                    {reward.value > 0 && (
                      <p className="text-xs opacity-90 font-bold mt-1">💰 {reward.value.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-gray-800/50 to-purple-800/50 backdrop-blur-xl rounded-2xl px-8 py-4 border border-purple-400/30">
            <div className="text-center">
              <p className="text-yellow-400 font-bold text-sm">TOTAL SPINS</p>
              <p className="text-white font-black text-2xl">{lastResult?.id ? lastResult.id.split('_')[1] : 0}</p>
            </div>
            <div className="w-px h-8 bg-purple-400/30"></div>
            <div className="text-center">
              <p className="text-green-400 font-bold text-sm">TICKETS LEFT</p>
              <p className="text-white font-black text-2xl">{tickets}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;