const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// User.js
// Remove 'next' from the function arguments
UserSchema.pre('save', async function () {
    // If password hasn't changed, stop here
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // No next() needed here!
    } catch (err) {
        // If you want to throw an error, just throw it
        throw err;
    }
});

module.exports = mongoose.model('User', UserSchema);