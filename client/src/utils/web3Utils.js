import Web3 from 'web3';
import { PANCAKE_ROUTER_ABI, ERC20_ABI, CONTRACTS, BSC_CHAIN_ID, BSC_RPC_URL } from '../contracts/PancakeSwapABI';

export class Web3Service {
  constructor() {
    this.web3 = null;
    this.account = '';
  }

  async connectWallet() {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please connect your wallet.');
      }

      this.account = accounts[0];
      
      // Initialize Web3 instance
      this.web3 = new Web3(window.ethereum);

      // Get network info
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [this.account, 'latest'],
      });

      const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);

      return {
        connected: true,
        address: this.account,
        balance: balanceInEth.toFixed(4),
        network: this.getNetworkName(chainId),
        chainId
      };
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw new Error(error.message || 'Failed to connect wallet');
    }
  }

  async switchToBSC() {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BSC_CHAIN_ID }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: BSC_CHAIN_ID,
                chainName: 'Binance Smart Chain',
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'BNB',
                  decimals: 18,
                },
                rpcUrls: [BSC_RPC_URL],
                blockExplorerUrls: ['https://bscscan.com/'],
              },
            ],
          });
        } catch (addError) {
          console.error('Error adding BSC network:', addError);
          throw new Error('Failed to add BSC network to MetaMask');
        }
      } else {
        throw new Error('Failed to switch to BSC network');
      }
    }
  }

  async getTokenBalance(tokenAddress, userAddress) {
    if (!this.web3) throw new Error('Web3 not initialized');

    try {
      const contract = new this.web3.eth.Contract(ERC20_ABI, tokenAddress);
      const balance = await contract.methods.balanceOf(userAddress).call();
      const decimals = await contract.methods.decimals().call();
      
      // Convert balance based on token decimals
      if (parseInt(decimals) === 18) {
        return this.web3.utils.fromWei(balance.toString(), 'ether');
      } else if (parseInt(decimals) === 6) {
        return (parseInt(balance) / Math.pow(10, 6)).toString();
      } else {
        return (parseInt(balance) / Math.pow(10, parseInt(decimals))).toString();
      }
    } catch (error) {
      console.error('Error getting token balance:', error);
      return '0';
    }
  }

  async approveToken(tokenAddress, spenderAddress, amount) {
    if (!this.web3 || !this.account) {
      throw new Error('Web3 not initialized or wallet not connected');
    }

    try {
      const contract = new this.web3.eth.Contract(ERC20_ABI, tokenAddress);
      const decimals = await contract.methods.decimals().call();
      
      // Convert amount based on token decimals
      let amountInWei;
      if (parseInt(decimals) === 18) {
        amountInWei = this.web3.utils.toWei(amount, 'ether');
      } else if (parseInt(decimals) === 6) {
        amountInWei = (parseFloat(amount) * Math.pow(10, 6)).toString();
      } else {
        amountInWei = (parseFloat(amount) * Math.pow(10, parseInt(decimals))).toString();
      }

      const tx = await contract.methods.approve(spenderAddress, amountInWei).send({
        from: this.account,
        gas: 100000,
      });

      return tx.transactionHash;
    } catch (error) {
      console.error('Error approving token:', error);
      throw new Error(error.message || 'Failed to approve token');
    }
  }

  async getAmountsOut(amountIn, path) {
    if (!this.web3) throw new Error('Web3 not initialized');

    try {
      const contract = new this.web3.eth.Contract(PANCAKE_ROUTER_ABI, CONTRACTS.PANCAKE_ROUTER);
      const amountInWei = this.web3.utils.toWei(amountIn, 'ether');
      
      const amounts = await contract.methods.getAmountsOut(amountInWei, path).call();
      return amounts.map((amount) => this.web3.utils.fromWei(amount.toString(), 'ether'));
    } catch (error) {
      console.error('Error getting amounts out:', error);
      throw new Error('Failed to get swap amounts');
    }
  }

  async swapBNBForTokens(
    amountIn,
    amountOutMin,
    tokenAddress,
    slippageTolerance = 1
  ) {
    if (!this.web3 || !this.account) {
      throw new Error('Web3 not initialized or wallet not connected');
    }

    try {
      const contract = new this.web3.eth.Contract(PANCAKE_ROUTER_ABI, CONTRACTS.PANCAKE_ROUTER);
      const amountInWei = this.web3.utils.toWei(amountIn, 'ether');
      
      // Get token decimals for proper conversion
      const tokenContract = new this.web3.eth.Contract(ERC20_ABI, tokenAddress);
      const tokenDecimals = await tokenContract.methods.decimals().call();
      
      // Calculate minimum output with slippage
      const adjustedAmountOut = parseFloat(amountOutMin) * (1 - slippageTolerance / 100);
      
      // Convert amount based on token decimals
      let amountOutMinWei;
      if (parseInt(tokenDecimals) === 18) {
        amountOutMinWei = this.web3.utils.toWei(adjustedAmountOut.toString(), 'ether');
      } else if (parseInt(tokenDecimals) === 6) {
        // For USDT and similar tokens with 6 decimals
        amountOutMinWei = (adjustedAmountOut * Math.pow(10, 6)).toString();
      } else {
        amountOutMinWei = (adjustedAmountOut * Math.pow(10, parseInt(tokenDecimals))).toString();
      }
      
      const path = [CONTRACTS.WBNB, tokenAddress];
      const deadline = Math.floor(Date.now() / 1000) + (60 * 20); // 20 minutes from now

      const tx = await contract.methods.swapExactETHForTokens(
        amountOutMinWei,
        path,
        this.account,
        deadline.toString()
      ).send({
        from: this.account,
        value: amountInWei,
        gas: 300000,
      });

      return tx.transactionHash;
    } catch (error) {
      console.error('Error swapping BNB for tokens:', error);
      throw new Error(error.message || 'Failed to execute swap');
    }
  }

  async swapTokensForBNB(
    tokenAddress,
    amountIn,
    amountOutMin,
    slippageTolerance = 1
  ) {
    if (!this.web3 || !this.account) {
      throw new Error('Web3 not initialized or wallet not connected');
    }

    try {
      const contract = new this.web3.eth.Contract(PANCAKE_ROUTER_ABI, CONTRACTS.PANCAKE_ROUTER);
      
      // Get token decimals for proper conversion
      const tokenContract = new this.web3.eth.Contract(ERC20_ABI, tokenAddress);
      const tokenDecimals = await tokenContract.methods.decimals().call();
      
      // Convert input amount based on token decimals
      let amountInWei;
      if (parseInt(tokenDecimals) === 18) {
        amountInWei = this.web3.utils.toWei(amountIn, 'ether');
      } else if (parseInt(tokenDecimals) === 6) {
        // For USDT and similar tokens with 6 decimals
        amountInWei = (parseFloat(amountIn) * Math.pow(10, 6)).toString();
      } else {
        amountInWei = (parseFloat(amountIn) * Math.pow(10, parseInt(tokenDecimals))).toString();
      }
        
      // Calculate minimum output with slippage
      const adjustedAmountOut = parseFloat(amountOutMin) * (1 - slippageTolerance / 100);
      const amountOutMinWei = this.web3.utils.toWei(adjustedAmountOut.toString(), 'ether');
      
      const path = [tokenAddress, CONTRACTS.WBNB];
      const deadline = Math.floor(Date.now() / 1000) + (60 * 20); // 20 minutes from now

      const tx = await contract.methods.swapExactTokensForETH(
        amountInWei,
        amountOutMinWei,
        path,
        this.account,
        deadline.toString()
      ).send({
        from: this.account,
        gas: 300000,
      });

      return tx.transactionHash;
    } catch (error) {
      console.error('Error swapping tokens for BNB:', error);
      throw new Error(error.message || 'Failed to execute swap');
    }
  }

  async swapTokensForTokens(
    tokenInAddress,
    tokenOutAddress,
    amountIn,
    amountOutMin,
    slippageTolerance = 1
  ) {
    if (!this.web3 || !this.account) {
      throw new Error('Web3 not initialized or wallet not connected');
    }

    try {
      const contract = new this.web3.eth.Contract(PANCAKE_ROUTER_ABI, CONTRACTS.PANCAKE_ROUTER);
      
      // Get token decimals for proper conversion
      const tokenInContract = new this.web3.eth.Contract(ERC20_ABI, tokenInAddress);
      const tokenOutContract = new this.web3.eth.Contract(ERC20_ABI, tokenOutAddress);
      const tokenInDecimals = await tokenInContract.methods.decimals().call();
      const tokenOutDecimals = await tokenOutContract.methods.decimals().call();
      
      // Convert input amount based on token decimals
      let amountInWei;
      if (parseInt(tokenInDecimals) === 18) {
        amountInWei = this.web3.utils.toWei(amountIn, 'ether');
      } else if (parseInt(tokenInDecimals) === 6) {
        amountInWei = (parseFloat(amountIn) * Math.pow(10, 6)).toString();
      } else {
        amountInWei = (parseFloat(amountIn) * Math.pow(10, parseInt(tokenInDecimals))).toString();
      }
        
      // Calculate minimum output with slippage
      const adjustedAmountOut = parseFloat(amountOutMin) * (1 - slippageTolerance / 100);
      
      // Convert output amount based on token decimals
      let amountOutMinWei;
      if (parseInt(tokenOutDecimals) === 18) {
        amountOutMinWei = this.web3.utils.toWei(adjustedAmountOut.toString(), 'ether');
      } else if (parseInt(tokenOutDecimals) === 6) {
        amountOutMinWei = (adjustedAmountOut * Math.pow(10, 6)).toString();
      } else {
        amountOutMinWei = (adjustedAmountOut * Math.pow(10, parseInt(tokenOutDecimals))).toString();
      }
      
      const path = [tokenInAddress, tokenOutAddress];
      const deadline = Math.floor(Date.now() / 1000) + (60 * 20); // 20 minutes from now

      const tx = await contract.methods.swapExactTokensForTokens(
        amountInWei,
        amountOutMinWei,
        path,
        this.account,
        deadline.toString()
      ).send({
        from: this.account,
        gas: 300000,
      });

      return tx.transactionHash;
    } catch (error) {
      console.error('Error swapping tokens:', error);
      throw new Error(error.message || 'Failed to execute swap');
    }
  }

  getNetworkName(chainId) {
    switch (chainId) {
      case '0x1': return 'Ethereum';
      case '0x38': return 'BSC';
      case '0x89': return 'Polygon';
      case '0xa86a': return 'Avalanche';
      default: return 'Unknown';
    }
  }

  async addTokenToWallet(tokenAddress, tokenSymbol, tokenDecimals = 18) {
    if (!window.ethereum) {
      throw new Error('MetaMask not found');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
          },
        },
      });
    } catch (error) {
      console.error('Error adding token to wallet:', error);
      throw new Error('Failed to add token to wallet');
    }
  }
}

export const web3Service = new Web3Service();