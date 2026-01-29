const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Clean modern way: removed 'next'
UserSchema.pre('save', async function () {
    // If password hasn't changed, just stop here
    if (!this.isModified('password')) return;

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // No need to call next() because this is an async function!
});

module.exports = mongoose.model('User', UserSchema);