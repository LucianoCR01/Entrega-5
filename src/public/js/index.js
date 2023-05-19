//Codigo del FRONT


const socket = io()

const formProducts = document.getElementById("form-products");
const inputTitle = document.getElementById("form-title");
const inputDescript = document.getElementById("form-description");
const inputPrice = document.getElementById("form-price");
const inputCode = document.getElementById("form-code");
const inputStock = document.getElementById("form-stock");
const inputCategory = document.getElementById("form-category");
const inputThumbnail = document.getElementById("form-thumbnail");

const formeliminar = document.getElementById("form-eliminar");
const inputEliminar = document.getElementById("inputEliminar")


socket.on("listProdSocke", listProdSocke => {
    console.log(listProdSocke)
    const productList = document.querySelector(".productListUpdated");
    productList.innerHTML = `
        ${listProdSocke
            .map(
                (product) => `
         <tr>
           <th scope="row">${product.id}</th>
           <td>${product.title}</td>
           <td>${product.description}</td>
           <td>${product.price}</td>
           <td>${product.code}</td>
           <td>${product.stock}</td>
             <td>${product.category}</td>
            <td><img src="${product.thumbnail}" alt="${product.id}" title="Foto de ${product.title}" style="width: 50px; min-height: 100%; max-height: 50px;"></td>
          </tr>
        `
            )
            .join("")}
      `;
});

formProducts.onsubmit = (e) => {
    e.preventDefault();
    const newProduct = {
        title: inputTitle.value,
        description: inputDescript.value,
        price: +inputPrice.value,
        thumbnail: inputThumbnail.value,
        code: inputCode.value,
        stock: +inputStock.value,
        category: inputCategory.value,
    };

    socket.emit("newProduct", newProduct);
    formProducts.reset();
};

formeliminar.onsubmit = (e) => {
    e.preventDefault();
    console.log(inputEliminar.value)
    socket.emit("inputEliminar", inputEliminar.value);
    formeliminar.reset();
};