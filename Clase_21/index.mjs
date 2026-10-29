import express from "express";
import path from "node:path";
import pool from "./db_connection.mjs";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
// nanoId <= Para el sessionId

const PORT = 3000;

const app = express();

const tablaUsuario = {
  nombre: "admin",
  pass: "123",
};

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.post("/autenticacion", async (req, res) => {
  const { usuario, pass } = req.body;

  const resultado = await pool.query(
    "SELECT * FROM usuarios WHERE username = $1",
    [usuario],
  );

  const existe = await bcrypt.compare(pass, resultado.rows[0].password_hash);

  if (existe) {
    // Cookie
    res.cookie("sessionId", resultado.rows[0].sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 1000 * 10, // Milisegundos
    });

    return res.redirect("/admin");
  }
  res.redirect("/login");
});

app.post("/registrar", async (req, res) => {
  try {
    const { usuario, pass } = req.body;

    const salt = await bcrypt.genSalt(10);
    const clave_hasheada = await bcrypt.hash(pass, salt);

    console.log("🚀 === CLAVE HASHEADA === 🚀");
    console.log(clave_hasheada);

    const resultado = await pool.query(
      "INSERT INTO usuarios(username, password_hash) VALUES ($1, $2)",
      [usuario, clave_hasheada],
    );

    // console.log(resultado);

    res.redirect("/login");
  } catch (e) {
    console.log(e);
  }
});

// Estaticos
function verificarCookie(req, res, next) {
  console.log(req.cookies);
  if (req.cookies.sessionId === "123456") {
    return next();
  }
  res.redirect("/login?autorizado=false");
}

app.use("/admin", verificarCookie, express.static(path.resolve("./front")));
app.use("/login", express.static(path.resolve("./login")));
