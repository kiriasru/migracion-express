const express = require('express')
const app = express()
const port = 8080;
const tareas = [
    {
        id: 1,
        isCompleted: false,
        description: "Estudiar HTML y CSS"
    },
    {
        id: 2,
        isCompleted: false,
        description: "Practicar con Express"
    },
    {
        id: 3,
        isCompleted: false,
        description: "Avanzar en la plataforma"
    },
    {
        id: 4,
        isCompleted: false,
        description: "Preparar la cena"
    },
    {
        id: 5,
        isCompleted: false,
        description: "Revisar trabajos de mis estudiantes"
    }
]

app.get('/', (req, res) => {
    res.send("Hola, mundo")
});

app.get('/tareas', (req, res) => {
    res.json(tareas)
});

app.listen(port, () => {
    console.log('Server running on port', port);
});