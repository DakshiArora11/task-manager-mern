import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]); // Filtered tasks
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [message, setMessage] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const API_URL = 'http://localhost:5000/tasks';

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTaskId) {
      try {
        await axios.put(`${API_URL}/${editingTaskId}`, { title, description });
        setMessage('Task updated successfully!');
      } catch (error) {
        console.error(error);
        setMessage('Error updating task.');
      }
    } else {
      try {
        await axios.post(API_URL, { title, description, isCompleted: false });
        setMessage('Task created successfully!');
      } catch (error) {
        console.error(error);
        setMessage('Error creating task.');
      }
    }
    fetchTasks();
    setTitle('');
    setDescription('');
    setEditingTaskId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage('Task deleted successfully!');
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async (task) => {
    try {
      await axios.put(`${API_URL}/${task._id}`, { 
        title: task.title, 
        description: task.description, 
        isCompleted: !task.isCompleted 
      });
      setMessage(`Task marked as ${task.isCompleted ? 'Incomplete' : 'Completed'}!`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = (status) => {
    if (status === 'all') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(
        (task) => task.isCompleted === (status === 'completed')
      );
      setFilteredTasks(filtered);
    }
    setCurrentPage(1);
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div className="container">
      <h1>Task Manager</h1>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">{editingTaskId ? 'Update Task' : 'Add Task'}</button>
      </form>

      <div className="filter-buttons">
        <button onClick={() => handleFilter('all')}>All</button>
        <button onClick={() => handleFilter('completed')}>Completed</button>
        <button onClick={() => handleFilter('incomplete')}>Incomplete</button>
      </div>

      <ul className="task-list">
        {currentTasks.map((task) => (
          <li key={task._id} className={task.isCompleted ? 'completed' : ''}>
            <div>
              <strong>{task.title}</strong>: {task.description}
              <br />
              <small>Status: {task.isCompleted ? 'Completed' : 'Incomplete'}</small>
            </div>
            <div>
              <button onClick={() => handleComplete(task)}>
                {task.isCompleted ? 'Mark Incomplete' : 'Complete'}
              </button>
              <button onClick={() => setEditingTaskId(task._id)}>Edit</button>
              <button onClick={() => handleDelete(task._id)} className="delete">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination-container">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredTasks.length / tasksPerPage)}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastTask >= filteredTasks.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
