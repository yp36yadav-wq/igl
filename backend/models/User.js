const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    // 📅 Date selected by user
    appointmentDate: {
      type: Date,
      required: true,
    },

    // ⏰ Time slot selected (ex: "10:00 AM - 10:30 AM")
    timeSlot: {
      type: String,
      required: true,
    },

    // 👤 User details
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone1: {
      type: String,
      required: true,
    },

    phone2: {
      type: String,
    },

    // 👥 Number of people attending
    numberOfPeople: {
      type: Number,
      default: 1,
      min: 1,
    },

    // 📝 Extra info / reason
    description: {
      type: String,
      trim: true,
    },

    // 🛂 Admin flag (normally false for users)
    isAdmin: {
      type: Boolean,
      default: false,
    },

    // 📌 Appointment status
    status: {
      type: String,
      enum: ['pending', 'approved', 'declined', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
