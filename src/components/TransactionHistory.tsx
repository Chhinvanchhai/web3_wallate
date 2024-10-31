import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { truncateAddress } from '../utils/helpers';
import { Transaction } from '../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Transaction History
      </h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {transactions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No transactions yet</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {transactions.map((tx, index) => (
              <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">From: {truncateAddress(tx.sender)}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">To: {truncateAddress(tx.receiver)}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{tx.amount} ETH</span>
                    <span className="text-sm text-gray-500">
                      {new Date(tx.timestamp * 1000).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}