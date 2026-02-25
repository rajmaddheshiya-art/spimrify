import React from 'react';
import { useSelector } from 'react-redux';

const TransactionHistory = () => {
  // Aapke slice ka naam "user" hai, aur data "userData" mein hai
  const { userData, loading } = useSelector((state) => state.user) || {};
  
  // Safe extraction: userData ke andar "payment" array hai
  const transactions = userData?.payment ? [...userData.payment].reverse() : [];

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'approved' || s === 'win') return 'text-green-300 font-bold';
    if (s === 'pending') return 'text-yellow-300 animate-pulse';
    if (s === 'rejected') return 'text-red-400';
    return 'text-white/60';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white" style={{ background: '#244b23' }}>
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-t-green-400 border-white/20 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="opacity-70 tracking-widest text-xs uppercase">Fetching History...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center" 
         style={{ background: 'linear-gradient(180deg, #244b23 0%, #46ec13 100%)' }}>
      
      <div className="w-full max-w-md">
        {/* Wallet Balance */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 mb-8 text-center text-white shadow-2xl">
          <h2 className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-semibold">Current Balance</h2>
          <p className="text-5xl font-black mt-3">
            ₹{userData?.walletBalance?.toLocaleString('en-IN') || '0'}
          </p>
        </div>

        <div className="flex justify-between items-center mb-6 px-2">
            <h3 className="text-white font-bold text-lg">Transactions</h3>
            <span className="text-white/40 text-xs font-medium bg-black/20 px-3 py-1 rounded-full border border-white/5">
                {transactions.length} items
            </span>
        </div>

        {/* History List */}
        <div className="space-y-3 pb-10">
          {transactions.length > 0 ? (
            transactions.map((txn, i) => (
              <div key={txn._id || i} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex justify-between items-center transition-transform active:scale-95 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${txn.type === 'withdrawal' ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                    {txn.type === 'withdrawal' ? (
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    ) : (
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm capitalize">{txn.type?.replace('_', ' ')}</h4>
                    <p className="text-white/40 text-[10px] font-medium uppercase tracking-tighter">
                      {txn.createdAt ? new Date(txn.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'Processing'}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-md font-black ${txn.type === 'withdrawal' ? 'text-white' : 'text-green-300'}`}>
                    {txn.type === 'withdrawal' ? '-' : '+'}₹{txn.amount}
                  </p>
                  <p className={`text-[9px] uppercase font-bold tracking-widest ${getStatusColor(txn.status)}`}>
                    {txn.status || 'Pending'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white/5 border border-dashed border-white/10 rounded-[2rem] py-16 text-center text-white/30 italic">
                Aapki koi transaction history nahi hai
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;