const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// User.js
UserSchema.pre('save', async function (next) { // Add 'next' here
    if (!this.isModified('password')) return next(); // Add next() here

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next(); // Call next() when done
    } catch (err) {
        next(err); // Pass error to next if hashing fails
    }
});

module.exports = mongoose.model('User', UserSchema);