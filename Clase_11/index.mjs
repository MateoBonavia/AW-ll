import express from "express";

const app = express();

const port = 3000;

app.listen(3000, () => console.log(`Servidor escuchando en el puerto ${port}`));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/estado", (req, res) => {
  res.json({
    compu: "PC-72",
    activo: true,
  });
});
