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
  const users = [
    {
      id: 1,
      nombre: "Mateo",
      apellido: "Bonavia",
    },
    {
      id: 2,
      nombre: "Lionel",
      apellido: "Messi",
    },
  ];

  const user = users.filter((u) => Number(u.id) === Number(req.params.id));

  if (user.length > 0) {
    res.status(200).json({
      message: `Encontrado el usuario con el id ${req.params.id}`,
      data: user,
    });
  } else {
    res.status(404).json({
      message: `Usuario con el id ${req.params.id} no encotrado`,
      data: [],
    });
  }
});
