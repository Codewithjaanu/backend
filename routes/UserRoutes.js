const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
require("dotenv").config();

const router = express.Router();



router.post("/register", async (req, res) => {
    try {
        const { UserId, Password } = req.body;

        if (!UserId || !Password) {
            return res.status(400).json({ message: "UserId and Password are required." });
        }

        const existingUser = await User.findOne({ UserId });
        if (existingUser) {
            return res.status(400).json({ message: "UserId already exists." });
        }

        const hashedPassword = await bcrypt.hash(Password, 10); // Fix: Added salt rounds
        const newUser = new User({ UserId, Password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error("Error during registration:", error.message);
        res.status(500).json({ message: "Internal Server Error." });
    }
});

// User Login with JWT
router.post("/login", async (req, res) => {
    try {
        const { UserId, Password } = req.body;

        const user = await User.findOne({ UserId });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Generate JWT Token with Expiry
        const token = jwt.sign(
            { UserId: user.UserId },
            process.env.MY_JWT_TOKEN,
            { expiresIn: "24h" }
        );

        res.status(200).json({ message: "Login successful.", token });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: "Internal Server Error." });
    }
});

module.exports = router;
