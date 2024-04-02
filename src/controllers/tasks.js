import express, { response } from 'express';
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../services/taskService.js';
import { ERROR_MESSAGES } from '../constants.js';

const router = express.Router();

router.route('/').post(async (req, res) => {
  const { name, description, author, isComplete } = req.body;

  try {
    const newTask = await createTask({
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
  try {
    const tasks = await getAllTasks();

    res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json(ERROR_MESSAGES.ERROR_GETTING_TASKS);
  }
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  try {
    const task = await getTaskById(id);

    res.status(200).json(task);
  } catch (error) {
    if (error.message === ERROR_MESSAGES.TASK_NOT_FOUND) {
      return res.status(404).json(ERROR_MESSAGES.TASK_NOT_FOUND);
    }
    console.error(error);
    return res.status(500).json(ERROR_MESSAGES.ERROR_GETTING_TASK);
  }
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const { name, description, author, isComplete } = req.body;
  try {
    const task = await updateTask(id, {
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
    console.error(error);
    return res.status(500).json(ERROR_MESSAGES.ERROR_UPDATING_TASK);
  }
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  try {
    const task = await deleteTask(id);

    res.status(200).json(task);
  } catch (error) {
    if (error.message === ERROR_MESSAGES.TASK_NOT_FOUND) {
      return res.status(404).json(ERROR_MESSAGES.TASK_NOT_FOUND);
    }
    return res.status(500).json(messages.ERROR_DELETING_TASK);
  }
});

export default router;
