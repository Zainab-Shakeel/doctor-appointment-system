import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function AssistantDashboard() {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [days, setDays] = useState("");
  const [doctors, setDoctors] = useState([]);

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
        console.log("Fetched data:", data); // 🔍 Log it
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setDoctors([]); // Prevent crash
      }
    };

    fetchDoctors();
  }, []);



  const handleAddDoctor = async (e) => {
    e.preventDefault();

    const doctorData = {
      name,
      duration: Number(duration),
      days,
    };

    try {
      const res = await fetch("http://localhost:5000/api/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Doctor added successfully!");
        setDoctors([...doctors, data.doctor]);
        setName("");
        setDuration("");
        setDays("");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Server error while adding doctor.");
      console.error(err);
    }
  };

  const handleDeleteDoctor = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/doctors/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Doctor deleted successfully.");
        setDoctors(doctors.filter((doc) => doc._id !== id));
      } else {
        alert("Failed to delete doctor.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Server error while deleting doctor.");
    }
  };


  return (

    <div className="absolute top-0 left-0 right-0 bg-gray-100 overflow-y-auto flex justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">

        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Welcome, Assistant
        </h2>

        {/* Add Doctor Form */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Doctor</h3>
          <form onSubmit={handleAddDoctor} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Doctor Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-black"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Appointment Duration (minutes)</label>
              <input
                type="number"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-black"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Available Days</label>
              <input
                type="text"
                required
                placeholder="e.g. Mon, Wed"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
            >
              Add Doctor
            </button>
          </form>
        </div>

        {/* Doctors List */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Doctors List</h3>
          {doctors.length === 0 ? (
            <p className="text-gray-500">No doctors added yet.</p>
          ) : (
            <ul className="space-y-2">
              {doctors.map((doc) => (
                <li
                  key={doc._id}
                  className="bg-gray-50 px-4 py-2 rounded-md border border-gray-200 text-gray-800 flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium">{doc.name}</span> – {doc.duration} min ({doc.days})
                  </div>
                  <button
                    onClick={() => handleDeleteDoctor(doc._id)}
                    className="text-red-600 hover:underline text-sm ml-4"
                  >
                    Delete
                  </button>
                </li>
              ))}

            </ul>
          )}
        </div>
        <button
  onClick={handleLogout}
  className="mt-8 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
>
  Logout
</button>

      </div>
      
    </div>
  );

}

export default AssistantDashboard;
