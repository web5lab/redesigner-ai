import { useState, useEffect } from 'react';

export const useReferralCode = () => {
  const [referralCode, setReferralCode] = useState(null);

  useEffect(() => {
    // Check URL parameters for referral code
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
    if (refCode) {
      // Store referral code in localStorage
      localStorage.setItem('pendingReferralCode', refCode.toUpperCase());
      setReferralCode(refCode.toUpperCase());
      
      // Clean URL without refreshing the page
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      
      console.log('Referral code captured:', refCode.toUpperCase());
    } else {
      // Check if there's a stored referral code
      const storedCode = localStorage.getItem('pendingReferralCode');
      if (storedCode) {
        setReferralCode(storedCode);
      }
    }
  }, []);

  const clearReferralCode = () => {
    localStorage.removeItem('pendingReferralCode');
    setReferralCode(null);
  };

  const getPendingReferralCode = () => {
    return localStorage.getItem('pendingReferralCode');
  };

  return {
    referralCode,
    clearReferralCode,
    getPendingReferralCode
  };
};