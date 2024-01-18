const ProductManager = require("./ProductManger");

const manager = new ProductManager('./src/products.json');

async function cargarArchivos(){
    await manager.addProduct({description: 'first product'})
    await manager.addProduct({description: 'second product'})

    const products = await manager.getProducts()
    console.log(products)

    await manager.deleteProduct(1)
}


cargarArchivos();

