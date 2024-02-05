const express = require("express");

const server = express();
const port = 8080;
const itemsRouter = require("./routes/items.router");
const cartRouter = require("./routes/cart.router");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(port, () =>
  console.log(`Servidor corriendo en el puerto ${port}`)
);

server.use("/api/products", itemsRouter);
server.use("/api/cart", cartRouter);
