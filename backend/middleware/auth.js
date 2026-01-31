// middleware/auth.js
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const employee = await Employee.findById(decoded.id).select('-password');
    
    if (!employee) return res.status(401).json({ success: false, message: 'Employee not found' });
    
    req.employee = employee;
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: 'Invalid token' });
  }
};

// CEO + HR access only - FIXED
const authorizeAdmin = (req, res, next) => {
  console.log('🔍 Checking role:', req.employee.role); // Debug log
  
  if (!req.employee || !['ceo', 'hr'].includes(req.employee.role.toLowerCase())) {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin privileges required (CEO/HR only)',
      yourRole: req.employee?.role
    });
  }
  next();
};

module.exports = { authenticateToken, authorizeAdmin };