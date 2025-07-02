import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Error signing up");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Patient Signup
        </h2>

        <label className="block text-gray-700 mb-2">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md text-black"
        />

        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md text-black"
        />

        <label className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-md text-black"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
