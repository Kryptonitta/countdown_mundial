const express = require("express");
const app = express();
const PORT = 8080;

// Datos de ejemplo de productos
const productos = [
	{ id: 1, nombre: "Producto 1" },
	{ id: 2, nombre: "Producto 2" },
	{ id: 3, nombre: "Producto 3" },
	{ id: 4, nombre: "Producto 4" },
	{ id: 5, nombre: "Producto 5" },
	{ id: 6, nombre: "Producto 6" },
	{ id: 7, nombre: "Producto 7" },
	{ id: 8, nombre: "Producto 8" },
	{ id: 9, nombre: "Producto 9" },
	{ id: 10, nombre: "Producto 10" },
];

// Ruta para obtener todos los productos o limitar el número de productos
app.get("/products", (req, res) => {
	const limit = req.query.limit;
	if (limit) {
		const limitedProducts = productos.slice(0, limit);
		res.json(limitedProducts);
	} else {
		res.json(productos);
	}
});

// Ruta para obtener un producto por su ID
app.get("/products/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const product = productos.find((item) => item.id === id);
	if (product) {
		res.json(product);
	} else {
		res.status(404).json({ error: "El producto no existe" });
	}
});

// Iniciar el servidor
app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});

//http://localhost:8080/products
