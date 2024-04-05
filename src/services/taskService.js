import { ERROR_MESSAGES } from '../constants.js';
import { Task } from '../database/models/task.js';

export class TaskService {

  async createTask  ({ name, description, author, isComplete }) {
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

  async getAllTasks () {
    const tasks = await Task.findAll({
      attributes: ['id', 'name', 'description', 'author', 'isComplete'],
      order: [['id', 'ASC']],
    });

    return tasks;
  };

  async getTaskById (id) {
    const task = await Task.findByPk(id, {
      attributes: ['id', 'name', 'description', 'author', 'isComplete'],
      order: [['id', 'ASC']],
    });

    if (!task) {
      throw new Error(ERROR_MESSAGES.TASK_NOT_FOUND);
    }

    return task;
  };

  async updateTask  (id, { name, description, author, isComplete }) {
    const task = await Task.findByPk(id);

    if (!task) {
      throw new Error(ERROR_MESSAGES.TASK_NOT_FOUND);
    }

    task.name = name;
    task.description = description;
    task.author = author;
    task.isComplete = isComplete;

    await task.save({
      attributes: ['id', 'name', 'description', 'author', 'isComplete'],
      order: [['id', 'ASC']],
    });

    return task;
  };

  async deleteTask (id) {
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
}

