import express from "express";
import dotenv from "dotenv";
import pool from "./db_connection.mjs";

// https://node-postgres.com/ => Documentación de dependencia pg.

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/productos", async (req, res) => {
  const response = await pool.query("SELECT * FROM productos");
  console.log(response);
  res.json(response.rows);
});

app.get("/api/v1/productos/:id", async (req, res) => {
  const id = Number(req.params.id);

  const response = await pool.query("SELECT * FROM productos WHERE id=$1", [
    id,
  ]);
  console.log(response.rows);
  res.json(response.rows);
});

app.delete("/api/v1/productos/:id", async (req, res) => {
  const id = Number(req.params.id);

  await pool.query("DELETE FROM productos WHERE id=$1", [id]);
  const response = await pool.query("SELECT * FROM productos");
  console.log(response.rows);
  res.json({
    message: "ok",
    productos: response.rows,
  });
});

app.post("/api/v1/productos", async (req, res) => {
  const body = req.body;

  await pool.query("INSERT INTO productos(producto, precio) VALUES($1, $2)", [
    body.producto,
    body.precio,
  ]);
  const response = await pool.query("SELECT * FROM productos");
  // console.log(body);
  res.json(response);
});

app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
