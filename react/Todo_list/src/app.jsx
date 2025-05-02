import { useState } from 'preact/hooks'
import './app.css'

export function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (index) => {
    const updated = [...tasks]
    updated[index].completed = !updated[index].completed
    setTasks(updated)
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask()
  }

  return (
    <div class="container">
      <h1 class="title">📝 Teendőlista</h1>
      <div class="input-row">
        <input
          type="text"
          placeholder="Új teendő..."
          value={newTask}
          onInput={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button class="add-button" onClick={addTask}>Hozzáad</button>
      </div>
      <ul class="task-list">
        {tasks.length === 0 && (
          <li class="task-item">Nincsenek teendők</li>
        )}
        {tasks.map((task, index) => (
          <li
            key={index}
            class={`task-item ${task.completed ? 'completed' : ''}`}
          >
            <span onClick={() => toggleTask(index)}>{task.text}</span>
            <button class="delete-button" onClick={() => deleteTask(index)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
