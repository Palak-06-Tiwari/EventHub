const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// Create Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Utility Function to Send OTP Email
exports.sendOtpEmail = async (email, otp, type) => {
    try {
        const title = type === 'account_verification' 
            ? 'Verify your EventHub Account' 
            : 'EventHub Notification';

        const msg = type === 'account_verification'
            ? 'Please use the following OTP to verify your new EventHub account.'
            : 'Please use the following OTP to verify and confirm your event booking.';

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: title,
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; max-width: 500px; margin: 0 auto;">
                    <h2 style="color: #111;">${title}</h2>
                    <p style="color: #555; font-size: 16px;">${msg}</p>
                    <div style="margin: 20px auto; padding: 15px; font-size: 24px; font-weight: bold; color: #4CAF50; background-color: #f9f9f9; letter-spacing: 5px; width: fit-content; border: 1px dashed #4CAF50; border-radius: 4px;">
                        ${otp}
                    </div>
                    <p style="color: #999; font-size: 12px; margin-top: 20px;">If you didn't request this email, please ignore it.</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`OTP email sent successfully to ${email}`);
        return info;
    } catch (error) {
        console.error(`Error sending OTP email to ${email}:`, error);
        throw error;
    }
};  