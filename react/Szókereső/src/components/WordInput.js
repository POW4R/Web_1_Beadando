import React, { useState } from "react";
import "../styles/WordInput.css";

export default function WordInput({ onSearch }) {
    const [input, setInput] = useState("");

    const handleSearch = () => {
        onSearch(input.toUpperCase());
        setInput("");
    };

    return (
        <div className="input-container">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Keresett szó" />
            <button onClick={handleSearch}>Keresés</button>
        </div>
    );
}
