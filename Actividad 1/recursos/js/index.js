async function obtenerDatos() {
    try {
        const respuesta = await fetch('./recursos/datos/productos.json');

        if (!respuesta.ok) {
            throw new Error(`Error al obtener los productos: ${respuesta.status}`);
        }

        const productos = await respuesta.json();
        renderizarProductos(productos);
        mostrarMensaje('Productos cargados correctamente.', 'exito');
    } catch (error) {
        console.error(error);
        mostrarMensaje('No se pudieron cargar los productos. Intenta nuevamente más tarde.', 'error');
    }
}

function renderizarProductos(productos) {
    const contenedor = document.querySelector('#contenedor');

    contenedor.innerHTML = productos.map(({ nombre, precio, stock }) => `
        <article class="producto">
            <h3 class="nombre">${nombre}</h3>
            <data class="precio" value="${precio}">Precio: $${precio}</data>
            <data class="stock" value="${stock}">Stock: ${stock}</data>
        </article>
    `).join('');
}

function mostrarMensaje(mensaje, tipo) {
    const estado = document.querySelector('#estado');
    estado.textContent = mensaje;
    estado.className = `mensaje ${tipo}`;
}

obtenerDatos();
