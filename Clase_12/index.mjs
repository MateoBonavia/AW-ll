import express from "express";
import { verifyKey } from "./middleware.mjs";

const app = express();

const port = 3000;

const data = [
  {
    compu: "PC-72",
    activo: true,
  },
];

app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

app.get("/estado", (req, res) => {
  res.json(data);
});

app.post("/estado", verifyKey, (req, res) => {
  const { key, ...newData } = req.body;
  data.push(newData);

  res.json(data);
});

app.listen(3000, () => console.log(`Servidor escuchando en el puerto ${port}`));
