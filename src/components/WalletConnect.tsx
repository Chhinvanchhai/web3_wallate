import { Wallet } from 'lucide-react';
import { truncateAddress } from '../utils/helpers';

interface WalletConnectProps {
  account: string | null;
  onConnect: () => void;
}

export default function WalletConnect({ account, onConnect }: WalletConnectProps) {
  return (
    <button
      onClick={onConnect}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      <Wallet className="w-5 h-5" />
      {account ? truncateAddress(account) : 'Connect Wallet'}
    </button>
  );
}