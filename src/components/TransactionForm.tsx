import React, { useState } from 'react';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import '../css/style.css';

interface TransactionFormProps {
  onSubmit: (to: string, amount: string) => Promise<void>;
  isLoading: boolean;
}

export default function TransactionForm({ onSubmit, isLoading }: TransactionFormProps) {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const loadingToast = toast.loading('Processing transaction...');
    
    try {
      await onSubmit(to, amount);
      
      toast.success('Transaction sent successfully!', {
        duration: 5000,
        icon: '🎉',
      });
      
      setTo('');
      setAmount('');
      
    } catch (error) {
      // toast.error(error.message || 'Transaction failed. Please try again.', {
      //   duration: 5000,
      // });
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      {/* Recipient Address Input */}
      <div className="space-y-2">
        <label 
          htmlFor="to" 
          className="block text-sm font-medium text-white mb-1"
        >
          Recipient Address
        </label>
        <div className="relative">
          <input
            type="text"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white text-sm rounded-lg 
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block
                     placeholder:text-gray-400 transition-all duration-200
                     hover:border-gray-600"
            placeholder="Enter wallet address (0x...)"
            required 
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Enter the full Ethereum wallet address of the recipient
        </p>
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <label 
          htmlFor="amount" 
          className="block text-sm font-medium text-white mb-1"
        >
          Amount (ETH)
        </label>
        <div className="relative">
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white text-sm rounded-lg
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block
                     placeholder:text-gray-400 transition-all duration-200
                     hover:border-gray-600"
            placeholder="0.0"
            step="0.0001"
            min="0"
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <span className="text-gray-400">ETH</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Minimum transaction amount is 0.0001 ETH
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 
                 bg-indigo-600 text-white rounded-lg font-medium
                 hover:bg-indigo-700 focus:outline-none focus:ring-2 
                 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-all duration-200 shadow-sm
                 hover:shadow-md active:transform active:scale-[0.99]"
      >
        <Send className="w-5 h-5" />
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </div>
        ) : (
          'Send Transaction'
        )}
      </button>

      {/* Transaction Tips */}
      <div className="mt-6 bg-gray-800/50 border border-gray-700 rounded-lg p-4">
        <h3 className="text-sm font-medium text-white mb-2">Transaction Tips</h3>
        <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
          <li>Double-check the recipient address before sending</li>
          <li>Make sure you have enough ETH to cover gas fees</li>
          <li>Transaction may take a few minutes to process</li>
        </ul>
      </div>
    </form>
  );
}