import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const res = await axios.post('http://localhost:5000/tasks', task);
    setTasks([...tasks, res.data]);
  };

  const toggleTask = async (id, completed) => {
    await axios.put(`http://localhost:5000/tasks/${id}`, { completed });
    setTasks(tasks.map(t => t.id === id ? { ...t, completed } : t));
  };

  return (
    <div className="app">
      <h1>Task Reminder App</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} toggleTask={toggleTask} />
    </div>
  );
}

export default App;
