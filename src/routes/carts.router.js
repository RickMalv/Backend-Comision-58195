const { Router } = require("express");
const router = Router();
const CartManager = require("../CartManager");
const ProductManager = require("../ProductManger");

const manager = new CartManager("./src/files/cart.json");
const productManager = new ProductManager("./src/files/products.json");

router.post("/", async (req, res) => {
  try {
    await manager.addCart();
    res.send({ status: "Success" });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    //Comprobar que el producto exista antes de agregarlo al carrito
    const productManager = new ProductManager("./src/files/products.json");
    const pid = Number(req.params.pid);
    const productExists = await productManager.getProductById(pid);

    if (!productExists) {
      res.status(404).send({ error: "El producto no existe" });
    } else {
      await manager.addItemToCart(req.params.cid, req.params.pid);
      res.send({ status: "Success" });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  const cid = Number(req.params.cid);

  let cart = await manager.getCartById(cid);

  if (!cart) {
    res.status(404).send({ error: "Carrito no existe" });
  } else {
    res.send(cart);
  }
});

module.exports = router;
