class ProductManager {
	constructor() {
		this.products = []; // Arreglo vacío de productos
		this.nextProductId = 1; // Id autoincrementable
	}

	addProduct(product) {
		// Validar que todos los campos sean obligatorios
		if (
			!product.title ||
			!product.description ||
			!product.price ||
			!product.thumbnail ||
			!product.code ||
			!product.stock
		) {
			console.error("Error: Todos los campos son obligatorios");
			return;
		}

		// Validar que no se repita el campo "code"
		if (this.products.some((p) => p.code === product.code)) {
			console.error("Error: Ya existe un producto con ese código");
			return;
		}

		// Agregar producto con id autoincrementable
		const newProduct = { ...product, id: this.nextProductId };
		this.products.push(newProduct);
		this.nextProductId++;
	}

	getProducts() {
		return this.products;
	}

	getProductById(id) {
		const product = this.products.find((p) => p.id === id);
		if (!product) {
			console.error("Error: Producto no encontrado");
			return;
		}
		return product;
	}
}

// EJECUCIÓN

// Crear instancia de la clase ProductManager
const productManager = new ProductManager();

// Agregar productos
productManager.addProduct({
	title: "Producto 1",
	description: "Color red",
	price: 10,
	thumbnail: "img1.png",
	code: "001",
	stock: 5,
});

productManager.addProduct({
	title: "Producto 2",
	description: "Color blue",
	price: 15,
	thumbnail: "img2.png",
	code: "002",
	stock: 10,
});

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log(allProducts);

// Obtener producto por id
const productById = productManager.getProductById(2);
console.log(productById);

// Obtener producto inexistente
const nonexistentProduct = productManager.getProductById(5);
console.log(nonexistentProduct);
