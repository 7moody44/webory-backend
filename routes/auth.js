const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Move this to the top

// --- 1. Register Route ---
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        // Create new user with all fields
        user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ msg: "User registered successfully!" });
    } catch (err) {
        console.error("❌ Register Error:", err); // Log the exact error
        res.status(500).json({ error: err.message });
    }
});

// --- 2. Login Route ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        res.json({ msg: "Login successful!", userId: user._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 3. Export at the VERY END ---
module.exports = router;