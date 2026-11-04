const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let tasks = [
  {
    id: 1,
    title: 'Set up project structure',
    description: 'Initialize the task manager app foundation.',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Build task API',
    description: 'Create endpoints for listing and creating tasks.',
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

const sendTaskResponse = (res, statusCode, payload) => {
  res.status(statusCode).json(payload);
};

const normalizeTask = (taskInput) => {
  const title = typeof taskInput?.title === 'string' ? taskInput.title.trim() : '';
  const description = typeof taskInput?.description === 'string' ? taskInput.description.trim() : '';

  if (!title) {
    throw new Error('Task title is required');
  }

  return {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
    completed: Boolean(taskInput?.completed),
    createdAt: new Date().toISOString(),
  };
};

app.get('/', (req, res) => {
  sendTaskResponse(res, 200, {
    message: 'Task Manager API is running',
  });
});

app.get('/tasks', (req, res) => {
  sendTaskResponse(res, 200, { tasks });
});

app.get('/api/tasks', (req, res) => {
  sendTaskResponse(res, 200, { tasks });
});

app.post('/tasks', (req, res) => {
  try {
    const newTask = normalizeTask(req.body);
    tasks.push(newTask);
    sendTaskResponse(res, 201, {
      message: 'Task created successfully',
      task: newTask,
    });
  } catch (error) {
    sendTaskResponse(res, 400, {
      error: error.message,
    });
  }
});

app.post('/api/tasks', (req, res) => {
  try {
    const newTask = normalizeTask(req.body);
    tasks.push(newTask);
    sendTaskResponse(res, 201, {
      message: 'Task created successfully',
      task: newTask,
    });
  } catch (error) {
    sendTaskResponse(res, 400, {
      error: error.message,
    });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Task API running at http://localhost:${PORT}`);
  });
}

module.exports = app;

