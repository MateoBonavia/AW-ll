import express from "express";
import dotenv from "dotenv";
import pool from "./db_connection.mjs";
import path from "node:path";
import multer from "multer";

dotenv.config();

const port = process.env.PORT || 3000;

const subirArchivos = multer({
  dest: path.resolve("archivos"),
}).single("archivo");

// subirArchivos.single("archivo");

const app = express();

app.post("/subir", (req, res) => {
  subirArchivos(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        message: "No se pudo subir la imagen",
      });
    }
    try {
      req.file.path;
      const result = await pool.query(
        `INSERT INTO productos(producto, precio, imagen) VALUES ($1, $2, $3)`,
        [req.body.producto, req.body.precio, req.body.file],
      );
    } catch (e) {}
    res.json({ message: "Datos cargados" });
  });
});

app.use(express.static(path.resolve("public")));
app.use("/archivos", express.static(path.resolve("archivos")));

app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
