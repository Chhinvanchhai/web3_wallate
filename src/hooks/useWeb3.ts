import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import { SUPPORTED_NETWORKS } from '../config/constants';

export function useWeb3() {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  const connectWallet = useCallback(async () => {
    try {
      if (!window.ethereum) {
        toast.error('Please install MetaMask to use this app');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const network = await provider.getNetwork();
      
      setProvider(provider);
      setAccount(accounts[0]);
      setChainId('0x' + network.chainId.toString(16));
      
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    }
  }, []);

  const switchNetwork = useCallback(async (networkName: keyof typeof SUPPORTED_NETWORKS) => {
    try {
      if (!window.ethereum) {
        toast.error('Please install MetaMask to use this app');
        return;
      }

      const network = SUPPORTED_NETWORKS[networkName];
      
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: network.chainId }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [network],
          });
        } else {
          throw switchError;
        }
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const newNetwork = await provider.getNetwork();
      setChainId('0x' + newNetwork.chainId.toString(16));
      setProvider(provider);
      
      toast.success(`Switched to ${network.chainName}`);
    } catch (error) {
      console.error('Error switching network:', error);
      toast.error('Failed to switch network');
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });

      window.ethereum.on('chainChanged', (newChainId: string) => {
        setChainId(newChainId);
      });

      return () => {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      };
    }
  }, []);

  return {
    account,
    chainId,
    provider,
    connectWallet,
    switchNetwork,
    isConnected: !!account,
  };
}