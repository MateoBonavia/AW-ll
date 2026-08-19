// En el package.json el type puede ser CommonJS (viejo) o ESModules.
// Uso import ya que estoy utilizando ESModules.
import os from 'node:os';
// import { readFile } from 'node:fs/promises';
import fsp from 'node:fs/promises';

const contenido = await fsp.readFile('./text.txt', 'utf8');

console.log(contenido);

// console.log(os.totalmem());