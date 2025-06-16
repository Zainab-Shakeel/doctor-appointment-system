function PatientDashboard() {
    return (
        <div style={{ padding: "2rem" }}>
            <h2>Welcome, Patient</h2>

            <div style={{ marginTop: "2rem" }}>
                <h3>Available Doctors</h3>
                <ul>
                    <li>Dr. Ahmad (10 min)</li>
                    <li>Dr. Sara (5 min)</li>
                </ul>
            </div>

            <div style={{ marginTop: "2rem" }}>
                <h3>Book Appointment</h3>

                <form>
                    <div>
                        <label>Select Doctor: </label>
                        <select>
                            <option>Dr. Ahmad</option>
                            <option>Dr. Sara</option>
                        </select>
                    </div>

                    <div>
                        <label>Select Date:</label>
                        <input type="date" />
                    </div>

                    <br />
                    <button type="submit">Book</button>
                </form>

            </div>
        </div>
    )
}

export default PatientDashboard;
