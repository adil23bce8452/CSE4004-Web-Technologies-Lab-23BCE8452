import React from "react";

function StudentCard(props) {
  return (
    <div style={{
      border: "1px solid black",
      padding: "15px",
      margin: "10px",
      width: "250px",
      borderRadius: "10px"
    }}>
      <h3>{props.name}</h3>
      <p>Department: {props.department}</p>
      <p>Marks: {props.marks}</p>
    </div>
  );
}

export default StudentCard;