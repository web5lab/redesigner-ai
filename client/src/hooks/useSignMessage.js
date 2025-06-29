import { useSignMessage as useWagmiSignMessage } from 'wagmi';
import { useCallback } from 'react';

export const useSignMessage = () => {
  const { signMessageAsync, isPending, error } = useWagmiSignMessage();

  const signAuthMessage = useCallback(async (walletAddress) => {
    if (!walletAddress) {
      throw new Error('Wallet address is required');
    }

    try {
      const timestamp = Date.now();
      const message = `Welcome to XXX Gaming Hub!

Please sign this message to authenticate your wallet.

Wallet: ${walletAddress}
Timestamp: ${timestamp}

This request will not trigger a blockchain transaction or cost any gas fees.`;

      const signature = await signMessageAsync({ message });

      return {
        message,
        signature,
        timestamp,
        walletAddress
      };
    } catch (error) {
      console.error('Error signing message:', error);
      
      // Handle user rejection
      if (error.name === 'UserRejectedRequestError' || 
          error.message?.includes('rejected') || 
          error.message?.includes('denied') ||
          error.code === 4001) {
        throw new Error('Signature request was rejected by user');
      }
      
      // Handle other errors
      throw new Error('Failed to sign authentication message');
    }
  }, [signMessageAsync]);

  return {
    signAuthMessage,
    isPending,
    error
  };
};