import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import Start from "./pages/Start";
import Signup from "./pages/Signup";
import Otp from "./pages/Otp";
import Login from "./pages/Login";
import Home from "./pages/DATA/Home";
import Profile from "./pages/DATA/profile";
import useGetCurrentUserData from "./pages/getCurrentUserData";
import { useDispatch, useSelector } from "react-redux";
import NumberGame from "./pages/DATA/Game";
import Admin from "./pages/admin/admin";
import usegetOtherUserData from "./pages/getOtherUserData";
import Wallet from "./pages/DATA/wallet";
import Bet from "./pages/DATA/Bet";
import Bet2 from "./pages/DATA/Bet2";
import Bet3 from "./pages/DATA/Bet3";
import Withdrawal from "./pages/DATA/Withdra";

function App() {
    const dispatch = useDispatch()
    const { userData, loading: reduxLoading } = useSelector(state => state.user);
    const [isChecking, setIsChecking] = useState(true); // Local check

    useGetCurrentUserData();
    usegetOtherUserData();

    // 1. Ek baar check karo ki Redux mein data aaya ya nahi
    useEffect(() => {
        // Agar loading false hui aur userData update hua ya fail hua
        if (!reduxLoading) {
            setIsChecking(false);
        }
    }, [reduxLoading, userData]);

    // 2. Refresh Guard: Jab tak API confirm nahi karti, kuch mat dikhao
    if (isChecking) {
        return (
            <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#000", color: "#fff" }}>
                <h2>Authenticating...</h2> 
            </div>
        );
    }

    const isVerified = userData?.isVerified === true;
    const isAdmin = userData?.role === 'admin';

    return (
        <Routes>
            <Route path="/" element={<Start />} />

            {/* Auth Routes */}
            <Route path="/signup" element={!userData ? <Signup /> : (isVerified ? <Navigate to="/home" /> : <Navigate to="/otp" />)} />
            <Route path="/login" element={!userData ? <Login /> : (isVerified ? <Navigate to="/home" /> : <Navigate to="/otp" />)} />

            {/* Admin Route: Ab ye refresh par kahin nahi jayega */}
            <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/home" />} />

            {/* Home & Other Routes */}
            <Route path="/home" element={isVerified ? <Home /> : <Navigate to="/otp" />} />
            <Route path="/otp" element={userData ? (isVerified ? (isAdmin ? <Navigate to="/admin" /> : <Navigate to="/home" />) : <Otp />) : <Navigate to="/login" />} />
            
            <Route path="/profile" element={isVerified ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/wallet" element={isVerified ? <Wallet /> : <Navigate to="/otp" />} />
            <Route path="/game" element={isVerified ? <NumberGame /> : <Navigate to="/otp" />} />
            <Route path="/Bet" element={isVerified ? <Bet /> : <Navigate to="/otp" />} />
            <Route path="/withdra" element={isVerified ? <Withdrawal /> : <Navigate to="/otp" />} />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
export default App