import assert from 'assert';
import sinon from 'sinon';
import { TaskService } from './taskService.js';
import { Task } from '../database/models/task.js';
import { ERROR_MESSAGES } from '../constants.js';

describe('TaskService', () => {

  beforeEach(() => {
    sinon.restore();
  });

  describe('createTask', () => {

    it('should create a new task', async () => {
      const createStub = sinon.stub(Task, 'create').resolves({ id: 1, name: 'Task 1' });
      const service = new TaskService();
      const task = await service.createTask({ name: 'Task 1', description: 'Description' });

      assert(
        createStub.calledOnceWith({
          name: 'Task 1',
          description: 'Description',
          author: undefined,
          isComplete: undefined
        })
      );
      assert.strictEqual(task.id, 1);
      assert.strictEqual(task.name, 'Task 1');
      createStub.restore();
    });
    it('should throw an error if name is not provided', async () => {
      const service = new TaskService();
      try {
        await service.createTask({ description: 'Description', author: 'Author', isComplete: false });
      } catch (error) {
        assert.strictEqual(error.message, 'notNull Violation: todo.name cannot be null');
      }
    });

    it('should throw ERROR_CREATING error if name is not provided', async () => {
      const service = new TaskService();
      sinon.stub(Task, 'create').rejects(new Error(ERROR_MESSAGES.ERROR_CREATING_TASK));
      try {
        await service.createTask({ name: 'Task 1', description: 'Description' });
      } catch (e) {
        assert.strictEqual(e.message, ERROR_MESSAGES.ERROR_CREATING_TASK);
      }
    });

  });

  describe('getAllTasks', () => {

    it('should get all tasks', async () => {
      const getStub = sinon.stub(Task, 'findAll').resolves([{ id: 1, name: 'name' }]);
      const service = new TaskService();
      const tasks = await service.getAllTasks();

      assert(tasks.length === 1);
      assert(getStub.calledOnce, true);
    });

  });

  describe('getTaskById', () => {

    it('should get a task by id', async () => {
      const getStub = sinon.stub(Task, 'findByPk').resolves({ id: 1, name: 'name' });
      const service = new TaskService();
      const task = await service.getTaskById(1);

      assert.strictEqual(task.id, 1);
      assert(getStub.calledOnceWith(1));
    });

    it('should throw an error if id is not provided', async () => {
      const getStub = sinon.stub(Task, 'findByPk').resolves();
      const service = new TaskService();
      try {
        await service.getTaskById(1);
      } catch (e) {
        assert(getStub.calledOnce, true);
        assert.strictEqual(e.message, ERROR_MESSAGES.TASK_NOT_FOUND);
      }
    });

  });

  describe('updateTask', () => {

    it('should update a task', async () => {
      const saveStub = sinon.stub().resolves();
      const task = {
        id: 1,
        name: 'Task 1',
        author: 'Author',
        isComplete: false,
        description: 'Description',
        save: saveStub
      };
      const findStub = sinon.stub(Task, 'findByPk').resolves(task);
      const service = new TaskService();
      const savedTask = await service.updateTask(
        task.id,
        { name: 'Task Updated Name', description: 'Description' });

      assert.strictEqual(task.id, savedTask.id);
      assert.strictEqual(savedTask.name, 'Task Updated Name');
      assert.strictEqual(findStub.calledOnce, true);
      assert.strictEqual(saveStub.calledOnce, true);
    });

    it('should throw an error if id is not provided', async () => {
      const findStub = sinon.stub(Task, 'findByPk').resolves();
      const service = new TaskService();

      try {
        await service.updateTask(1, {});
      } catch (e) {
        assert(e.message, ERROR_MESSAGES.TASK_NOT_FOUND);
      }

    });
  });

  describe('deleteTask', () => {

    it('should delete a task', async () => {
      const destroyStub = sinon.stub().resolves();
      const task = {
        id: 1,
        name: 'Task 1',
        author: 'Author',
        isComplete: false,
        description: 'Description',
        destroy: destroyStub
      };
      const findStub = sinon.stub(Task, 'findByPk').resolves(task);
      const service = new TaskService();
      const deletedTask = await service.deleteTask(task.id);

      assert.strictEqual(deletedTask.id, 1);
      assert.strictEqual(destroyStub.calledOnce, true);
      assert.strictEqual(findStub.calledOnce, true);
    });

    it('should throw an error if id is not provided', async () => {
      const findStub = sinon.stub(Task, 'findByPk').resolves();
      const service = new TaskService();
      try {
        await service.deleteTask(1);
      } catch (e) {
        assert(e.message, ERROR_MESSAGES.TASK_NOT_FOUND);
        assert.strictEqual(findStub.calledOnce, true);
      }
    });
  });
});
