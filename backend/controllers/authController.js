// controllers/authController.js
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');

// @desc    Login employee (fetches from DB, limited to existing 1000 employees)
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    const { employeeId, email, password } = req.body;

    // Find employee in DB (only existing employees can login)
    const employee = await Employee.findOne({
      $or: [{ employeeId }, { email }]
    }).select('+password'); // Explicitly include password field

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password with bcrypt
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Employee exists in DB and password matches - access granted
    // Generate JWT token
    const token = jwt.sign(
      { 
        id: employee._id,
        employeeId: employee.employeeId, 
        email: employee.email,
        role: employee.role 
      },
      process.env.JWT_SECRET || 'your-super-secret-key-change-this',
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...employeeData } = employee.toObject();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        ...employeeData,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

module.exports = { login };
