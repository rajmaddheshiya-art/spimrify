import React from 'react';
import { useSelector } from 'react-redux';

const TransactionHistory = () => {
  // Maa lijiye aapka user data store.auth.user ya store.user mein hai
  const { user, loading } = useSelector((state) => state.auth); 

  // Payment array nikalna (Agar user exist karta hai toh)
  // Reverse isliye kiya hai taaki latest transaction sabse upar dikhe
  const transactions = user?.payment ? [...user.payment].reverse() : [];

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'approved' || s === 'win') return 'text-green-300 font-bold';
    if (s === 'pending') return 'text-yellow-300 animate-pulse'; // Pending ko thoda highlight kiya
    if (s === 'rejected') return 'text-red-400';
    return 'text-white/70';
  };

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center select-none" 
         style={{ background: 'linear-gradient(180deg, #244b23 0%, #46ec13 100%)' }}>
      
      <div className="w-full max-w-md">
        {/* Wallet Section */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 mb-8 text-center text-white shadow-2xl relative overflow-hidden">
            {/* Background design element */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            
            <h2 className="text-xs uppercase tracking-[0.2em] opacity-60 font-medium">Wallet Balance</h2>
            <p className="text-5xl font-black mt-3 flex items-center justify-center gap-1">
                <span className="text-2xl opacity-80">₹</span>
                {user?.walletBalance?.toLocaleString('en-IN') || '0'}
            </p>
        </div>

        <div className="flex justify-between items-center mb-6 px-2">
            <h3 className="text-white font-bold text-lg tracking-tight">Activity Log</h3>
            <span className="bg-black/20 text-white/60 text-[10px] px-3 py-1 rounded-full border border-white/10">
                {transactions.length} Total
            </span>
        </div>

        {/* Transactions List */}
        <div className="space-y-3 pb-10">
          {transactions.length > 0 ? (
            transactions.map((txn) => (
              <div key={txn._id} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex justify-between items-center transition-all hover:scale-[1.02] active:scale-95 shadow-lg">
                <div className="flex items-center gap-4">
                  {/* Icon Logic */}
                  <div className={`p-3 rounded-2xl ${txn.type === 'withdrawal' ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                    {txn.type === 'withdrawal' ? (
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    ) : (
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    )}
                  </div>

                  <div>
                    <h4 className="text-white font-bold text-sm capitalize">{txn.type.replace('_', ' ')}</h4>
                    <p className="text-white/40 text-[10px] font-medium uppercase tracking-tighter">
                      {new Date(txn.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-md font-black ${txn.type === 'withdrawal' ? 'text-white' : 'text-green-300'}`}>
                    {txn.type === 'withdrawal' ? '-' : '+'}₹{txn.amount}
                  </p>
                  <p className={`text-[9px] uppercase font-bold tracking-widest ${getStatusColor(txn.status)}`}>
                    {txn.status}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white/5 border border-dashed border-white/20 rounded-3xl py-16 text-center text-white/30 italic">
                No history found in your account
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;