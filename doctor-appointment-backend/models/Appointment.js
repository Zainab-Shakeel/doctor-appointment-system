const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  date: { type: String, required: true } // stored as YYYY-MM-DD string
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
