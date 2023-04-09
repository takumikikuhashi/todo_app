import React, { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3001/tasks');
    const data = await response.json();
    if (Array.isArray(data)){
      setTasks(data);
    }else{
      console.error('Error fetching tasks:', data);
      setTasks([]);
    }
    
  };

  const addTask = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask, done: false }),
    });
    if (response.ok) {
      fetchTasks();
      setNewTask('');
    }
  };

  const updateTask = async (task) => {
    const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, done: !task.done }),
    });
    if (response.ok) {
      fetchTasks();
    }
  };

  const deleteTask = async (taskId) => {
    const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchTasks();
    }
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <from onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTask}>Add</button>
      </from>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => updateTask(task)}
            />
            <span className={task.done ? 'done' : ''}>{task.title}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
