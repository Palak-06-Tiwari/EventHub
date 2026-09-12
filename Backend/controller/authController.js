const User = require('../models/user');
const OTP = require('../models/otp');
const bcrypt = require('bcryptjs');
const { sendOtpEmail } = require('../utils/email');
const jwt = require('jsonwebtoken');

const generateToken = (userId, userRole) => {
    return jwt.sign(
        { id: userId, role: userRole },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};


// register user
exports.registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({
            error: 'User already exists'
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user',
            otp: false
        });

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        console.log(`OTP for ${email}: ${otp}`);

        await OTP.create({
            email,
            otp,
            action: 'account_verification'
        });

        await sendOtpEmail(
            email,
            otp,
            'account_verification'
        );

        res.status(201).json({
            message: 'User registered successfully. Please check your email for the OTP to verify your account.',
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            token: generateToken(user._id, user.role)
        });

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
};

// login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            error: 'Invalid credentials'
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            error: 'Invalid credentials'
        });
    }

    const token = generateToken(user._id, user.role);

    res.json({
        message: 'Login successful',
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        token
    });
};

//verify otp
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const otpRecord = await OTP.findOne({ email, otp, action: 'account_verification' });

    if (!otpRecord) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
    }
    const user=await User.findOneAndUpdate({ email }, { otp: true });
    await OTP.deleteMany({ email, action: 'account_verification' });
    res.json({ 
        message: 'OTP verified successfully. Your account is now active.',
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        token: generateToken(user._id, user.role)
    });

};

