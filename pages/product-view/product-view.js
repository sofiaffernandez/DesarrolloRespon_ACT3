const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const URL = `https://fakestoreapi.com/products/${productId}`;
let storage = JSON.parse(localStorage.getItem("selectedItems")) || [];

fetch(URL)
    .then(res => res.json())
    .then(product => {
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-title').innerText = product.title;
        document.getElementById('product-description').innerText = product.description;
        document.getElementById('product-price').innerText = `${product.price}€`;

        const addButton = document.getElementById('add-button');
        addButton.onclick = () => onAdd(addButton, product);

        storage.forEach((element) => {
            if (element.id == product.id) {
                addButton.innerText = "Cancelar";
            }
        });
    });

    const onAdd = (button, object) => {
    let selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    let isDeleted = false;
    let deleteObject;

    selectedItems.forEach((element, index) => {
        if (element.id == object.id) {
            isDeleted = true;
            deleteObject = index;
        }
    });

    if (isDeleted) {
        selectedItems.splice(deleteObject, 1);
        button.innerText = "Añadir";
    } else {
        selectedItems.push(object);
        button.innerText = "Cancelar";

        const toastBuy = document.getElementById('toastBuy');
        bootstrap.Toast.getOrCreateInstance(toastBuy).show();
    }

    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
}
document.addEventListener("DOMContentLoaded", function() {
    const logoutLink = document.querySelector("#logout");
    const usuarioLink = document.querySelector(".nav-link.dropdown-toggle");

  
    const email = sessionStorage.getItem("email");

    if (email) {
        
        logoutLink.textContent = "Salir";
        logoutLink.addEventListener("click", function(event) {
            event.preventDefault();
            sessionStorage.clear();
            window.location.href = "../login/login.html"
        });
    } else {
       
        logoutLink.textContent = "Accede";
        logoutLink.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "../login/login.html";
        });
    }
});
