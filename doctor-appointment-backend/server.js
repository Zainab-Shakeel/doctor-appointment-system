const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const doctorRoutes = require("./routes/doctorRoutes");
app.use("/api/doctors", doctorRoutes);

const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointments", appointmentRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);



app.get("/", (req, res) => {
    res.send("API is running...");
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Mongo Error:", err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
