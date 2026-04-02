import React from "react";
import StudentCard from "./StudentCard";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Student Cards</h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        
        <StudentCard name="Adil" department="CSE" marks="92" />
        <StudentCard name="Rahul" department="ECE" marks="78" />
        <StudentCard name="Siri" department="IT" marks="85" />

      </div>
    </div>
  );
}

export default App;