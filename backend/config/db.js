const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/igl';

const ConnectDB = async () => {
    try {
        await mongoose.connect(mongoURI);

        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = ConnectDB;