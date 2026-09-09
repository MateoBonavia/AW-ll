import express from "express";

const port = 3000;

const app = express();

app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

app.get("/", (req, res) => {
  const users = [
    {
      nombre: "Mateo",
      apellido: "Bonavia",
    },
    {
      nombre: "Lionel",
      apellido: "Messi",
    },
  ];

  res.json({
    message: "OK",
    data: users,
  });
});

app.post("/", (req, res) => {
  res.json({
    message: `Usuario ${req.body.name} creado correctamete!`,
  });
});

app.get("/:id", (req, res) => {
  const user = {
    nombre: "Mateo",
    apellido: "Bonavia",
  };
  res.json(user);
});
