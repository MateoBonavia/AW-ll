import express from "express";

const port = 3000;

const app = express();

app.listen(port, () => {
  console.log(`Servidor levantado y escuchando en el puerto ${port}`);
});

app.get("/", (req, res) => {
  res.end("Consulta recibida");
});
