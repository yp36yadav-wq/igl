// controllers/adminController.js
const Appointment = require('../models/User');

// COMMON DASHBOARD - CEO/HR see ALL appointments
const getDashboard = async (req, res) => {
  try {
    // Get ALL appointments, not just pending
    const allAppointments = await Appointment.find({})
      .sort({ createdAt: -1 });

    const stats = {
      pending: await Appointment.countDocuments({ status: 'pending' }),
      approved: await Appointment.countDocuments({ status: 'approved' }),
      declined: await Appointment.countDocuments({ status: 'declined' }),
      total: await Appointment.countDocuments()
    };

    res.json({
      success: true,
      dashboard: {
        role: req.employee.role, // This comes from middleware auth
        employeeName: req.employee.email, // Optional: add employee info
        stats,
        appointments: allAppointments,
        today: new Date().toISOString().split('T')[0]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// APPROVE appointment
const approveAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    appointment.status = 'approved';
    appointment.approvedBy = req.employee.employeeId; // Track who approved
    appointment.approvedAt = new Date();
    appointment.updatedAt = new Date();
    await appointment.save();

    res.json({
      success: true,
      message: 'Appointment approved successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DECLINE appointment
const declineAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body; // Optional decline reason
    
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    appointment.status = 'declined';
    appointment.declinedBy = req.employee.employeeId; // Track who declined
    appointment.declineReason = reason || 'No reason provided';
    appointment.declinedAt = new Date();
    appointment.updatedAt = new Date();
    await appointment.save();

    res.json({
      success: true,
      message: 'Appointment declined',
      appointment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboard, approveAppointment, declineAppointment };