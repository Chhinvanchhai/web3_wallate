import React from 'react';
import { Network } from 'lucide-react';
import { SUPPORTED_NETWORKS } from '../config/constants';

interface NetworkSelectorProps {
  currentChainId: string | null;
  onSwitch: (network: keyof typeof SUPPORTED_NETWORKS) => Promise<void>;
}

export default function NetworkSelector({ currentChainId, onSwitch }: NetworkSelectorProps) {
  const getCurrentNetwork = () => {
    return Object.entries(SUPPORTED_NETWORKS).find(
      ([, network]) => network.chainId === currentChainId
    )?.[1]?.chainName || 'Unknown Network';
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Network className="w-5 h-5" />
        <span>{getCurrentNetwork()}</span>
      </button>
      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1" role="menu">
          {Object.entries(SUPPORTED_NETWORKS).map(([name, network]) => (
            <button
              key={name}
              onClick={() => onSwitch(name as keyof typeof SUPPORTED_NETWORKS)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {network.chainName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}