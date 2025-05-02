import { useEffect, useState } from "react";

export default function Grid() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const generatedGrid = generateGrid(10, 10);
    setGrid(generatedGrid);
  }, []);

  function generateGrid(rows, cols) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const newGrid = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        row.push(randomLetter);
      }
      newGrid.push(row);
    }

    return newGrid;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 2rem)", gap: "0.25rem", justifyContent: "center", marginTop: "1rem" }}>
      {grid.flat().map((letter, index) => (
        <div
          key={index}
          style={{
            width: "2rem",
            height: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ccc",
            fontWeight: "bold",
            fontSize: "1.2rem",
            backgroundColor: "#f9f9f9",
          }}
        >
          {letter}
        </div>
      ))}
    </div>
  );
}
