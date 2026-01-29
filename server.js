// 1. Load our secret variables from the .env file
require('dotenv').config();

// 2. Import the tools we installed
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 3. Initialize the server
const app = express();

// 4. Middleware (Settings for the server)
// Explicit CORS config to prevent "CORS Failed" on pre-flight OPTIONS requests
// --- 4. Middleware ---
// Keep this part - it handles everything including OPTIONS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// DELETE OR COMMENT OUT THIS LINE BELOW - IT IS CAUSING THE CRASH
// app.options('*', cors()); 

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

// 6. Start the server
// Use Render's dynamic PORT or default to 5000 for local dev
const PORT = process.env.PORT || 5000;

// Binding to '0.0.0.0' is required for Render to map the external URL to your app
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is awake and running on port ${PORT}`);
});