import { useState } from 'react';
import Grid from './Grid';
import Input from './Input';
import FoundWords from './FoundWords';
import './App.css';

const words = ['ALMA', 'BANÁN', 'SZŐLŐ', 'KÖRTE', 'NARANCS', 'CITROM', 'MÁLNA', 'MEGGY', 'ŐSZIBARACK', 'EPER'];

export default function App() {
  const [foundWords, setFoundWords] = useState([]);
  const [score, setScore] = useState(0);

  const handleWordSearch = (word) => {
    if (words.includes(word.toUpperCase()) && !foundWords.includes(word.toUpperCase())) {
      setFoundWords([...foundWords, word.toUpperCase()]);
      setScore(score + 1);
    }
  };

  return (
    <div className="container">
      <h1>Pontszám: {score}</h1>
      <Grid />
      <Input onSearch={handleWordSearch} />
      <FoundWords words={foundWords} />
    </div>
  );
}
