import React from "react";
import "../styles/WordList.css";

export default function WordList({ foundWords }) {
    return (
        <div>
            <h3>Megtalált szavak:</h3>
            <ul className="word-list">
                {foundWords.map((word, index) => (
                    <li key={index}>{word}</li>
                ))}
            </ul>
        </div>
    );
}
