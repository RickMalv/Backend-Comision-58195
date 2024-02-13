const { Router } = require("express");
const router = Router();
const ProductManager = require("../ProductManger");
const manager = new ProductManager("./src/files/products.json");

router.get("/", async (req, res) => {
  const products = await manager.getProducts();
  res.render("home", { products: products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await manager.getProducts();
  res.render("realTimeProducts", { products });
});

module.exports = router;
