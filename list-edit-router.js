// list-edit-router.js
const express = require('express');
const router = express.Router();

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



router.put('/update-task/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  
});

module.exports = router;
