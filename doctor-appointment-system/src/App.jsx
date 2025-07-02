import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AssistantDashboard from "./pages/AssistantDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import React from "react";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔁 Redirect base URL to /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/assistant" element={<AssistantDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
