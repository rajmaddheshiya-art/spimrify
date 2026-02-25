import React from 'react';
import { useSelector } from 'react-redux';

const TransactionHistory = () => {
  const { userData, loading } = useSelector((state) => state.user) || {};
  const transactions = userData?.payment ? [...userData.payment].reverse() : [];

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'approved' || s === 'win') return 'text-white font-bold';
    if (s === 'pending') return 'text-white/60 italic';
    if (s === 'rejected') return 'text-red-200';
    return 'text-white';
  };

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen p-6" 
         style={{ background: 'linear-gradient(180deg, #244b23 0%, #46ec13 100%)' }}>
      
      {/* Header: Center mein History */}
      <h1 className="text-white text-3xl font-bold text-center mb-10 tracking-wider uppercase">
        History
      </h1>

      <div className="max-w-2xl mx-auto space-y-2">
        {transactions.length > 0 ? (
          transactions.map((txn, i) => (
            <div 
              key={txn._id || i} 
              className="group flex justify-between items-center p-4 border-b border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              {/* Left Side: Type and Date */}
              <div className="flex flex-col">
                <span className="text-white text-lg font-medium capitalize tracking-wide group-hover:translate-x-1 transition-transform">
                  {txn.type?.replace('_', ' ')}
                </span>
                <span className="text-white/50 text-xs">
                  {txn.createdAt ? new Date(txn.createdAt).toLocaleDateString('en-IN') : ''}
                </span>
              </div>

              {/* Right Side: Amount and Status */}
              <div className="text-right">
                <div className="text-white text-xl font-bold tracking-tight">
                  {txn.type === 'withdrawal' ? '-' : '+'}₹{txn.amount}
                </div>
                <div className={`text-[10px] uppercase tracking-[0.1em] ${getStatusColor(txn.status)}`}>
                  {txn.status || 'Pending'}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white/50 text-center mt-20 italic">No transactions found in history</p>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;