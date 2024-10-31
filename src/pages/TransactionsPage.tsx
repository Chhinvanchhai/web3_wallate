import { useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { Activity, ArrowUpDown } from 'lucide-react';
import { Transaction } from '../types';
import TransactionHistory from '../components/TransactionHistory';
import TransactionForm from '../components/TransactionForm';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';

export default function TransactionsPage() {
  const { account, provider, isConnected } = useWeb3();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTransaction = async (to: string, amount: string) => {
    if (!provider || !account) return;
    
    try {
      setIsLoading(true);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to,
        value: ethers.parseEther(amount)
      });
      
      await tx.wait();
      
      // Add to transactions list
      const newTx: Transaction = {
        sender: account,
        receiver: to,
        amount,
        timestamp: Math.floor(Date.now() / 1000)
      };
      
      setTransactions(prev => [newTx, ...prev]);
    } catch (error) {
      console.error('Transaction failed:', error);
      toast.error('Transaction failed');
      throw "Transaction failed";
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Transaction Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <ArrowUpDown className="w-6 h-6 text-indigo-600" />
            Send Transaction
          </h2>
          {isConnected ? (
            <TransactionForm onSubmit={handleTransaction} isLoading={isLoading} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              Please connect your wallet to make transactions
            </div>
          )}
        </div>

        {/* Transaction History Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-indigo-600" />
            Transaction History
          </h2>
          <TransactionHistory transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
