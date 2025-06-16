import {useState} from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("patient");

    const navigate = useNavigate();

    const handleSubmit = (e)=> {
        e.preventDefault();

        if (role === "patient") {
            navigate("/patient");
        }
        else if (role === "assistant") {
            navigate("/assistant");
        }
    }

  return (
    <div style={{ padding: "2rem" }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email: </label>
                <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>

            <div>
                <label>Password: </label>
                <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>

            <div>
                <label>Role: </label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="patient">Patient</option>
                    <option value="assistant">Assistant</option>
                </select>
            </div>

            <button type="submit" style={{ marginTop: "1rem" }}>Login</button>
        </form>
    </div>
  )
}

export default Login;
