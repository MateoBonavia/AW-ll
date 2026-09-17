import express from "express";

const app = express();

const port = 3000;

const data = [
  {
    compu: "PC-72",
    activo: true,
  },
];

app.listen(3000, () => console.log(`Servidor escuchando en el puerto ${port}`));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/estado", (req, res) => {
  res.json(data);
});

app.post("/estado", (req, res) => {
  data.push(req.body);

  res.json(data);
});
