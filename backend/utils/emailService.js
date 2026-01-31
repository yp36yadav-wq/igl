// services/emailService.js
const nodemailer = require('nodemailer');

// Create transporter with updated configuration
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false, // Don't fail on invalid certs
        ciphers: 'SSLv3'
    },
    // Add these important options
    pool: true,
    maxConnections: 1,
    // requireTLS: true,
    // Force IPv4
    family: 4
});

// Verify transporter configuration
transporter.verify(function (error, success) {
    if (error) {
        console.error('❌ Email configuration error:', error);
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

// Send appointment confirmation email to employee
const sendAppointmentConfirmationEmail = async (appointmentData) => {
    const { name, email, appointmentDate, timeSlot, numberOfPeople, description, _id } = appointmentData;

    const formattedDate = new Date(appointmentDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: '⏳ Appointment Request Received - Pending Approval',
        html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f9fafb;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-radius: 0 0 10px 10px;
        }
        .status-badge {
            display: inline-block;
            background: #fef3c7;
            color: #92400e;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            margin: 15px 0;
        }
        .detail-box {
            background: white;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border-left: 4px solid #f59e0b;
        }
        .detail-row {
            margin: 10px 0;
            display: flex;
            justify-content: space-between;
        }
        .label {
            font-weight: bold;
            color: #6b7280;
        }
        .value {
            color: #111827;
            font-weight: 600;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
        .warning-box {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0;">🎉 Appointment Request Received!</h1>
    </div>
    
    <div class="content">
        <p>Dear <strong>${name}</strong>,</p>
        
        <p>Thank you for booking an appointment with us. Your request has been received and is currently under review.</p>
        
        <div class="status-badge">
            ⏳ Status: PENDING APPROVAL
        </div>
        
        <div class="warning-box">
            <strong>⚠️ Important:</strong> Please wait for admin approval before visiting. You will receive a confirmation email once your appointment is approved.
        </div>
        
        <div class="detail-box">
            <h3 style="margin-top: 0; color: #ea580c;">Appointment Details</h3>
            
            <div class="detail-row">
                <span class="label">📅 Date:</span>
                <span class="value">${formattedDate}</span>
            </div>
            
            <div class="detail-row">
                <span class="label">🕐 Time:</span>
                <span class="value">${timeSlot}</span>
            </div>
            
            <div class="detail-row">
                <span class="label">👥 Number of People:</span>
                <span class="value">${numberOfPeople}</span>
            </div>
            
            ${description ? `
            <div class="detail-row">
                <span class="label">📝 Description:</span>
                <span class="value">${description}</span>
            </div>
            ` : ''}
            
            <div class="detail-row">
                <span class="label">🔖 Booking Reference:</span>
                <span class="value">#${_id.toString().slice(-8).toUpperCase()}</span>
            </div>
        </div>
        
        <h3 style="color: #ea580c;">What happens next?</h3>
        <ol>
            <li>Our admin team will review your request</li>
            <li>You'll receive an email confirmation once approved</li>
            <li>You can then visit us at the scheduled time</li>
        </ol>
        
        <p style="margin-top: 30px;">If you have any questions, please contact us.</p>
    </div>
    
    <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; ${new Date().getFullYear()} IGL. All rights reserved.</p>
    </div>
</body>
</html>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Confirmation email sent to employee:', email);
        console.log('📧 Message ID:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending confirmation email:', error);
        throw error;
    }
};

// Send notification email to admin
const sendAdminNotificationEmail = async (appointmentData) => {
    const { name, email, appointmentDate, timeSlot, numberOfPeople, phone1, description, _id } = appointmentData;

    const formattedDate = new Date(appointmentDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: '🔔 New Appointment Request - Action Required',
        html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f9fafb;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-radius: 0 0 10px 10px;
        }
        .detail-box {
            background: white;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border-left: 4px solid #10b981;
        }
        .detail-row {
            margin: 10px 0;
            display: flex;
            justify-content: space-between;
        }
        .label {
            font-weight: bold;
            color: #6b7280;
        }
        .value {
            color: #111827;
            font-weight: 600;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0;">🔔 New Appointment Request</h1>
    </div>
    
    <div class="content">
        <p><strong>A new appointment request requires your approval.</strong></p>
        
        <div class="detail-box">
            <h3 style="margin-top: 0; color: #059669;">Customer Details</h3>
            
            <div class="detail-row">
                <span class="label">👤 Name:</span>
                <span class="value">${name}</span>
            </div>
            
            <div class="detail-row">
                <span class="label">📧 Email:</span>
                <span class="value">${email}</span>
            </div>
            
            <div class="detail-row">
                <span class="label">📱 Phone:</span>
                <span class="value">${phone1}</span>
            </div>
            
            <div class="detail-row">
                <span class="label">📅 Requested Date:</span>
                <span class="value">${formattedDate}</span>
            </div>
            
            <div class="detail-row">
                <span class="label">🕐 Requested Time:</span>
                <span class="value">${timeSlot}</span>
            </div>
            
            <div class="detail-row">
                <span class="label">👥 Number of People:</span>
                <span class="value">${numberOfPeople}</span>
            </div>
            
            ${description ? `
            <div class="detail-row">
                <span class="label">📝 Description:</span>
                <span class="value">${description}</span>
            </div>
            ` : ''}
            
            <div class="detail-row">
                <span class="label">🔖 Booking ID:</span>
                <span class="value">#${_id.toString().slice(-8).toUpperCase()}</span>
            </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <p><strong>Please review and take action on this appointment request in your admin dashboard.</strong></p>
        </div>
    </div>
    
    <div class="footer">
        <p>This is an automated notification from the IGL Appointment System.</p>
        <p>&copy; ${new Date().getFullYear()} IGL. All rights reserved.</p>
    </div>
</body>
</html>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Admin notification email sent to:', process.env.ADMIN_EMAIL);
        console.log('📧 Message ID:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending admin notification:', error);
        throw error;
    }
};

module.exports = {
    sendAppointmentConfirmationEmail,
    sendAdminNotificationEmail,
};