import React from "react";
import four from "../../assets/four.png"
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.jpeg"
function Bet3(){
    let nav = useNavigate()
    let {userData} = useSelector(state=>state.user)

    const totalAmount = userData?.payment?.reduce((first, second)=>{
        return first + (second.amount || 0)
    },0)

    return(
        <div className="divBet">
                   <div id="money">
                      <div className="mainMoney">
                        <h1 id="caseAdd" onClick={()=>{nav('/wallet')}}>₹ {totalAmount}</h1>
                      </div>
                     </div>
            
            
            <div className="walletHeader">
                <img src={userData?.profileImage || logo} className="walletLogo" id="home_logo"/>
                <h1 id="textBet">Guess the Number</h1>
            </div>

            



            <div className="divLogoBet">
                <img src={four} className="logoBet"/>
            </div>

            <div className="bet">
                <button className="price">Free</button>
                <button className="price">₹ 5</button>
                <button className="price">₹ 10</button><br />
                <button className="price">₹ 20</button>
                <button className="price">₹ 50</button>
                <button className="price">₹ 100</button><br />
                <button className="price">₹ 500</button>
                <button className="price">₹ 1000</button> 
            </div>

            <div className="dis">
                <h1 id="title">Dimag Lagao, Paisa Kamao! 🚀</h1>
                <p id="discription">Simple game, bada profit! Bas sahi number pehchaniye aur jeetiye dheron cash prizes. Kya aap agle Big Winner hain? Abhi Bet lagayein aur khelna shuru karein!</p>
            </div>

            <div className="playButton">
                <button className="Play" onClick={()=>{nav('/game')}}>Play</button> 

            </div>

        </div>
    )
}

export default Bet3