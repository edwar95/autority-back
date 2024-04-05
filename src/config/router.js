import indexRouter from '../routes/index.js';
import tasks from '../controllers/task.controller.js';

export default function (app) {
  app.use('/task', tasks);
  app.use('/', indexRouter);
}
