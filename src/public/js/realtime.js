const socket = io();

const productTitle = document.getElementById("productTitle");
const productPrice = document.getElementById("productPrice");
const productThumbnail = document.getElementById("productThumbnail");
const productDescription = document.getElementById("productDescription");
const productStock = document.getElementById("productStock");
const createProductButton = document.getElementById("createProductButton");

const tbodyId = document.getElementById("tbodyId");

createProductButton.addEventListener("click", () => {
  socket.emit("createProduct", {
    title: productTitle.value,
    price: productPrice.value,
    thumbnail: productThumbnail.value,
    description: productDescription.value,
    stock: productStock.value,
    status: productStatus.value,
    category: productCategory.value,
    code: productCode.value,
  });

  // Limpiar campos
  productTitle.value = "";
  productPrice.value = "";
  productThumbnail.value = "";
  productDescription.value = "";
  productStock.value = "";
  productStatus.value = "";
  productCategory.value = "";
  productCode.value = "";
});

//Enventos que escucha el servidor
socket.on("list updated", (data) => {
  const products = data.products;
  tbodyId.innerHTML = "";
  products.forEach((product) => {
    tbodyId.innerHTML += `<tr>
    <td>${product.title}</td>
    <td>${product.description}</td>
    <td><img src="${product.thumbnail}" alt="${product.title}" width="100"></td>
    <td>${product.price}</td>
    <td>${product.stock}</td>
    <td><button onclick = "deleteProduct("${product.id}")">borrar</button></td>
    </tr>`;
  });
});
