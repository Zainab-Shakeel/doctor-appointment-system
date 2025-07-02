import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("patient");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Login successful!");

                // Save user in localStorage (optional)
                localStorage.setItem("user", JSON.stringify(data.user));

                // Redirect by role
                if (data.user.role === "patient") {
                    navigate("/patient");
                } else if (data.user.role === "assistant") {
                    navigate("/assistant");
                }
            } else {
                alert(data.error || "Login failed");
            }
        } catch (err) {
            alert("Error connecting to server");
            console.error(err);
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    >
                        <option value="patient">Patient</option>
                        <option value="assistant">Assistant</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
                >
                    Login
                </button>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Sign up here
                    </Link>
                </p>

            </form>
        </div>
    );
}

export default Login;
