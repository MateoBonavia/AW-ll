import fsp from "node:fs/promises";
import path from "node:path";

const ruta = path.join("./usuario.json");

try {
  const fileContent = await fsp.readFile(ruta, "utf8");
  const dataParsed = JSON.parse(fileContent);
  const newData = { ...dataParsed, apellido: "Bonavia" };
  const updated = JSON.stringify(newData);
  await fsp.writeFile(ruta, updated, "utf8");
} catch (e) {
  console.log(error.message);
}

let usuario = "";
try {
  usuario = await fsp.readFile(ruta, "utf8");
} catch (e) {
  console.log(error.message);
}

const objetoUsuario = JSON.parse(usuario);
console.log(objetoUsuario.apellido);
