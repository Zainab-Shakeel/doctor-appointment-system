const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

router.post("/", async (req, res) => {
    try {
        const { doctorName, date } = req.body;

        if (!doctorName || !date) {
            return res.status(400).json({ error: "Missing doctor or date" });
        }

        const newAppointment = new Appointment({ doctorName, date });
        await newAppointment.save();

        res.status(201).json({ message: "Appointment booked", appointment: newAppointment });
    } catch (err) {
        res.status(500).json({ error: "Server error while booking appointment" });
    }
});
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ date: 1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: "Failed to load appointments" });
    }
});

// DELETE /api/appointments/:id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Appointment.findByIdAndDelete(id);
        res.json({ message: "Appointment cancelled" });
    } catch (err) {
        res.status(500).json({ error: "Failed to cancel appointment" });
    }
});



module.exports = router;
