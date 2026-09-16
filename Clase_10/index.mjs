import express from "express";

const port = 3000;

const app = express();

app.use(express.json());
app.use(express.static("./web"));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Servidor levantado y escuchando en el puerto ${port}`);
});

app.get("/", (req, res) => {
  res.end("Consulta recibida");
});

app.post("/", (req, res) => {
  const { nombre, apellido, edad } = req.body;
  console.log(
    `Recibida la informaciòn del usuario ${apellido} ${nombre} (${edad}).`,
  );
  res.status(200).end();
});
