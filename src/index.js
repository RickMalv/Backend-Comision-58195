const ProductManager = require("./ProductManger");

const manager = new ProductManager("./src/products.json");

async function cargarArchivos() {
  await manager.addProduct({
    title: "prueba1",
    description: "first product",
    price: 100,
    thumbnail: "imagen1",
    code: 1,
    stock: 10,
  });
  await manager.addProduct({
    title: "prueba2",
    description: "second product",
    price: 100,
    thumbnail: "imagen2",
    code: 2,
    stock: 10,
  });

  const products = await manager.getProducts();
  console.log(products);

  await manager.getProductById(2);

  await manager.updateProduct(3, { title: "actualizado" });
}

cargarArchivos();
