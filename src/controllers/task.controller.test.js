import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { TaskService } from '../services/taskService.js';
import app from '../app.js';
import { ERROR_MESSAGES } from '../constants.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('creates a new task and returns 201 status', async () => {
    const newTask = {
      id: 1,
      name: 'Test Task',
      description: 'Test Description',
      author: 'Test Author',
      isComplete: false
    };
    const createStub = sinon.stub(TaskService.prototype, 'createTask').resolves(newTask);

    const res = await chai.request(app)
      .post('/task')
      .send(newTask);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('id');
    expect(createStub.calledOnce).to.be.true;
  });

  it('returns 500 status when task creation fails', async () => {
    const newTask = {
      name: '',
      description: 'Test Description',
      author: 'Test Author',
      isComplete: false
    };
    const createStub = sinon.stub(TaskService.prototype, 'createTask').rejects(new Error());
    const res = await chai.request(app)
      .post('/task')
      .send(newTask);

    expect(res).to.have.status(500);
    expect(createStub.calledOnce).to.be.true;
  });
});

describe('GET /', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('should returns all tasks and 200 status', async () => {
    const tasks = [
      {
        id: 1,
        name: 'Test Task',
        description: 'Test Description',
        author: 'Test Author',
        isComplete: false
      }];
    const getAllTasksStub = sinon.stub(TaskService.prototype, 'getAllTasks').resolves(tasks);
    const res = await chai.request(app)
      .get('/task');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(getAllTasksStub.calledOnce).to.be.true;
    expect(res.body[0]).to.have.property('id').eq(1);
    expect(res.body[0]).to.have.property('name').eq('Test Task');
  });

  it('should return 500 status when task retrieval fails', async () => {
    const getAllTasksStub = sinon.stub(TaskService.prototype, 'getAllTasks').rejects(new Error());
    const res = await chai.request(app)
      .get('/task');

    expect(res).to.have.status(500);
    expect(getAllTasksStub.calledOnce).to.be.true;
  });

});

describe('GET /:id', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('should return a task and 200 status', async () => {
    const task = {
      id: 1,
      name: 'Test Task',
      description: 'Test Description',
      author: 'Test Author'
    };
    const getTaskByIdStub = sinon.stub(TaskService.prototype, 'getTaskById').resolves(task);
    const res = await chai.request(app)
      .get('/task/1');

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('id').eq(1);
    expect(getTaskByIdStub.calledOnce).to.be.true;
  });

  it('should return 404 status when task is not found', async () => {
    const getTaskByIdStub = sinon.stub(TaskService.prototype, 'getTaskById').rejects(new Error('Task not found'));
    const res = await chai.request(app)
      .get('/task/1');

    expect(res).to.have.status(404);
    expect(getTaskByIdStub.calledOnce).to.be.true;
  });

  it('should return 500 status when task retrieval fails', async () => {
    const getTaskByIdStub = sinon.stub(TaskService.prototype, 'getTaskById').rejects(new Error());
    const res = await chai.request(app)
      .get('/task/1');

    expect(res).to.have.status(500);
    expect(getTaskByIdStub.calledOnce).to.be.true;
  });
});

describe('PUT /:id', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('should update a task and return 200 status', async () => {
    const updatedTask = {
      id: 1,
      name: 'Updated Task',
      description: 'Updated Description',
      author: 'Updated Author'
    };
    const updateTaskStub = sinon.stub(TaskService.prototype, 'updateTask').resolves(updatedTask);
    const res = await chai.request(app)
      .put('/task/1')
      .send(updatedTask);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('id').eq(1);
    expect(updateTaskStub.calledOnce).to.be.true;
  });

  it('should return 500 status when task update fails', async () => {
    const updatedTask = {
      id: 1,
      name: 'Updated Task',
      description: 'Updated Description',
      author: 'Updated Author'
    };
    const updateTaskStub = sinon.stub(TaskService.prototype, 'updateTask').rejects(new Error());
    const res = await chai.request(app)
      .put('/task/1')
      .send(updatedTask);
    expect(res).to.have.status(500);
    expect(updateTaskStub.calledOnce).to.be.true;
  });

  it('should return 500 status when task retrieval fails', async () => {
    const updatedTask = {
      id: 1,
      name: 'Updated Task',
      description: 'Updated Description',
      author: 'Updated Author'
    };
    const updateTaskStub = sinon.stub(TaskService.prototype, 'updateTask').rejects(new Error(ERROR_MESSAGES.TASK_NOT_FOUND));
    const res = await chai.request(app)
      .put('/task/1')
      .send(updatedTask);
    expect(res).to.have.status(404);
    expect(updateTaskStub.calledOnce).to.be.true;

  })
});

describe('DELETE /:id', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should delete a task and return 204 status', async () => {
    const deleteTaskStub = sinon.stub(TaskService.prototype, 'deleteTask').resolves();
    const res = await chai.request(app)
      .delete('/task/1');
    expect(res).to.have.status(200);
    expect(deleteTaskStub.calledOnce).to.be.true;
  });

  it('should return 500 status when task deletion fails', async () => {
    const deleteTaskStub = sinon.stub(TaskService.prototype, 'deleteTask').rejects(new Error());
    const res = await chai.request(app)
      .delete('/task/1');
    expect(res).to.have.status(500);
    expect(deleteTaskStub.calledOnce).to.be.true;
  })

  it('should return 404 status when task is not found', async () => {
    const deleteTaskStub = sinon.stub(TaskService.prototype, 'deleteTask').rejects(new Error(ERROR_MESSAGES.TASK_NOT_FOUND));
    const res = await chai.request(app)
      .delete('/task/1');
    expect(res).to.have.status(404);
    expect(deleteTaskStub.calledOnce).to.be.true;
  });
})
