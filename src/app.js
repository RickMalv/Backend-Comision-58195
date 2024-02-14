const express = require("express");
const server = express();
const port = 3000;
const itemsRouter = require("./routes/items.router");
const cartRouter = require("./routes/carts.router");
const handlebars = require("express-handlebars");
const viewsRouter = require("./routes/views.router");
const { Server } = require("socket.io");

const ProductManager = require("./ProductManger");
const manager = new ProductManager(__dirname + "/files/products.json");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//configuracion de handlebars
server.engine("handlebars", handlebars.engine());
server.set("views", `${__dirname}/views`);
server.set("view engine", "handlebars");

const serverHttp = server.listen(port, () =>
  console.log(`Servidor corriendo en el puerto ${port}`)
);

server.use("/api/products", itemsRouter);
server.use("/api/carts", cartRouter);
server.use("/", viewsRouter);

//Socket.io

const io = new Server(serverHttp);

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  socket.on("createProduct", async (createProduct) => {
    await manager.addProduct(createProduct);
    const products = await manager.getProducts();
    io.emit("list updated", { products: products });
  });

  socket.on("delete product", async ({id}) => {
    await manager.deleteProduct(id);
    const products = await manager.getProducts();
    io.emit("list updated", { products: products });
  });
});

//public files

server.use(express.static(`${__dirname}/public`));
