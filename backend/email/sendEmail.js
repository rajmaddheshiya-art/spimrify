import nodemailer from "nodemailer";
export const sendOTPByEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            // 'smtp.gmail.com' ki jagah direct IPv4 address
            host: "74.125.200.108", 
            port: 587,
            secure: false, 
            auth: {
                user: process.env.EMAIL_AUTH,
                pass: process.env.EMAIL_PASS,
            },
            // Force IPv4
            family: 4,
            connectionTimeout: 20000, // Thoda extra time
            tls: {
                servername: "smtp.gmail.com", // Ye zaroori hai certificate verify karne ke liye
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_AUTH,
            to: email,
            subject: "Account Verification OTP",
            text: `Aapka OTP hai: ${otp}`,
            html: `<h1 style="color:white;text-align:center;background-color:green;">OTP: ${otp}</h1>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.log("Direct IP Email error:", error.message);
    }
};