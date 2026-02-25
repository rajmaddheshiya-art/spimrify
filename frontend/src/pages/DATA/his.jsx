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
      
      {/* Header: Arial Black font aur Center alignment */}
      <h1 className="mt-10 mb-16 tracking-wider uppercase" 
          style={{color:"white", textAlign:"center", fontFamily:"arial black", fontSize: "2rem"}}>
        History
      </h1>

      {/* Container with extra margin-top and horizontal spacing */}
      <div className="max-w-2xl mx-auto mt-10 px-4 space-y-4">
        {transactions.length > 0 ? (
          transactions.map((txn, i) => (
            <div 
              key={txn._id || i} 
              // Hover class: bg-white/20 aur cursor-pointer
              className="group flex justify-between items-center p-5 border border-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg"
            >
              {/* Left Side: Type and Date */}
              <div className="flex flex-col">
                <span className="text-white text-lg font-bold capitalize tracking-wide">
                  {txn.type?.replace('_', ' ')}
                </span>
                <span className="text-white/50 text-[11px] mt-1">
                  {txn.createdAt ? new Date(txn.createdAt).toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'}) : ''}
                </span>
              </div>

              {/* Right Side: Amount and Status */}
              <div className="text-right">
                <div className="text-white text-2xl font-black tracking-tight">
                  {txn.type === 'withdrawal' ? '-' : '+'}₹{txn.amount}
                </div>
                <div className={`text-[10px] mt-1 uppercase tracking-[0.2em] ${getStatusColor(txn.status)}`}>
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