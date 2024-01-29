const fs = require("fs");

class ProductManager {
  static id = 0;
  constructor(path) {
    this.path = path;

    // Leer el archivo y setear el id en base al id del último producto
    try {
      let content = fs.readFileSync(this.path, "utf-8");
      let products = JSON.parse(content);
      ProductManager.id = products.reduce(
        (maxId, product) => Math.max(maxId, product.id),
        0
      );
    } catch (err) {
      console.error(err);
    }
  }

  async addProduct(product) {
    // Chequeamos que el producto tenga todos los campos requeridos
    const requiredFields = [
      "title",
      "description",
      "price",
      "thumbnail",
      "code",
      "stock",
    ];
    const missingFields = requiredFields.filter(
      (field) => !product.hasOwnProperty(field)
    );

    if (missingFields.length > 0) {
      throw new Error(`Faltan campos necesarios: ${missingFields.join(", ")}`);
    }

    const products = await this.getProducts();

    //Checkeamos que code no exista ya en el archivo
    if (products.some((p) => p.code === product.code)) {
      console.error(`Producto con codigo ${product.code} ya existe`);
    } else {
      product.id = ++ProductManager.id;
      products.push(product);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
    }
  }

  async getProducts() {
    let content = await fs.promises.readFile(this.path, "utf-8");
    let products = JSON.parse(content);

    return products;
  }

  async getProductById(id) {
    let content = await fs.promises.readFile(this.path, "utf-8");
    let products = JSON.parse(content);

    let product = products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.error(`Producto con id ${id} no encontrado`);
    }
  }

  async deleteProduct(id) {
    let content = await fs.promises.readFile(this.path, "utf-8");
    let products = JSON.parse(content);

    products = products.filter((p) => p.id != id);

    console.log("Se borró el producto con id " + id);
    await fs.promises.writeFile(this.path, JSON.stringify(products));
  }

  async updateProduct(id, data) {
    let content = await fs.promises.readFile(this.path, "utf-8");
    let products = JSON.parse(content);

    let product = products.find((p) => p.id === id);
    if (product) {
      // Actualizar el producto con los datos nuevos
      Object.assign(product, data);
      // Asegurarse de que el producto tenga el id correcto
      product.id = id;

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
    } else {
      throw new Error(`Producto con el id ${id} no encontrado`);
    }
  }
}

module.exports = ProductManager;
