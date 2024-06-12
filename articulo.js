const URL = 'https://fakestoreapi.com/products?limit=5';

fetch(URL)
    .then(res=>res.json())
    .then(json=>{
        console.log(json)

        json.map((cloth) => {


        })

    });
