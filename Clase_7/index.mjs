import http, { createServer } from "node:http";

console.log("Inicio");
const servidor = createServer((req, res) => {
    if (req.url === '/') {
        console.log(`URL => ${req.url} - PETICION => ${req.method}`);
        return res.end("Hola hola");
    } 

    if (req.url === '/profile') {
        console.log(`URL => ${req.url} - PETICION => ${req.method}`);
        return res.end(`Perfil`);
    }

    res.end(`Error => ${res.statusCode}`);
});

const port = 3000;

servidor.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));