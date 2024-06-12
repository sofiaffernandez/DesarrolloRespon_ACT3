const URL = 'https://fakestoreapi.com/products?limit=5';
const ID_URL = "";

fetch(URL)
    .then(res=>res.json())
    .then(json=>{
        console.log(json)

        json.map((cloth) => {
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
            contentBtn.onclick = () => onAdd(cloth);

            cardContent.appendChild(contentButtons);



            document.getElementById("cardsContainer").appendChild(card);
        })

    });

    let onClick = (id) => {
        console.log(id);

        window.location.href = `./../product-view/product-view.html?id=${id}`;

    }

    let onAdd = (object) => {
        let prevItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
        prevItems.push(object);
        localStorage.setItem("selectedItems", JSON.stringify(prevItems));

        console.log(prevItems);
        event.stopPropagation();
    }
