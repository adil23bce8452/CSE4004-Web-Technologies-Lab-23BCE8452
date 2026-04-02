import React from "react";

function ItemList({ items, removeItem }) {
  return (
    <div>
      <h2>Items List</h2>

      {/* Conditional rendering */}
      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        items.map((item) => (
          <div key={item.id} style={{ margin: "10px" }}>
            {item.name}
            <button 
              onClick={() => removeItem(item.id)} 
              style={{ marginLeft: "10px" }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ItemList;