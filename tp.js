const fs = require("fs");
const urlApi = 'https://fakestoreapi.com/products';

// Obtener todos los productos
const todosProductos = () => 
    fetch(urlApi)
        .then(response => {
            if (!response.ok) throw new Error('Error ' + response.status);
            return response.json();
        })
        .then(datos => {
            console.log(datos); // Muestra todos los personajes
            return datos;
        })
        .catch(error => console.error(error));

todosProductos();

// archivo JSON
const guardarDatosEnJSON = async (nombreArchivo = "productos.json") => {
    const data = await todosProductos();
    fs.writeFileSync(nombreArchivo, JSON.stringify(data, null, 2), "utf-8");
    console.log(`Datos guardados en ${nombreArchivo}`);
};

guardarDatosEnJSON();

// Agregar un nuevo producto (POST) (funciona)
const nuevoProductoAgregado = (producto) => 
    fetch(urlApi, {
        method: "POST",
        body: JSON.stringify(producto),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if (!response.ok) throw new Error('Error ' + response.status);
        return response.json();
    })
    .then(datos => {
        console.log("Producto agregado:", datos);
        return datos;
    })
    .catch(error => console.error(error));

// Ejemplo
const nuevoProducto = {
    title: "Batidora",
    price: 300,
    description: "electrodomestico versastil",
    category: "electronics"
};
nuevoProductoAgregado(nuevoProducto);

// Buscar producto por ID (GET) (funciona)
const buscarProductoPorId = (id) =>
    fetch('https://fakestoreapi.com/products/') //modificar esto
        .then(response => {
            if (!response.ok) throw new Error('Error ' + response.status);
            return response.json();
        })
        .then(producto => {
            console.log("Producto encontrado:", producto);
            return producto;
        })
        .catch(error => console.error(error));

// Ejemplo
buscarProductoPorId(1);

// Eliminar producto (DELETE) (funciona)
const eliminarProducto = (id) =>
    fetch('https://fakestoreapi.com/products/', { method: "DELETE" })
        .then(response => {
            if (!response.ok) throw new Error('Error ' + response.status);
            return response.json();
        })
        .then(data => console.log(`Producto eliminado:`, data))
        .catch(error => console.error(error));

// Ejemplo
eliminarProducto(1);

// Modificar un producto (PUT) (funciona)
const modificarProducto = (id, nuevosDatos) =>
    fetch(`${urlApi}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevosDatos)
    })
    .then(response => {
        if (!response.ok) throw new Error('Error ' + response.status);
        return response.json();
    })
    .then(data => console.log(`Producto modificado:`, data))
    .catch(error => console.error(error));

// Ejemplo
const datosActualizados = {
    title: "nuevo producto",
    price: 300,
    description: "...",
    image: "https://i.pravatar.cc",
    category: "electronics"
};
modificarProducto(5, datosActualizados);
