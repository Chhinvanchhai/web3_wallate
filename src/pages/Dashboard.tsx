import React from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { CreditCard } from 'lucide-react';

export default function Dashboard() {
  const { account, chainId, provider } = useWeb3();
  const [ensName, setEnsName] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function lookupENS() {
      if (provider && account) {
        try {
          const name = await provider.lookupAddress(account);
          setEnsName(name);
        } catch (error) {
          console.error('Error looking up ENS name:', error);
          setEnsName(null);
        }
      } else {
        setEnsName(null);
      }
    }
    lookupENS();
  }, [provider, account]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-indigo-600" />
          Wallet Overview
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Account</p>
            <p className="text-lg text-gray-800">
              {account ? (
                <>
                  {ensName && <div className="font-medium">{ensName}</div>}
                  <div className={ensName ? "text-sm text-gray-500" : ""}>
                    {account}
                  </div>
                </>
              ) : (
                'Not connected'
              )}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Network</p>
            <p className="text-lg text-gray-800">{chainId || 'Not connected'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
