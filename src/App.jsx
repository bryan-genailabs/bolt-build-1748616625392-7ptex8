import React, { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (taskInput) {
      setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        className="border p-2 w-full mb-2"
        placeholder="Add a new task"
      />
      <button onClick={addTask} className="bg-blue-500 text-white p-2 mb-4">Add Task</button>
      <div className="flex justify-between mb-4">
        <span>{filteredTasks.length} tasks left</span>
        <button onClick={clearCompleted} className="text-red-500">Clear Completed</button>
      </div>
      <div>
        {filteredTasks.map(task => (
          <div key={task.id} className="flex justify-between items-center mb-2">
            <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
            <div>
              <button onClick={() => toggleTask(task.id)} className="text-green-500">Toggle</button>
              <button onClick={() => deleteTask(task.id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-around mt-4">
        <button onClick={() => setFilter('all')} className="p-2">All</button>
        <button onClick={() => setFilter('active')} className="p-2">Active</button>
        <button onClick={() => setFilter('completed')} className="p-2">Completed</button>
      </div>
    </div>
  );
};

export default App;