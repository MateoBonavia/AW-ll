import express from "express";

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

const verifyKey = (req, res, next) => {
  const key = req.body["key"];
  if (key === "RacingCampeonCopaArgentina2026") {
    next();
  } else {
    res.status(403).json({ error: "Key invalida" });
  }
};

app.get("/estado", (req, res) => {
  res.json(data);
});

app.post("/estado", verifyKey, (req, res) => {
  const { key, ...newData } = req.body;
  data.push(newData);

  res.json(data);
});

app.listen(3000, () => console.log(`Servidor escuchando en el puerto ${port}`));
