import nodemailer from "nodemailer";
export const sendOTPByEmail = async (email, otp) => {
    try {

       const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.EMAIL_AUTH,
        pass: process.env.EMAIL_PASS,
    },
    // YE VALI SETTING ZAROORI HAI IPv6 ERROR KE LIYE
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
    dnsTimeout: 10000,
    // Forced IPv4
    family: 4, 
    tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2"
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


