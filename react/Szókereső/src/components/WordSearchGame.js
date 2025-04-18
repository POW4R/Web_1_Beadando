import React, { useState, useEffect } from "react";
import words from "../datas/WordContainer";
import WordGrid from "./WordGrid";
import WordInput from "./WordInput";
import WordList from "./WordList";
import { generateGrid } from "./GridUtils"
import "../styles/WordSearchGame.css";

const gridSize = 10;

export default function WordSearchGame() {
    const [grid, setGrid] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [points, setPoints] = useState(0); // Pontszám állapot hozzáadása

    useEffect(() => {
        setGrid(generateGrid(words, gridSize));
    }, []);

    const handleSearch = (word) => {
        if (words.includes(word) && !foundWords.includes(word)) {
            // Ha a szó helyes, adjunk hozzá +5 pontot
            setFoundWords([...foundWords, word]);
            setPoints(points + 5);
        } else if (word !== "" && !words.includes(word)) {
            // Ha a szó nem helyes, vonjunk le -1 pontot
            setPoints(points - 1);
        }
    };

    return (
        <div className="game-container">
            <h2>Pontszám: {points}</h2> {/* Pontszám kijelzése */}
            <WordGrid grid={grid} />
            <WordInput onSearch={handleSearch} />
            <WordList foundWords={foundWords} />
        </div>
    );
}
