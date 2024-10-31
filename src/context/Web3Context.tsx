import { createContext, useContext, ReactNode } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../hooks/useWeb3';

// Define the context type
interface Web3ContextType {
  account: string | null;
  chainId: string | null;
  provider: ethers.BrowserProvider | null;
  connectWallet: () => Promise<void>;
  switchNetwork: (networkName: string) => Promise<void>;
  isConnected: boolean;
}

// Create context with a default value
const Web3Context = createContext<Web3ContextType | null>(null);

// Provider props type
interface Web3ProviderProps {
  children: ReactNode;
}

// Provider component
export function Web3Provider({ children }: Web3ProviderProps) {
  const web3 = useWeb3(); // Use the hook once

  return (
    <Web3Context.Provider value={web3}>
      {children}
    </Web3Context.Provider>
  );
}

// Custom hook to use the web3 context
export function useWeb3Context() {
  const context = useContext(Web3Context);
  if (context === null) {
    throw new Error('useWeb3Context must be used within a Web3Provider');
  }
  return context;
}
