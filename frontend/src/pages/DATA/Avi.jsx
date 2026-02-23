import React, { useState, useEffect, useRef, useContext } from 'react'; // useContext add kiya
import { useLocation, useNavigate } from 'react-router'; // Location aur Nav add kiya
import { dataContext } from '../userContext.'; // Context import
import { useDispatch, useSelector } from 'react-redux'; // Redux
import { setUserData } from '../../../redux/userSlice'; // Redux action
import axios from 'axios';

const AviatorGame = () => {
  // --- Payment & Navigation Logic Start ---
  const location = useLocation();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { serverURL } = useContext(dataContext);
  const { userData } = useSelector(state => state.user);
  
  // Jo amount Bet2.jsx se aaya hai, wahi use karein
  const initialBet = location.state?.amount || 0; 
  // --- Payment & Navigation Logic End ---

  const [multiplier, setMultiplier] = useState(1.00);
  const [isFlying, setIsFlying] = useState(false);
  const [bet, setBet] = useState(initialBet); // Default bet set from Bet2
  const [history, setHistory] = useState(['2.50', '1.10', '8.40', '1.05', '3.20']);
  
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const crashPoint = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        if (isFlying) draw(multiplier);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [isFlying, multiplier]);

  const draw = (val) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff007f';
    ctx.strokeStyle = '#ff007f';
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(0, h);
    const x = (val / 5) * w; 
    const y = h - (val / 5) * (h - 50);
    ctx.quadraticCurveTo(x / 1.8, h, x, y);
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.font = "24px Arial"; 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-Math.PI / 8); 
    ctx.fillText("✈️", 0, 0);
    ctx.restore();
  };

  const startFlight = async () => { // async banaya for API
    if (isFlying) return;
    
    // 1. Pehle Check karein balance hai ya nahi
    if (bet > 0 && userData?.walletBalance < bet) {
      alert("Balance kam hai!");
      return nav('/Bet2');
    }

    // 2. Paisa kaatne ka API Call
    try {
        if (bet > 0) {
            const res = await axios.post(`${serverURL}/lose`, 
                { amount: bet }, 
                { withCredentials: true }
            );
            if (res.data.success) {
                dispatch(setUserData(res.data.userData));
            }
        }
    } catch (err) {
        console.error("Deduction failed", err);
        return alert("Server Error! Bet nahi lag saki.");
    }

    setIsFlying(true);
    setMultiplier(1.00);
    crashPoint.current = (Math.random() * 3.9 + 1.1).toFixed(2);
    
    const animate = () => {
      setMultiplier((prev) => {
        const next = prev + 0.01;
        if (next >= crashPoint.current) {
          cancelAnimationFrame(requestRef.current);
          setIsFlying(false);
          setHistory(h => [next.toFixed(2), ...h.slice(0, 7)]);
          return next;
        }
        draw(next);
        requestRef.current = requestAnimationFrame(animate);
        return next;
      });
    };
    requestRef.current = requestAnimationFrame(animate);
  };

  const cashOut = async () => { // async banaya for API
    if (!isFlying) return;
    cancelAnimationFrame(requestRef.current);
    setIsFlying(false);

    // 3. Jeetne par Wallet Update API Call
    try {
        const winAmount = bet * multiplier;
        const res = await axios.post(`${serverURL}/win`, 
            { amount: winAmount }, 
            { withCredentials: true }
        );
        if (res.data.success) {
            dispatch(setUserData(res.data.userData));
            alert(`Jackpot! Aapne ₹${winAmount.toFixed(2)} Cash out kiye! 143!`);
        }
    } catch (err) {
        console.error("Winning update failed", err);
    }
  };

  return (
    <>
      <style>{`
        .aviator-body {
          background-color: #0b0e11;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
          padding: 10px;
          font-family: sans-serif;
          box-sizing: border-box;
          overflow: hidden;
        }
        .header-title {
          color: #ffeb3b; 
          margin: 5px 0; 
          font-size: 1.2rem;
          text-align: center;
        }
        .history-row {
          display: flex;
          gap: 6px;
          margin-bottom: 10px;
          overflow-x: auto;
          width: 100%;
          max-width: 600px;
          padding-bottom: 5px;
          scrollbar-width: none;
        }
        .history-row::-webkit-scrollbar { display: none; }
        .history-tag {
          padding: 4px 10px;
          border-radius: 15px;
          font-size: 11px;
          background: #1c1f24;
          border: 1px solid rgba(255,255,255,0.1);
          white-space: nowrap;
        }
        .high { color: #bb86fc; border-color: #bb86fc; }
        .low { color: #03dac6; border-color: #03dac6; }

        .game-area {
          position: relative;
          width: 100%;
          max-width: 600px;
          height: 35vh;
          background: #141518;
          border-radius: 15px;
          border: 1px solid #2b2d31;
          overflow: hidden;
          flex-shrink: 0;
        }
        .multiplier-val {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(35px, 12vw, 65px);
          font-weight: 900;
          z-index: 10;
          pointer-events: none;
        }
        .scaling { color: white; animation: pulse 0.1s infinite alternate; }
        .crashed-val { color: #ff1f44; text-align: center; }
        @keyframes pulse { 
          from { transform: translate(-50%, -50%) scale(1); } 
          to { transform: translate(-50%, -50%) scale(1.05); } 
        }

        .bet-box {
          margin-top: 15px;
          width: 100%;
          max-width: 400px;
          background: #1b1d21;
          padding: 15px;
          border-radius: 20px;
          box-sizing: border-box;
          flex-shrink: 0;
        }
        .input-row {
          display: flex;
          background: #000;
          border-radius: 50px;
          padding: 5px;
          margin-bottom: 12px;
          align-items: center;
        }
        .input-row button {
          background: none; border: none; color: white;
          font-size: 20px; width: 45px; cursor: pointer;
        }
        .input-row input {
          background: none; border: none; color: white;
          text-align: center; font-size: 18px; font-weight: bold; width: 100%;
          outline: none;
        }
        .action-btn {
          width: 100%; border: none; border-radius: 15px; padding: 12px;
          font-size: 18px; font-weight: 900; cursor: pointer;
          transition: 0.3s;
        }
        .btn-bet { background: #28a745; color: white; }
        .btn-cash { background: #ffc107; color: black; }
        .cash-val { font-size: 12px; display: block; margin-top: 2px; }

        @media (min-width: 600px) {
          .game-area { height: 50vh; }
          .header-title { font-size: 1.5rem; }
        }
      `}</style>

      <div className="aviator-body">
        {/* Wallet Balance Display */}
        <div style={{position: 'absolute', top: '10px', right: '10px', background: '#28a745', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold'}}>
             ₹ {userData?.walletBalance || 0}
        </div>

        <h3 className="header-title">AVIATOR HOLI SPECIAL ✈️</h3>

        <div className="history-row">
          {history.map((h, i) => (
            <span key={i} className={`history-tag ${parseFloat(h) > 2 ? 'high' : 'low'}`}>
              {h}x
            </span>
          ))}
        </div>

        <div className="game-area">
          <div className={`multiplier-val ${isFlying ? 'scaling' : 'crashed-val'}`}>
            {multiplier.toFixed(2)}x
            {!isFlying && multiplier > 1 && <span style={{fontSize: '0.3em', display: 'block'}}>FLEW AWAY!</span>}
          </div>
          <canvas ref={canvasRef} style={{display: 'block'}} />
        </div>

        <div className="bet-box">
          <div className="input-row">
            <button onClick={() => setBet(Math.max(0, bet - 50))}>-</button>
            <input type="number" value={bet} readOnly />
            <button onClick={() => setBet(bet + 50)}>+</button>
          </div>

          {!isFlying ? (
            <button className="action-btn btn-bet" onClick={startFlight}>Place Bet</button>
          ) : (
            <button className="action-btn btn-cash" onClick={cashOut}>
              Cash Out <span className="cash-val">₹{(bet * multiplier).toFixed(2)}</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AviatorGame;