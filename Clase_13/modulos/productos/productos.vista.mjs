export function obtenerProductos(datos) {
  datos.map((f) => {
    return {
      id: f.id,
      franquicia: f.franquicia,
      valor: f.valor,
      color: f.color,
    };
  });
}
