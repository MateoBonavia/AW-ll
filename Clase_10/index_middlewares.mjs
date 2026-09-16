import express from "express";

const port = 3000;

const app = express();

const mid = (req, res, next) => {
  console.log("Middleware ejecutado.");
  next();
};

app.use(mid);

app.listen(port, () => {
  console.log(`Servidor levantado y escuchando en el puerto ${port}`);
});

app.get("/", mid, (req, res) => {
  res.end("Consulta recibida");
});
