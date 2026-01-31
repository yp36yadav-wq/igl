// routes/auth.js
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

router.post('/login', login);


    
router.post('/forgot-password', async (req, res) => {
    // Send reset email logic here
    res.json({ success: true, message: 'Password reset email sent' });
});

module.exports = router;
