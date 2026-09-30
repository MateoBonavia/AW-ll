import { leerJson } from './archivos.mjs';

const ARCHIVO_FRANQUICIAS = 'franquicias.json';

export { obtenerFranquicias, obtenerFranquiciaPorId };

/* Devuelve la lista completa de franquicias almacenadas en el archivo JSON. */
async function obtenerFranquicias() {
  return await leerJson(ARCHIVO_FRANQUICIAS);
}

/* Busca y devuelve la franquicia cuyo id coincide; null si no existe. */
async function obtenerFranquiciaPorId(id) {
  const franquicias = await leerJson(ARCHIVO_FRANQUICIAS);
  return franquicias.find((franquicia) => franquicia.id === Number(id)) ?? null;
}
