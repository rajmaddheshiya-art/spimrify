import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js";
import authRouter from "./routes/router.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/UserRoute.js";
dotenv.config()

const port = process.env.PORT || 5000;
const app = express()
app.use(cors({
    origin:["http://localhost:5173",  "http://192.168.43.163:5173",process.env.FRONTEND_URL],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(authRouter)
app.use(userRouter)
app.get("/ppt",(req,res)=>{
    res.status(200).json({messgae:"ipconfig"})
})
app.listen(port,'0.0.0.0',()=>{
    console.log(`Server is running on http://0.0.0.0:${port}`)
    connectDB()
})