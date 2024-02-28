import React, { useState } from 'react';
import './App.css';

const initialTasks = [
  {
    "id": 1,
    "task": "Install Node JS",
    "taskStatus": true
  },
  {
    "id": 2,
    "task": "Install VS Code",
    "taskStatus": false
  },
  {
    "id": 3,
    "task": "Create React Application",
    "taskStatus": false
  },
  {
    "id": 4,
    "task": "Run React Application",
    "taskStatus": false
  },
  {
    "id": 5,
    "task": "Review the project structure",
    "taskStatus": false
  },
  {
    "id": 6,
    "task": "Rendering JSON list",
    "taskStatus": false
  },
  {
    "id": 7,
    "task": "Using UseState",
    "taskStatus": false
  },
  {
    "id": 8,
    "task": "Adding Hooks",
    "taskStatus": false
  }
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: prevTasks.length + 1,
          task: newTask,
          taskStatus: false,
        },
      ]);
      setNewTask('');
    }
  };

  const toggleTaskStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, taskStatus: !task.taskStatus } : task
      )
    );
  };

  const removeCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.taskStatus));
  };

  return (
    <div className="App">
      <h1>React To Do List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ textDecoration: task.taskStatus ? 'line-through' : 'none' }}
          >
            {task.task}
            <input
              type="checkbox"
              checked={task.taskStatus}
              onChange={() => toggleTaskStatus(task.id)}
            />
          </li>
        ))}
      </ul>
      <button onClick={removeCompletedTasks}>Remove Completed Tasks</button>
    </div>
  );
}

export default App;

