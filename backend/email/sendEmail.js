import nodemailer from "nodemailer";
export const sendOTPByEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            // Is host ko try karo, ye Google ka alternate server hai
            host: "smtp-relay.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_AUTH,
                pass: process.env.EMAIL_PASS,
            },
            // Force IPv4 isse connection timeout nahi hoga
            family: 4,
            tls: {
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