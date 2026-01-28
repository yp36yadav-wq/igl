
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const ConnectDB = require('./config/db');   // DATABASE CONNECTION 
const PORT = process.env.PORT || 4000;


// MIDDLE WARES
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    contentType: 'application/json',
    Authorization: `Bearer ${process.env.API_KEY}`,
}));


// ROUTES
app.use('/', (req, res) => {
    res.send('API is running');
});

// SERVER LISTENING

ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to the database: (Server File Error)', err);
}
);
