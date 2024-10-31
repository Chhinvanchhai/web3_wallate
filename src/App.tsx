import React from 'react';
import { useWeb3 } from './hooks/useWeb3';
import { Wallet, Link } from 'lucide-react';

function App() {
  const { account, chainId, connectWallet, switchNetwork, isConnected } = useWeb3();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Wallet className="w-8 h-8" />
            Web3 Smart Contract
          </h1>
          <button
            onClick={isConnected ? () => switchNetwork('sepolia') : connectWallet}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <Link className="w-4 h-4" />
            {isConnected ? 'Switch Network' : 'Connect Wallet'}
          </button>
        </header>

        <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
          <div className="grid gap-4">
            <div className="border border-gray-700 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Wallet Status</h2>
              <p className="text-gray-300">
                Account: {account || 'Not connected'}
              </p>
              <p className="text-gray-300">
                Chain ID: {chainId || 'Not connected'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;