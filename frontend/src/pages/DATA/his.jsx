import React from 'react';
import { useSelector } from 'react-redux';

const TransactionHistory = () => {
  // Safe extraction to prevent destructuring error
  const auth = useSelector((state) => state.auth) || {};
  const user = auth.user || null;
  
  // Payment data with safe fallback
  const transactions = user?.payment ? [...user.payment].reverse() : [];

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'approved' || s === 'win') return 'text-green-300';
    if (s === 'pending') return 'text-yellow-300';
    if (s === 'rejected') return 'text-red-400';
    return 'text-white/60';
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center" 
         style={{ background: 'linear-gradient(180deg, #244b23 0%, #46ec13 100%)' }}>
      
      <div className="w-full max-w-md">
        {/* Balance Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-8 mb-8 text-center text-white shadow-2xl">
          <h2 className="text-xs uppercase tracking-[0.2em] opacity-60">Wallet Balance</h2>
          <p className="text-5xl font-black mt-2">
            ₹{user?.walletBalance?.toLocaleString('en-IN') || '0'}
          </p>
        </div>

        <h3 className="text-white font-bold mb-4 px-2">Recent Transactions</h3>

        {/* List */}
        <div className="space-y-3">
          {transactions.length > 0 ? (
            transactions.map((txn, i) => (
              <div key={txn._id || i} className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${txn.type === 'withdrawal' ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                    {txn.type === 'withdrawal' ? (
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    ) : (
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm capitalize">{txn.type?.replace('_', ' ')}</h4>
                    <p className="text-white/40 text-[10px]">
                      {txn.createdAt ? new Date(txn.createdAt).toLocaleDateString('en-IN') : 'Recent'}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-md font-black ${txn.type === 'withdrawal' ? 'text-white' : 'text-green-300'}`}>
                    {txn.type === 'withdrawal' ? '-' : '+'}₹{txn.amount}
                  </p>
                  <p className={`text-[9px] uppercase font-black tracking-widest ${getStatusColor(txn.status)}`}>
                    {txn.status || 'Pending'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-white/30 italic bg-black/5 rounded-3xl border border-dashed border-white/10">
              No transaction history found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;