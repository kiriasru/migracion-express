const express = require('express');
const router = express.Router();

router.get('/completed-tasks', (req, res) => {
    res.json([{
        id: 1,
        Tarea: "Estudiar HTML",
        Estado: "Completada"
    },
    {
        id: 2,
        Tarea: "Estudiar HTML",
        Estado: "Completada"
    },
    {
        id: 3,
        Tarea: "Avanzar en la plataforma",
        Estado: "Completada"
    },
    {
        id: 4,
        Tarea: "Estudiar Express",
        Estado: "Completada"
    },
    ]);
});