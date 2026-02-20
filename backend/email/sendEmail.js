import nodemailer from "nodemailer"; 
export const sendOTPByEmail = async (email, otp) => { 
    try {
        
        const transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: process.env.EMAIL_AUTH, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        
        const mailOptions = {
            from:process.env.EMAIL_AUTH,
            to: email, 
            subject: "Account Verification OTP", 
            text: `Aapka OTP hai: ${otp}`, 
            html: `<h1 style="color:white;text-align:center;background-color:green;margin-top:9%;">OTP: ${otp}</h1>`, 
        };

        await transporter.sendMail(mailOptions); 
        console.log("Email sent!"); 
    } catch (error) {
        console.log("Email error:", error); 
    }
};


 