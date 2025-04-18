import React from "react";
import "../styles/WordGrid.css";

export default function WordGrid({ grid }) {
    return (
        <div className="grid">
            {grid.map((row, rowIndex) =>
                row.map((letter, colIndex) => (
                    <div key={`${rowIndex}-${colIndex}`}>
                        {letter}
                    </div>
                ))
            )}
        </div>
    );
}
