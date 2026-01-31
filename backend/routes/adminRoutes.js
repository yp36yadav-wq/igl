// routes/admin.js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const { getDashboard, approveAppointment, declineAppointment } = require('../controllers/adminController');

// ✅ CEO/HR COMMON DASHBOARD
router.get('/dashboard', [authenticateToken, authorizeAdmin], getDashboard);

// ✅ APPROVE appointment
router.put('/appointments/:id/approve', [authenticateToken, authorizeAdmin], approveAppointment);

// ✅ DECLINE appointment
router.put('/appointments/:id/decline', [authenticateToken, authorizeAdmin], declineAppointment);

module.exports = router;
