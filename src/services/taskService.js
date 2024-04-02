import { ERROR_MESSAGES } from '../constants.js';
import { Task } from '../database/models/task.js';

export const createTask = async ({ name, description, author, isComplete }) => {
  try {
    const newTask = await Task.create({
      name,
      description,
      author,
      isComplete,
    });

    return newTask;
  } catch (error) {
    throw new Error(error.message || ERROR_MESSAGES.ERROR_CREATING_TASK);
  }
};

export const getAllTasks = async () => {
  const tasks = await Task.findAll({
    attributes: ['id', 'name', 'description', 'author', 'isComplete'],
    order: [['id', 'ASC']],
  });

  return tasks;
};

export const getTaskById = async (id) => {
  const task = await Task.findByPk(id, {
    attributes: ['id', 'name', 'description', 'author', 'isComplete'],
    order: [['id', 'ASC']],
  });

  if (!task) {
    throw new Error(ERROR_MESSAGES.TASK_NOT_FOUND);
  }

  return task;
};

export const updateTask = async (id, { name, description, author, isComplete }) => {
  const task = await Task.findByPk(id);

  if (!task) {
    throw new Error(ERROR_MESSAGES.TASK_NOT_FOUND);
  }

  task.name = name || task.name;
  task.description = description || task.description;
  task.author = author || task.author;
  task.isComplete = isComplete || task.isComplete;

  await task.save({
    attributes: ['id', 'name', 'description', 'author', 'isComplete'],
    order: [['id', 'ASC']],
  });

  return task;
};

export const deleteTask = async (id) => {
  const task = await Task.findByPk(id, {
    attributes: ['id', 'name', 'description', 'author', 'isComplete'],
    order: [['id', 'ASC']],
  });

  if (!task) {
    throw new Error(ERROR_MESSAGES.TASK_NOT_FOUND);
  }

  await task.destroy();

  return task;
};
