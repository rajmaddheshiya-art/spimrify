import User from "../userSchema/userSchema.js"

 export const otp_verified = async(req, res)=>{
    try {
        const {email,otp}=req.body
        const existEmail = await User.findOne({email})
        if(!existEmail){
            return res.status(400).json({message:"Email not exist"})
        }
        if(String(existEmail.otp).trim() !== String(otp).trim()){
            return res.status(400).json({message:"Incorrect OTP"})
        }
        existEmail.isVerified = true;
        existEmail.otp = null;
        await existEmail.save()
        
        return res.status(200).json({
            message:"Account verify",
            isVerified: true,
            userName: existEmail.userName,
            email: existEmail.email,
            role: existEmail.role
        })
    } catch (error) {
        return res.status(500).json({message:"Account verify Error",error})
        
    }
} 