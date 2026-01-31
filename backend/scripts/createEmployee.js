const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Employee = require('../models/Employee');

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const hashedPassword = await bcrypt.hash('ceopassword', 10);

        await Employee.create({
            employeeId: 'EMP007',
            email: 'ceo@test.com',
            password: hashedPassword,
            role: 'ceo',
        });

        console.log('✅ Employee created with hashed password');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
