const { Router } = require("express");
const router = Router();
const ProductManager = require("../ProductManger");

const manager = new ProductManager("./src/files/products.json");

router.get("/", async (req, res) => {
  let products = await manager.getProducts();

  const { limit } = req.query;

  if (limit) {
    products = products.slice(0, limit);
  }

  res.send(products);
});

router.get("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);

  let product = await manager.getProductById(pid);

  if (!product) {
    res.status(404).send({ error: "Producto no existe" });
  } else {
    res.send(product);
  }
});

router.post("/", async (req, res) => {
  try {
    await manager.addProduct(req.body);
    res.send({ status: "Success" });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const pid = Number(req.params.pid);
    await manager.updateProduct(pid, req.body);
    res.send({ status: "Success" });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const pid = Number(req.params.pid);
    await manager.deleteProduct(pid);
    res.send({ status: "Success" });
  } catch (error) {
    res.status(404).send({ error: "Producto no existe" });
  }
});

module.exports = router;
