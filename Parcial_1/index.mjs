import express from 'express';
import {
  obtenerFranquicias,
  obtenerFranquiciaPorId,
} from './modulos/franquicias.mjs';
import { calcularFranquiciaMasValiosa } from './modulos/procedimiento.mjs';
import { guardarResultadoProcedimiento } from './modulos/middleware.mjs';

const app = express();

const port = 3000;

app.use(express.json());

/* Devuelve todas las franquicias almacenadas. */
app.get('/franquicias', async (req, res) => {
  try {
    const franquicias = await obtenerFranquicias();
    res.json(franquicias);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error al obtener las franquicias' });
  }
});

/* Devuelve la franquicia solicitada por su id. */
app.get('/franquicias/:id', async (req, res) => {
  try {
    const franquicia = await obtenerFranquiciaPorId(req.params.id);
    if (!franquicia) {
      return res.status(404).json({ error: 'Franquicia no encontrada' });
    }
    res.json(franquicia);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error al obtener la franquicia' });
  }
});

/* Ejecuta el procedimiento y guarda su resultado mediante el middleware. */
app.get(
  '/procedimiento/franquicia-mas-valiosa',
  guardarResultadoProcedimiento,
  async (req, res) => {
    try {
      const resultado = await calcularFranquiciaMasValiosa();
      res.json(resultado);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Error al ejecutar el procedimiento' });
    }
  }
);

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
