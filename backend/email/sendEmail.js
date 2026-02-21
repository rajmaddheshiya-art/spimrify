import nodemailer from "nodemailer";

export const sendOTPByEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            // Gmail ka primary SMTP server
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Port 465 ke liye true
            auth: {
                user: process.env.EMAIL_AUTH,
                pass: process.env.EMAIL_PASS, // Jo aaj banaya wo App Password
            },
            // Force IPv4 - Ye Render ke 'ENETUNREACH' error ko khatam karega
            family: 4 
        });

        const mailOptions = {
            from: `"Spimrify" <${process.env.EMAIL_AUTH}>`,
            to: email,
            subject: "Account Verification OTP",
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center;">
                    <h2>Aapka OTP Code</h2>
                    <h1 style="color: #2ecc71;">${otp}</h1>
                    <p>Ye code sirf 10 minutes ke liye valid hai.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Mubarak ho! Email sent successfully!");
    } catch (error) {
        // Agar abhi bhi error aaye, toh logs mein ye detail dikhayega
        console.log("Nodemailer Debug Error:", error.message);
    }
};