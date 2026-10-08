import express from "express";
import rutasModuloProductos from "./modulos/productos/productos.rutas.mjs";

const port = 3000;

const app = express();
app.use(rutasModuloProductos);

app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
