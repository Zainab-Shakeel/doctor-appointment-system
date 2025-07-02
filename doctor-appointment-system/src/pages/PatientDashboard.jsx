import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";


function PatientDashboard() {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("Dr. Ahmad");
    const [selectedDate, setSelectedDate] = useState(null);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user"); // 🧹 Clear login info
        navigate("/login"); // 🔁 Redirect to login
    };


    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/doctors");
                const data = await res.json();
                setDoctors(data);

                // Set default selected doctor to the first one
                if (data.length > 0) setSelectedDoctor(data[0].name);
            } catch (error) {
                console.error("Failed to load doctors", error);
            }
        };
        const fetchAppointments = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/appointments");
                const data = await res.json();
                setAppointments(data);
            } catch (err) {
                console.error("Failed to load appointments", err);
            }
        };

        fetchAppointments();


        fetchDoctors();
    }, []);


    const handleBooking = async (e) => {
        e.preventDefault();

        if (!selectedDoctor || !selectedDate) {
            alert("Please select a doctor and date.");
            return;
        }

        const formattedDate = selectedDate.toISOString().split("T")[0]; // e.g. "2024-06-16"

        try {
            const res = await fetch("http://localhost:5000/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    doctorName: selectedDoctor,
                    date: formattedDate,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                alert(`Appointment booked with ${selectedDoctor} on ${formattedDate}`);
                setSelectedDate(null); // Reset form
            } else {
                alert("Failed to book: " + data.error);
            }
        } catch (err) {
            alert("Server error while booking.");
            console.error(err);
        }
    };

    const cancelAppointment = async (id) => {
        const confirmDelete = window.confirm("Cancel this appointment?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                alert("Appointment cancelled");
                // remove from UI
                setAppointments(appointments.filter((a) => a._id !== id));
            } else {
                alert("Failed to cancel");
            }
        } catch (err) {
            console.error("Cancel error", err);
            alert("Error cancelling appointment");
        }
    };



    return (
        <div className="absolute top-0 left-0 right-0 bg-gray-100 overflow-y-auto flex justify-center px-4 py-10">

            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
                    Welcome, Patient
                </h2>

                {/* Doctor Cards (no image) */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Available Doctors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {doctors.map((doc) => (
                            <div
                                key={doc.name}
                                className={`p-4 border rounded-lg shadow-sm ${selectedDoctor === doc.name
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-300"
                                    }`}
                            >
                                <h4 className="text-lg font-semibold text-gray-800">{doc.name}</h4>
                                <p className="text-sm text-gray-600">Consultation: {doc.duration} min</p>
                                <button
                                    type="button"
                                    className="mt-2 text-sm text-blue-600 underline hover:text-blue-800"
                                    onClick={() => setSelectedDoctor(doc.name)}
                                >
                                    {selectedDoctor === doc.name ? "Selected" : "Select"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Appointment Form */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Book Appointment</h3>
                    <form onSubmit={handleBooking} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Selected Doctor
                            </label>
                            <input
                                type="text"
                                readOnly
                                value={selectedDoctor}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-black"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Select Date
                            </label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-black"
                                minDate={new Date()}
                                placeholderText="Choose a date"
                                dateFormat="MMMM d, yyyy"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold transition duration-200"
                            disabled={!selectedDate}
                        >
                            Book
                        </button>
                    </form>
                </div>
                <div className="mt-10 text-black">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Your Appointments</h3>
                    <ul className="space-y-2">
                        {appointments.length === 0 && (
                            <li className="text-gray-500">No appointments yet.</li>
                        )}
                        {appointments.map((appt) => (
                            <li key={appt._id} className="border p-3 rounded text-sm flex justify-between items-center">
                                <span>
                                    <strong>{appt.doctorName}</strong> — {appt.date}
                                </span>
                                <button
                                    onClick={() => cancelAppointment(appt._id)}
                                    className="text-red-500 hover:underline text-xs"
                                >
                                    Cancel
                                </button>
                            </li>
                        ))}
                    </ul>

                </div>
                <button
                    onClick={handleLogout}
                    className="mt-8 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
                    Logout
                </button>

            </div>
        </div>
    );
}

export default PatientDashboard;
