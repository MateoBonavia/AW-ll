import http, { createServer } from "node:http";

const servidor = createServer((req, res) => {
    console.log(req);
    res.end("Hola hola");
});

const port = 3000;

servidor.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));