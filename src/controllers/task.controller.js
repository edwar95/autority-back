import express from 'express';
import { TaskService } from '../services/taskService.js';
import { ERROR_MESSAGES } from '../constants.js';

const router = express.Router();

router.route('/').post(async (req, res) => {
  const { name, description, author, isComplete } = req.body;
  const taskService = new TaskService();

  try {
    const newTask = await taskService.createTask({
      name,
      description,
      author,
      isComplete,
    });

    const resTask = {
      id: newTask.id,
      name: newTask.name,
      description: newTask.description,
      author: newTask.author,
      isComplete: newTask.isComplete,
    };
    res.status(201).json(resTask);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.route('/').get(async (req, res) => {
  const taskService = new TaskService();
  try {
    const tasks = await taskService.getAllTasks();

    res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json(ERROR_MESSAGES.ERROR_GETTING_TASKS);
  }
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const taskService = new TaskService();
  try {
    const task = await taskService.getTaskById(id);

    res.status(200).json(task);
  } catch (error) {
    if (error.message === ERROR_MESSAGES.TASK_NOT_FOUND) {
      return res.status(404).json(ERROR_MESSAGES.TASK_NOT_FOUND);
    }
    return res.status(500).json(ERROR_MESSAGES.ERROR_GETTING_TASK);
  }
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const { name, description, author, isComplete } = req.body;
  const taskService = new TaskService();

  try {
    const task = await taskService.updateTask(id, {
      name,
      description,
      author,
      isComplete,
    });

    const resTask = {
      id: task.id,
      name: task.name,
      description: task.description,
      author: task.author,
      isComplete: task.isComplete,
    };
    res.status(200).json(resTask);
  } catch (error) {
    if (error.message === ERROR_MESSAGES.TASK_NOT_FOUND) {
      return res.status(404).json(ERROR_MESSAGES.TASK_NOT_FOUND);
    }
    return res.status(500).json(ERROR_MESSAGES.ERROR_UPDATING_TASK);
  }
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  const taskService = new TaskService();
  try {
    const task = await taskService.deleteTask(id);

    res.status(200).json(task);
  } catch (error) {
    if (error.message === ERROR_MESSAGES.TASK_NOT_FOUND) {
      return res.status(404).json(ERROR_MESSAGES.TASK_NOT_FOUND);
    }
    return res.status(500).json(ERROR_MESSAGES.ERROR_DELETING_TASK);
  }
});

export default router;
