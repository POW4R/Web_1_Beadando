import { useState } from "react";

export default function Input({ onSearch }) {
    const [word, setWord] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (word.trim()) {
        onSearch(word);
        setWord('');
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="search-container">
        <input
          type="text"
          placeholder="Keresett szó"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit">Keresés</button>
      </form>
    );
  }
  