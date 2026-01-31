// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ConnectDB = require('./config/db');
const employeeAuthRoutes = require('./routes/employeeAuth');
const adminRoutes = require('./routes/adminRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const PORT = process.env.PORT || 4000;

// Initialize Express app
const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Employee Portal API is running ✅',
        version: '1.0.0',
        status: 'active'
    });
});

// Auth routes
app.use('/api/auth', employeeAuthRoutes);
app.use('/api/admin', adminRoutes);


// Appointments

app.use('/api', appointmentRoutes);



// 404 handler
// app.use('*', (req, res) => {
//     res.status(404).json({
//         success: false,
//         message: 'Route not found'
//     });
// });


// Global error handler
app.use((err, req, res, next) => {
    console.error('Global Error:', err);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});


// Start Server
const startServer = async () => {
    try {
        await ConnectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
