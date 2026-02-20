import User from "../userSchema/userSchema.js"

export const getCurrentUser = async(req,res)=>{
    try {
        let userId = req.userId
        if(!userId){
            return res.status(400).json({message:"Invailid token"})
        }
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:"User not found "})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}

