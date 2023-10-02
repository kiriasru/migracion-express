const express = require('express');
const router = express.Router();

router.get('/completed-tasks', (req, res) => {
    res.json([{
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
    res.json([{
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