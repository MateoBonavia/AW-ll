import express from 'express';

const app = express();

const port = 3000;

app.listen(port, `Servidor escuchando en el puerto ${port}`);

app.use(express.json());

app.get('/', (req, res) => {});

app.get('/:id', (req, res) => {});