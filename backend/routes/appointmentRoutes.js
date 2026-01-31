const express = require('express');
const router = express.Router();
const Appointment = require('../models/User');
const Employee = require('../models/Employee');
const { sendAppointmentConfirmationEmail, sendAdminNotificationEmail } = require('../utils/emailService');

// Get all appointments
router.get('/appointments', async (req, res) => {
    try {
        console.log('📋 GET /api/appointments called');
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: appointments.length,
            appointments
        });
    } catch (error) {
        console.error('❌ Error fetching appointments:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Create appointment
router.post('/appointments', async (req, res) => {
    try {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📥 POST /api/appointments called');
        console.log('📦 Request body:', JSON.stringify(req.body, null, 2));
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const appointmentData = req.body;

        // Validate required fields (unchanged)
        const requiredFields = ['appointmentDate', 'timeSlot', 'name', 'email', 'phone1'];
        const missingFields = requiredFields.filter(field => !appointmentData[field]);

        if (missingFields.length > 0) {
            console.log('❌ Missing fields:', missingFields);
            return res.status(400).json({
                success: false,
                error: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // 🔥 NEW EMPLOYEE VALIDATION LOGIC
        let status = 'pending';

        if (appointmentData.existingEmployeeId) {
            console.log('🔍 Checking Employee ID:', appointmentData.existingEmployeeId);

            // Find employee by employeeId (your schema is perfect for this)
            const employee = await Employee.findOne({
                employeeId: { $regex: new RegExp(`^${appointmentData.existingEmployeeId.trim()}$`, 'i') }
            });

            if (!employee) {
                console.log('❌ Employee ID not found:', appointmentData.existingEmployeeId);
                return res.status(400).json({
                    success: false,
                    status: 'rejected',
                    error: 'Invalid Employee ID',
                    message: `Employee ID "${appointmentData.existingEmployeeId}" not found in our records.`
                });
            }

            console.log('👤 Employee found:', employee.employeeId, employee.email);

            // Compare emails (case insensitive - your lowercase: true handles this perfectly)
            if (employee.email === appointmentData.email.toLowerCase()) {
                status = 'approved';
                console.log('✅ ✅ AUTO-APPROVED! Employee email matches.');
            } else {
                console.log('❌ ❌ EMAIL MISMATCH!');
                console.log('   Employee email:', employee.email);
                console.log('   Form email:     ', appointmentData.email);

                return res.status(400).json({
                    success: false,
                    status: 'rejected',
                    error: 'Email Mismatch',
                    message: `Email "${appointmentData.email}" does not match Employee ID "${appointmentData.existingEmployeeId}".`
                });
            }
        }

        console.log('✅ Status determined:', status);

        // Create appointment with status
        const newAppointmentData = {
            ...appointmentData,
            status: status, // pending, approved, or rejected
            createdAt: new Date()
        };

        const newAppointment = new Appointment(newAppointmentData);
        await newAppointment.save();

        console.log('✅ Appointment created:', newAppointment._id, 'Status:', status);

        // Send emails (conditional for admin notification)
        console.log('📧 Sending emails...');
        try {
            await sendAppointmentConfirmationEmail(newAppointment);

            // Only notify admin for pending requests
            if (status === 'pending') {
                await sendAdminNotificationEmail(newAppointment);
            }

            console.log('✅ Emails sent!');
        } catch (emailError) {
            console.error('⚠️ Email failed (appointment saved):', emailError);
        }

        res.status(201).json({
            success: true,
            status: status, // Frontend uses this!
            message: status === 'approved'
                ? 'Appointment auto-approved for verified employee!'
                : 'Appointment created successfully',
            appointment: newAppointment
        });

    } catch (error) {
        console.error('❌ ERROR:', error.message);
        res.status(500).json({
            success: false,
            error: 'Server error: ' + error.message
        });
    }
});



// ✅ ADD THIS NEW GET endpoint to your appointments.js router
router.get('/employees/validate/:employeeId', async (req, res) => {
    try {
        const { employeeId } = req.params;
        console.log('🔍 Frontend validating employee:', employeeId);

        const employee = await Employee.findOne({
            employeeId: { $regex: new RegExp(`^${employeeId.trim()}$`, 'i') }
        }).select('employeeId email name role'); // Don't return password

        if (employee) {
            console.log('✅ Employee found:', employee.employeeId);
            res.json({
                success: true,
                employee: {
                    employeeId: employee.employeeId,
                    email: employee.email,
                    name: employee.name,
                    role: employee.role
                }
            });
        } else {
            console.log('❌ Employee not found:', employeeId);
            res.status(404).json({
                success: false,
                employee: null,
                message: 'Employee ID not found'
            });
        }
    } catch (error) {
        console.error('Employee validation error:', error);
        res.status(500).json({
            success: false,
            error: 'Validation error'
        });
    }
});


module.exports = router;