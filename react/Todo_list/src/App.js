import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, done: false }]);
    setInput("");
  };

  const toggleDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 Teendőlista</h1>
        <div className="flex mb-4">
          <input
            className="flex-grow p-2 border rounded-l-xl outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Új teendő..."
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-xl hover:bg-blue-600"
            onClick={addTodo}
          >
            Hozzáad
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-2 rounded-xl ${
                todo.done ? "bg-green-100 line-through text-gray-500" : "bg-gray-50"
              }`}
            >
              <span onClick={() => toggleDone(index)} className="cursor-pointer flex-grow">
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(index)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
