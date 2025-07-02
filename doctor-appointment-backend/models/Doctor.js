const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  days: { type: String, required: true }
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
