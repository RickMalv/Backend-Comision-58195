const fs = require("fs");

class CartManager {
  static id = 0;
  constructor(path) {
    this.path = path;
    fs.writeFileSync(path, "[]");
  }
  async addCart() {
    const content = await fs.promises.readFile(this.path, "utf-8");
    const items = JSON.parse(content);

    let item = { id: ++CartManager.id, products: [] };
    items.push(item);

    await fs.promises.writeFile(this.path, JSON.stringify(items, null, "\t"));
  }

  async addItemToCart(cartId, productId) {
    const content = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(content);

    const cartIndex = products.findIndex((c) => c.id == cartId);
    if (cartIndex >= 0) {
      let cart = products[cartIndex];
      const productIndex = cart.products.findIndex(
        (i) => i.product == productId
      );
      if (productIndex >= 0) {
        cart.products[productIndex].quantity++;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
    } else {
      throw new Error(`Carrito con el id ${cartId} no encontrado`);
    }
  }
  async getCartById(id) {
    let content = await fs.promises.readFile(this.path, "utf-8");
    let products = JSON.parse(content);

    let product = products.find((p) => p.id === id);
    if (product) {
      return product.products;
    } else {
      console.error(`Producto con id ${id} no encontrado`);
    }
  }
}

module.exports = CartManager;
