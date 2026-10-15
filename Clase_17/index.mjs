import express from "express";
import dotenv from "dotenv";
import pool from "./db_connection.mjs";

// https://node-postgres.com/ => Documentación de dependencia pg.

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.get("/api/v1/productos", async (req, res) => {
  const response = await pool.query("SELECT * FROM productos");
  console.log(response);
  res.json(response.rows);
});

app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
