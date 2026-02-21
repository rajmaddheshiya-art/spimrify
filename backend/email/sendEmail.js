import nodemailer from "nodemailer";
export const sendOTPByEmail = async (email, otp) => {
    try {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // 587 ke liye false hi rahega
            auth: {
                user: process.env.EMAIL_AUTH,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false // Ye connection ko block hone se rokta hai
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_AUTH,
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


