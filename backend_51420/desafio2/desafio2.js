const fs = require ("fs");

//defino la clase Product Manager
class ProductManager {
	constructor(path) {
		this.path = path;
	}

// defino el metodo addProduct
addProduct(product){
    const products = this.getProducts();
    product.id = this.generateId(products);
    products.push(product);
    this.saveProducts(products);
}

// defino el metodo getProducts
getProducts() {
    try {
        const products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        return products;
    } catch (error) {
        return [];
    }
}

//implemento el método getProductById
getProductById(id) {
    const products = this.getProducts();
    const product = products.find((p) => p.id === id);
    if (!product) {
        console.error("Error: Producto no encontrado");
        return;
    }   
    return product;
}

//implemento el método updateProduct
updateProduct(id, product) {    
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
        console.error("Error: Producto no encontrado");
        return;
    }
    products[index] = { ...product, id };
    this.saveProducts(products);
}

//implemento el método deleteProduct
deleteProduct(id) {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
        console.error("Error: Producto no encontrado");
        return;
    }
    products.splice(index, 1);
    this.saveProducts(products);
}

//implemento el método generateId
generateId(products) {
    let maxId = 0;
    products.forEach((p) => {
        if (p.id > maxId) {
            maxId = p.id;
        }
    }
    return maxId + 1;
}

//implemento el método saveProducts
saveProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
}

}



// EJECUCIÓN
//Crear instancia de la clase ProductManager
const productManager = new ProductManager("productos.json");

// Agregar productos
productManager.addProduct({
    title: "Producto 1",
    description: "Color red",
    price: 10,
    thumbnail: "img1.png",
    code: "001",
    stock: 5,
});

// Obtener productos
const allProducts = productManager.getProducts();
console.log(allProducts);

// Obtener producto por id
const productById = productManager.getProductById(2);
console.log(productById);

// Actualizar producto
productManager.updateProduct(2, {
    title: "Producto 2",
    description: "Color blue",
    price: 15,
    thumbnail: "img2.png",
    code: "002",
    stock: 10,
});

//Eliminar producto
productManager.deleteProduct(1);

