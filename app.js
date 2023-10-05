const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

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

const tareas = [
  {
    id: 1,
    isCompleted: false,
    description: 'Estudiar HTML y CSS',
  },
  {
    id: 2,
    isCompleted: false,
    description: 'Practicar con Express',
  },
  {
    id: 3,
    isCompleted: false,
    description: 'Avanzar en la plataforma',
  },
  {
    id: 4,
    isCompleted: false,
    description: 'Preparar la cena',
  },
  {
    id: 5,
    isCompleted: false,
    description: 'Revisar trabajos de mis estudiantes',
  },
];

app.get('/', (req, res) => {
  res.send('Hola, mundo');
});

app.get('/tareas', (req, res) => {
  res.json(tareas);
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
