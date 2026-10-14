import { Router } from "express";
import { URL_BASE } from "../../.config.mjs";
import * as controlador from "./productos.controlador.mjs";

const rutasModuloProductos = new Router();

rutasModuloProductos.get(`${URL_BASE}/productos`, controlador.obtenerProductos);
rutasModuloProductos.get(`${URL_BASE}/productos/:id`, controlador.obtenerProducto);

export default rutasModuloProductos;
