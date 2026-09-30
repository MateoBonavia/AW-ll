import { escribirJson } from './archivos.mjs';

const ARCHIVO_RESULTADO = 'resultado-procedimiento.json';

export { guardarResultadoProcedimiento };

/* Middleware que intercepta la respuesta del procedimiento y guarda su resultado en un JSON. */
function guardarResultadoProcedimiento(req, res, next) {
  const enviarJson = res.json.bind(res);

  res.json = async (datos) => {
    try {
      await escribirJson(ARCHIVO_RESULTADO, datos);
    } catch (error) {
      console.error('Error al guardar el resultado del procedimiento:', error.message);
    }
    return enviarJson(datos);
  };

  next();
}
