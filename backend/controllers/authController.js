const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//signup
const signup = async (req, res) => {
    const { username, email, password } = req.body;

    console.log("Signup request received :", req.body);

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists with email:", email);
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log("Signup successful for user:", email);
        res.status(201).json({ result: newUser, token });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//login
const login = async (req, res) => {
    const { email, password } = req.body;

    console.log("Login request received with:", req.body);

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            console.log("User not found with email:", email);
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            console.log("Invalid credentials for email:", email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log("Login successful for user:", email);
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//logout
const logout = async(req, res) => {
    res.status(200).json({message: 'Logged out successfully'})
}

module.exports = { signup, login, logout};
