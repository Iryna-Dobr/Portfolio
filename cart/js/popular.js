const popularProducts = document.querySelector('.popular_products');

renderPopularList(catalog);

function renderPopularList(catalog) {
    let template = '';

    for (let i = 0; i < 3; i++) {
        template += ` 
            <div class="popular_product">
                <img src=${catalog[i].img} class="popular_product_img">
                <h4 class="popular_product_name">${catalog[i].name}</h4>
                <p><strong>Ціна:</strong> ${catalog[i].price + ' &#8372'} </p>
                <div class="popular_wrapper_btn">
                    <button class="popular_btn_add" data-art="${catalog[i].art}">Додати</button>
                </div>
            </div>
        `;
    }
    popularProducts.innerHTML = template;
}

popularProducts.addEventListener('click', (e) => {
    addToCart(e);
})

let data = [];

function addToCart(e) {
    if (e.target.classList.contains('popular_btn_add')) {
        let article = e.target.dataset['art'];

        checkCart();

        if (data.filter(item => item.art == article).length > 0) {
            addQuantity(article);
        } else {
            addGoods(article);
        }

        saveDataToLocalStorage();
        showCart(data);
    }

}

function addQuantity(article) {
    for (let i in data) {
        if (data[i].art === article) {
            data[i].quantity++
        }
    }
}

function addGoods(article) {
    for (let key in catalog) {
        if (article === catalog[key].art) {

            const newGoods = {
                art: catalog[key].art,
                img: catalog[key].img,
                name: catalog[key].name,
                price: catalog[key].price,
                quantity: 1
            }

            data.push(newGoods);
        }
    }
}