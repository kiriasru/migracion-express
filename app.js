const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.json());

const data = JSON.parse(fs.readFileSync('data.json'));

// Rutas para la gestión de tareas
app.get('/tasks', (req, res) => {
  res.json({ tasks: data });
});

app.post('/tasks', (req, res) => {
  const task = {
    id: data.length + 1,
    title: req.body.title,
    completed: false,
  };
  data.push(task);
  res.status(201).json({ message: 'Tarea creada', task });
});

app.get('/tasks/:task_id', (req, res) => {
  const task_id = parseInt(req.params.task_id);
  const task = data.find((t) => t.id === task_id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

app.put('/tasks/:task_id', (req, res) => {
  const task_id = parseInt(req.params.task_id);
  const task = data.find((t) => t.id === task_id);
  if (task) {
    task.title = req.body.title;
    task.completed = req.body.completed;
    res.json({ message: 'Tarea actualizada', task });
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

app.delete('/tasks/:task_id', (req, res) => {
  const task_id = parseInt(req.params.task_id);
  const index = data.findIndex((t) => t.id === task_id);
  if (index !== -1) {
    data.splice(index, 1);
    res.json({ message: 'Tarea eliminada' });
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

app.get('/tasks/completed', (req, res) => {
  const completedTasks = data.filter((t) => t.completed);
  res.json({ completedTasks });
});

app.get('/tasks/incomplete', (req, res) => {
  const incompleteTasks = data.filter((t) => !t.completed);
  res.json({ incompleteTasks });
});

// Rutas para autenticación
const users = [
  { id: 1, username: 'usuario1', password: 'contraseña1' },
  { id: 2, username: 'usuario2', password: 'contraseña2' },
  { id: 3, username: 'usuario3', password: 'contraseña3' },
  { id: 4, username: 'usuario4', password: 'contraseña4' },
  { id: 5, username: 'usuario5', password: 'contraseña5' },
  { id: 6, username: 'usuario6', password: 'contraseña6' },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

app.get('/ruta-protegida', (req, res) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: 'Acceso concedido' });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
});

app.get('/', (req, res) => {
  res.send('Hola, mundo');
});

app.get('/tareas', (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
