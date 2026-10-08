import productos from "../../datos/productos.mjs";

// GET todos
export function obtenerProductos() {
  return productos;
}

// GET uno
export function obtenerProducto(id) {
  return productos.filter((p) => Number(p.id) === Number(id));
}
