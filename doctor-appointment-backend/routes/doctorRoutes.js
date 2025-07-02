const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

router.post("/", async (req, res) => {
  try {
    const { name, duration, days } = req.body;

    const newDoctor = new Doctor({ name, duration, days });
    await newDoctor.save();

    res.status(201).json({ message: "Doctor added", doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/doctors
router.get("/", async (req, res) => {
  try {
    console.log("✅ Inside GET /api/doctors route");

    const doctors = await Doctor.find();
    console.log("📋 Doctors fetched:", doctors);

    res.json(doctors);
  } catch (error) {
    console.error("❌ Real fetch error:", error); // Log the real reason
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});




// DELETE /api/doctors/:id
router.delete("/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete doctor" });
  }
});

// PUT /api/doctors/:id
router.put("/:id", async (req, res) => {
  try {
    const { name, duration, days } = req.body;

    const updated = await Doctor.findByIdAndUpdate(
      req.params.id,
      { name, duration, days },
      { new: true }
    );

    res.json({ message: "Doctor updated", doctor: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update doctor" });
  }
});


module.exports = router;
