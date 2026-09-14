const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// ==============================
// CREATE EMAIL TRANSPORTER
// ==============================

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// ==============================
// SEND OTP EMAIL
// ==============================

exports.sendOtpEmail = async (email, otp, type) => {

    try {

        const title =
            type === 'account_verification'
                ? 'Verify your EventHub Account'
                : 'EventHub Booking Verification';

        const msg =
            type === 'account_verification'
                ? 'Please use the following OTP to verify your new EventHub account.'
                : 'Please use the following OTP to verify and confirm your event booking.';

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: title,

            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 20px;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    max-width: 500px;
                    margin: 0 auto;
                ">

                    <h2 style="color: #111;">
                        ${title}
                    </h2>

                    <p style="color: #555; font-size: 16px;">
                        ${msg}
                    </p>

                    <div style="
                        margin: 20px auto;
                        padding: 15px;
                        font-size: 24px;
                        font-weight: bold;
                        color: #4CAF50;
                        background-color: #f9f9f9;
                        letter-spacing: 5px;
                        width: fit-content;
                        border: 1px dashed #4CAF50;
                        border-radius: 4px;
                    ">
                        ${otp}
                    </div>

                    <p style="
                        color: #999;
                        font-size: 12px;
                        margin-top: 20px;
                    ">
                        If you didn't request this email, please ignore it.
                    </p>

                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);

        console.log(`OTP email sent successfully to ${email}`);

        return info;

    } catch (error) {

        console.error(
            `Error sending OTP email to ${email}:`,
            error
        );

        throw error;
    }
};


// ==============================
// SEND BOOKING CONFIRMATION EMAIL
// ==============================

exports.sendBookingEmail = async (
    email,
    name,
    eventTitle
) => {

    try {

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,

            subject: 'EventHub Booking Confirmed',

            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 30px;
                    border: 1px solid #e0e0e0;
                    border-radius: 10px;
                ">

                    <h2 style="color: #111;">
                        Booking Confirmed 🎉
                    </h2>

                    <p style="font-size: 16px; color: #555;">
                        Hello ${name},
                    </p>

                    <p style="font-size: 16px; color: #555;">
                        Your booking for the following event has been confirmed:
                    </p>

                    <div style="
                        background: #f5f5f5;
                        padding: 15px;
                        border-radius: 8px;
                        margin: 20px 0;
                    ">

                        <h3 style="margin: 0; color: #111;">
                            ${eventTitle}
                        </h3>

                    </div>

                    <p style="
                        font-size: 15px;
                        color: #555;
                    ">
                        Thank you for booking with EventHub.
                    </p>

                    <p style="
                        font-size: 13px;
                        color: #999;
                    ">
                        This is an automated confirmation email.
                    </p>

                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);

        console.log(
            `Booking confirmation email sent successfully to ${email}`
        );

        return info;

    } catch (error) {

        console.error(
            `Error sending booking confirmation email to ${email}:`,
            error
        );

        throw error;
    }
};