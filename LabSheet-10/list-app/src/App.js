import React, { useState } from "react";
import ItemList from "./ItemList";

function App() {
  const [items, setItems] = useState([]);

  const [input, setInput] = useState("");

  const addItem = () => {
    if (input.trim() === "") return;

    const newItem = {
      id: Date.now(),
      name: input
    };

    setItems([...items, newItem]);
    setInput("");
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dynamic List</h1>

      {/* Input Section */}
      <input
        type="text"
        placeholder="Enter item"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addItem} style={{ marginLeft: "10px" }}>
        Add
      </button>

      {/* Display List */}
      <ItemList items={items} removeItem={removeItem} />
    </div>
  );
}

export default App;