// backend/controllers/taskController.js
const Task = require('../models/Task');

// GET /tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch tasks' });
  }
};

// POST /tasks
const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = new Task({ title, description });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create task' });
  }
};

// PUT /tasks/:id
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;
  try {
    const updated = await Task.findByIdAndUpdate(
      id,
      { title, description, isCompleted },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update task' });
  }
};

// DELETE /tasks/:id
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete task' });
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
