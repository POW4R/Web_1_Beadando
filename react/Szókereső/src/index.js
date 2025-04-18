import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WordSearchGame from './components/WordSearchGame';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WordSearchGame />
  </React.StrictMode>
);