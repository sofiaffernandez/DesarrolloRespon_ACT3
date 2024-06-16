let storage = JSON.parse(localStorage.getItem("selectedItems")) || [];


storage.map((cloth) => {
    const card = document.createElement("li");
    card.onclick = () => onClick(cloth.id);
    
    const cardImage = card.appendChild(document.createElement("img"));
    cardImage.src = cloth.image;
    cardImage.height = "100";
    cardImage.width = "100";

    const cardContent = card.appendChild(document.createElement("div"));

    let contentTitle = cardContent.appendChild(document.createElement("h3"));
    contentTitle.innerText = cloth.title;

    let contentDescription = cardContent.appendChild(document.createElement("p"));
    contentDescription.innerText = cloth.description;

    const contentButtons = document.createElement("div");
    let contentPrice = contentButtons.appendChild(document.createElement("p"));
    contentPrice.innerText = `${cloth.price}€`;

    const contentBtn = contentButtons.appendChild(document.createElement("button"));
    contentBtn.innerText = "Añadir";
    contentBtn.onclick = () => onAdd(contentBtn, cloth);

    cardContent.appendChild(contentButtons);


    card.classList.add("d-flex", "flex-row", "align-items-center", "gap-2", "border-bottom", "border-secondary");
    card.style.maxWidth = "600px";

    cardContent.classList.add("p-2");

    contentTitle.classList.add("fs-6");
    contentTitle.style.display = "-webkit-box";
    contentTitle.style.webkitBoxOrient = "vertical";
    contentTitle.style.webkitLineClamp = 1;
    contentTitle.style.lineClamp = 1;
    contentTitle.style.overflow = "hidden";

    contentDescription.style.display = "-webkit-box";
    contentDescription.style.webkitBoxOrient = "vertical";
    contentDescription.style.webkitLineClamp = 2;
    contentDescription.style.lineClamp = 2;
    contentDescription.style.overflow = "hidden";

    contentButtons.classList.add("d-flex", "flex-row", "justify-content-between");
    contentPrice.classList.add("m-0", "align-self-end");
    contentBtn.classList.add("text-white", "border-0", "rounded");
    contentBtn.style.height = "32px";
    contentBtn.style.width = "104px";
    contentBtn.style.backgroundColor = "#007D8A";

    storage.forEach((element) => {
        if (element.id == cloth.id) {
            contentBtn.innerText = "Cancelar";
        } 
    });

    document.getElementById("cardsContainer").appendChild(card);
});

let onClick = (id) => {
    console.log(id);

    window.location.href = `./../product-view/product-view.html?id=${id}`;

}

let onAdd = (btn, object) => {
    event.stopPropagation();
    console.log(btn);

    let prevItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    let isDeleted = false;
    let deleteObject;

    prevItems.forEach((element, index) => {
        if (element.id == object.id) {
            isDeleted = true;
            deleteObject = index;
        } 
    });


    if (isDeleted) {
        prevItems.splice(deleteObject, 1);
        btn.innerText = "Añadir";

    } else {
        prevItems.push(object);
        btn.innerText = "Cancelar";

        const toastBuy = document.getElementById('toastBuy');
        bootstrap.Toast.getOrCreateInstance(toastBuy).show();

        console.log(prevItems);
    }

    totalPrice(prevItems);

    localStorage.setItem("selectedItems", JSON.stringify(prevItems));
}

let totalPrice = (arr) => {
    let price = arr.reduce((total, object) => {
        let price = object.price + total;

        return (
            price
        )

    }, 0)
    document.getElementById("subtotal").innerText = `${price.toFixed(2)}€`;

    let total = price + 3.99;

    let writePrice = document.getElementsByClassName("total");

    [...writePrice].forEach(element => {
        element.innerText = `${total.toFixed(2)}€`
    });
}

totalPrice(storage);
