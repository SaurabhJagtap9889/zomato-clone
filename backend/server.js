const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL 
        : ['http://127.0.0.1:5500', 'http://localhost:5500'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));

// Test route
app.get('/api/hello', (req, res) => {
    res.json({ msg: 'Hello from backend' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: err.message || 'Server Error'
    });
});

// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 