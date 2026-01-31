const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    // 👤 Employee id 
    employeeId: {
        type: String,   
        required: true,
        unique: true,
        trim: true,
    },
    // 👤 Employee email
    email: {
        type: String,
        required: true, 
        trim: true,
        lowercase: true,
        unique: true,
    },
    // 📧 Employee password  
    password: {
        type: String,
        required: true,
        minlength: 6,
    },

    // 👥 Employee role (e.g., 'admin', 'staff')
    role: {
        type: String,
        enum: ['staff', 'hr', 'ceo'],
        default: 'staff',
    },

}
, { timestamps: true });


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;