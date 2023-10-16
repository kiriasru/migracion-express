const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const validarMetodoHTTP = (req, res, next) => {
  const metodosValidos = ['GET', 'POST', 'PUT', 'DELETE'];

  if (!metodosValidos.includes(req.method)) {
    return res.status(405).json({ error: 'Método HTTP no permitido.' });
  }

  next();
};

const errorHandler = (req, res, next) => {
  const { method, body } = req;

  if ((method === 'POST' || method === 'PUT') && Object.keys(body).length === 0) {
    return res.status(400).json({ error: 'El cuerpo de la solicitud no puede estar vacío.' });
  }

  if (method === 'POST' && (!body.nombre || !body.descripcion)) {
    return res.status(400).json({ error: 'La solicitud POST debe incluir nombre y descripción.' });
  }

  if (method === 'PUT' && (!body.nombre || !body.descripcion)) {
    return res.status(400).json({ error: 'La solicitud PUT debe incluir nombre y descripción.' });
  }

  next();
};

router.use(errorHandler);

router.post('/create-task', (req, res) => {
  const { tarea, estado } = req.body;

  if (!tarea || !estado) {
    return res.status(400).json({ error: 'Se requieren tanto la tarea como el estado.' });
  }

  const taskId = uuidv4();

  const nuevaTarea = {
    id: taskId,
    tarea,
    estado
  };

  res.status(201).json(nuevaTarea);
});

router.delete('/delete-task/:taskId', (req, res) => {
  const taskId = req.params.taskId;

  const tareaAEliminar = database.find((tarea) => tarea.id === taskId);

  if (!tareaAEliminar) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  const indice = database.indexOf(tareaAEliminar);
  database.splice(indice, 1);

  res.status(204).send();
});

router.put('/update-task/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const { tarea, estado } = req.body;

  const tareaAActualizar = database.find((t) => t.id === taskId);

  if (!tareaAActualizar) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tareaAActualizar.tarea = tarea || tareaAActualizar.tarea;
  tareaAActualizar.estado = estado || tareaAActualizar.estado;

  res.json(tareaAActualizar);
});

module.exports = router;
