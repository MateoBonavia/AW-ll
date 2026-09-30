import fsp from 'node:fs/promises';
import path from 'node:path';

const CARPETA_DATOS = path.join(import.meta.dirname, '..', 'data');

export { leerJson, escribirJson };

/* Lee un archivo JSON de la carpeta de datos y devuelve su contenido parseado. */
async function leerJson(nombreArchivo) {
  try {
    const ruta = path.join(CARPETA_DATOS, nombreArchivo);
    const contenido = await fsp.readFile(ruta, 'utf-8');
    return JSON.parse(contenido);
  } catch (error) {
    console.error(`Error al leer el archivo ${nombreArchivo}:`, error.message);
    throw error;
  }
}

/* Serializa los datos recibidos y los persiste en un archivo JSON. */
async function escribirJson(nombreArchivo, datos) {
  try {
    const ruta = path.join(CARPETA_DATOS, nombreArchivo);
    await fsp.writeFile(ruta, JSON.stringify(datos, null, 2), 'utf-8');
  } catch (error) {
    console.error(
      `Error al escribir el archivo ${nombreArchivo}:`,
      error.message
    );
    throw error;
  }
}
