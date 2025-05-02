export default function FoundWords({ words }) {
    return (
      <div>
        <h3>Megtalált szavak:</h3>
        <ul>
          {words.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    );
  }
  