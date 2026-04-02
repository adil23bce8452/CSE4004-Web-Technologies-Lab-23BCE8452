// StudentProfile.js
import React from "react";

function StudentProfile() {
  // Storing student details in variables
  const name = "Mohammad Adil";
  const department = "Computer Science";
  const year = "3rd Year";
  const section = "A";

  return (
    <div style={{ border: "1px solid black", padding: "20px", width: "300px", margin: "20px auto" }}>
      <h2>Student Profile</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Year:</strong> {year}</p>
      <p><strong>Section:</strong> {section}</p>
    </div>
  );
}

export default StudentProfile;