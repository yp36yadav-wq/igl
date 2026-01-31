// controllers/authController.js
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');

// ==========================================
// LOGIN FUNCTION - Step by Step Explanation
// ==========================================
const login = async (req, res) => {
  try {
    // STEP 1: Get login data from request body
    const { employeeId, email, password } = req.body;

    // STEP 2: Find employee in database
    // We check if employeeId OR email matches
    const employee = await Employee.findOne({
      $or: [{ employeeId }, { email }]
    }).select('+password'); // Get password too (normally hidden)

    // STEP 3: If employee doesn't exist, reject login
    if (!employee) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // STEP 4: Check if password is correct using bcrypt
    // bcrypt.compare() compares plain password with hashed password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // STEP 5: Password is correct! Create JWT token
    // This token contains employee information (but NOT password)
    const token = jwt.sign(
      {
        id: employee._id,
        employeeId: employee.employeeId,
        email: employee.email,
        role: employee.role
      },
      process.env.JWT_SECRET,  // Secret key to sign the token
      { expiresIn: '8h' }      // Token expires in 8 hours
    );

    // STEP 6: Store token in HTTP-only cookie
    // 🔒 This is the SECURE part - JavaScript can't access this cookie
    res.cookie('authToken', token, {
      httpOnly: true,     // ✅ JavaScript CANNOT read this cookie (XSS protection)
      secure: process.env.NODE_ENV === 'production', // ✅ Only send over HTTPS in production
      sameSite: 'strict', // ✅ Cookie only sent to same domain (CSRF protection)
      maxAge: 8 * 60 * 60 * 1000 // Cookie expires in 8 hours (in milliseconds)
    }); // ✅ FIX: Added semicolon here

    // STEP 7: Remove password from response (security!)
    const { password: _, ...employeeData } = employee.toObject();

    // STEP 8: Send success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        ...employeeData
        // ✅ FIX: Removed token from response body
        // WHY? Because it's already in the cookie!
        // Sending it in both places is redundant and less secure
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

// ==========================================
// LOGOUT FUNCTION - Simple Explanation
// ==========================================
const logout = async (req, res) => {
  // STEP 1: Delete the authToken cookie
  // This effectively logs the user out
  res.clearCookie('authToken');
  
  // STEP 2: Confirm logout successful
  res.json({ success: true, message: 'Logged out successfully' });
};

// ✅ FIX: Export BOTH functions
module.exports = { login, logout };