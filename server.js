// 1. Load our secret variables from the .env file
require('dotenv').config();

// 2. Import the tools we installed
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 3. Initialize the server
const app = express();

// 4. Middleware (Settings for the server)
app.use(cors()); // Allows your website to access this API
app.use(express.json()); // Allows the server to read JSON data sent by the user
app.use('/api/auth', require('./routes/auth'));
// 5. THE CONNECTION (The most important part)
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
    .then(() => {
        console.log("-----------------------------------------");
        console.log("✅ SUCCESS: Connected to MongoDB Atlas!");
        console.log("-----------------------------------------");
    })
    .catch((err) => {
        console.log("-----------------------------------------");
        console.error("❌ ERROR: Could not connect to the DB.");
        console.error("Reason:", err.message);
        console.log("-----------------------------------------");
    });

// 6. Start the server on Port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is awake and running on port ${PORT}`);
});