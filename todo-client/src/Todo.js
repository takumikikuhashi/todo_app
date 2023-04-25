import React, { useState, useEffect } from 'react';
import "./Todo.css"

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3001/tasks');
    const data = await response.json();
    if (Array.isArray(data)) {
      console.log('Unsorted tasks:', data);
      const sortedTasks = data.sort((a, b) => a.priority - b.priority);
      console.log('Sorted tasks:', sortedTasks);
      setTasks(sortedTasks);
    } else {
      console.error('Error fetching tasks:', data);
      setTasks([]);
    }
  };

  const addTask = async (event) => {
    event.preventDefault();
    const taskData = { title: newTask, done: false, priority: parseInt(priority, 10) };
    console.log("Sending data:", taskData);
    const response = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    if (response.ok) {
      fetchTasks();
      setNewTask('');
      setPriority(1);
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
    <div className='todo'>
      <h1>ToDo List</h1>
      <form onSubmit={addTask} className="form">
        <div className="todo-items">
          <div className="tasks-box">
            <input
              className="tasks"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a task..."
            />
          </div>
          <div className="priority-box">
            <input
              className="priority"
              type="number"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              min="1"
              max="9"
            />
          </div>
        </div>
        <button type="submit" className="button-add">
          Add
        </button>
      </form>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-check">
            <input
              className="checkbox"
              type="checkbox"
              checked={task.done}
              onChange={() => updateTask(task)}
            />
            <span className={task.done ? 'done' : ''}>{task.title}</span>
            <button onClick={() => deleteTask(task.id)} className="delete-botton">削除</button>
            </li>
          ))}
        </ul>
      </div>
    );
}
  
export default Todo;
  