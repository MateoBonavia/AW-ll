import * as modelo from "./productos.modelo.mjs";

export function obtenerProductos(req, res) {
  const productos = modelo.obtenerProductos();
  res.json(productos);
}

export function obtenerProducto(req, res) {
  const producto = modelo.obtenerProducto(req.params.id);
  res.json(producto);
}
