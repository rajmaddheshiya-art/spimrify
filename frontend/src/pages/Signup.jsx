import React, { useContext, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import { dataContext } from "./userContext.";
function Signup(){
    let [userName,setUserName]=useState()
    let [email,setEmail]=useState()
    let [password,setPassword]=useState()
    let [loading,setLoading]=useState(false)
    let [err, setErr] = useState()
    let {serverURL} = useContext(dataContext)
    let nav = useNavigate()
    let dispatch = useDispatch() 
    const signup_api = async(e)=>{
        e.preventDefault()
        setLoading(true)
        setErr("")
        try {
            let data = await axios.post(serverURL+"/signup",
                {
                    userName,
                    email,
                    password

                },{withCredentials:true})
            localStorage.setItem("userEmail", email)

                dispatch(setUserData(data.data))
                setLoading(false)
                nav("/otp",{state:{email:email}})
        } catch (error) {
            console.log(error)
            setErr(error.response.data.message|| "Something went wrong")
            setLoading(false)
        }
    }
    return(
        <div className="Xmain_div">

            <div id="text_signup">
            <h1 id="text">Join the Battle</h1> 
            </div>

        <div className="signup_div">
            <form id="Signup_form" onSubmit={signup_api}>
                <input type="text" placeholder="Name" className="Signup_input" onChange={(e)=>{setUserName(e.target.value)}}/><br/>
                <input type="email" placeholder="Email"className="Signup_input" onChange={(e)=>{setEmail(e.target.value)}}/><br/>
                <input type="password" placeholder="Password"className="Signup_input" onChange={(e)=>{setPassword(e.target.value)}}/><br/>
                {<p id="error">{err}</p>}
                <button id="signup_button" disabled={loading}>{loading?"Loading...":"Signup"}</button>
                <p id="signup_last"onClick={()=>{nav("/login")}}>I already have an account ? <span>Login</span></p>
            </form>
        </div>
        </div>
    )
}
export default Signup