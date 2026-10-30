import express from 'express';
import path from 'node:path';
import pool from './db_connection.mjs';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

const PORT = 3000;

const app = express();

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.post('/autenticacion', async (req, res) => {
  const { usuario, pass } = req.body;

  const resultado = await pool.query(
    'SELECT * FROM usuarios WHERE username = $1',
    [usuario]
  );

  const existe = await bcrypt.compare(pass, resultado.rows[0].password_hash);

  if (existe) {
    const sessionId = nanoid();

    await pool.query('UPDATE usuarios SET session_id = $1 WHERE id = $2', [
      sessionId,
      resultado.rows[0].id,
    ]);

    // Cookie
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 10, // Milisegundos
    });

    return res.redirect('/admin');
  }
  res.redirect('/login');
});

app.post('/registrar', async (req, res) => {
  try {
    const { usuario, pass } = req.body;

    const salt = await bcrypt.genSalt(10);
    const clave_hasheada = await bcrypt.hash(pass, salt);

    console.log('🚀 === CLAVE HASHEADA === 🚀');
    console.log(clave_hasheada);

    const resultado = await pool.query(
      'INSERT INTO usuarios(username, password_hash) VALUES ($1, $2)',
      [usuario, clave_hasheada]
    );

    // console.log(resultado);

    res.redirect('/login');
  } catch (e) {
    console.log(e);
  }
});

// Estaticos
async function verificarCookie(req, res, next) {
  const sessionId = req.cookies.sessionId;
  try {
    const resultado = await pool.query(
      'SELECT id FROM usuarios WHERE session_id = $1',
      [sessionId]
    );

    if (resultado.rows.length === 0) {
      return res.redirect('/login?autorizado=false');
    }

    next();
  } catch (e) {
    res.status(500).send(`Error => ${e}`);
  }
}

app.use('/admin', verificarCookie, express.static(path.resolve('./front')));
app.use('/login', express.static(path.resolve('./login')));
