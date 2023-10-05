const express = require('express');
const router = express.Router();

const validarParametros = (req, res, next) => {
  const { taskId } = req.params;

  if (!isValidTaskId(taskId)) {
    const errorHtml = "<h1>Error: Parámetro taskId no válido</h1>";
    return res.status(400).send(errorHtml);
  }

  next();
};

router.use('/:taskId', validarParametros);

router.get('/completed-tasks', (req, res) => {
  res.json([
    {
      id: 1,
      Tarea: "Estudiar HTML",
      Estado: "Completa"
    },
    {
      id: 2,
      Tarea: "Estudiar HTML",
      Estado: "Completa"
    },
    {
      id: 3,
      Tarea: "Avanzar en la plataforma",
      Estado: "Completa"
    },
    {
      id: 4,
      Tarea: "Estudiar Express",
      Estado: "Completa"
    },
  ]);
});

router.get('/incomplete-tasks', (req, res) => {
  res.json([
    {
      id: 1,
      Tarea: "Estudiar Node.js",
      Estado: "Incompleta"
    },
    {
      id: 2,
      Tarea: "Estudiar JavaScript",
      Estado: "Incompleta"
    },
    {
      id: 3,
      Tarea: "Terminar laboratorio de Express",
      Estado: "Incompleta"
    },
    {
      id: 4,
      Tarea: "Repasar enrutamiento",
      Estado: "Incompleta"
    },
  ]);
});

module.exports = router;
