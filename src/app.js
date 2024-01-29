const express = require("express");
const ProductManager = require("./ProductManger");

const server = express();
const port = 8080;

server.use(express.urlencoded({ extended: true }));

const manager = new ProductManager("./products.json");

server.get("/", (req, res) => {
  res.send("Hello world");
});

server.get("/products", async (req, res) => {
  let products = await manager.getProducts();

  const { limit } = req.query;

  if (limit) {
    products = products.slice(0, limit);
  }

  res.send(products);
});

server.get("/products/:pid", async (req, res) => {
  const pid = Number(req.params.pid);

  let product = await manager.getProductById(pid);

  if (!product) {
    res.status(404).send({ error: "Producto no existe" });
  } else {
    res.send(product);
  }
});

server.listen(port, () =>
  console.log(`Servidor corriendo en el puerto ${port}`)
);
