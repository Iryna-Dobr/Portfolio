const catalogProducts = document.querySelector('.catalog_products');

renderList(catalog);

function renderList(catalog_) {
    let template = '';

    for (let key in catalog_) {
        template += ` 
            <div class="product">             
                <img src=${catalog_[key].img} class="product_img">
                <h4 class="product_name">${catalog_[key].name}</h4>
                <p><strong>Ціна: </strong>${catalog_[key].price + ' &#8372'}</p>
                <div class="wrapper_btn">
                    <button class="btn_add" data-art="${catalog_[key].art}">Додати</button>
                </div>
            </div>
        `;
    }
    catalogProducts.innerHTML = template;
}

catalogProducts.addEventListener('click', (e) => {
    addToCart(e);
})

const buttons = document.querySelectorAll('.btn');
const filter = document.querySelector('.filter');
const price = document.querySelector('.price');
const maxPrice = document.querySelector('.max_price');

let filtersObj = {};

findFilterClick()
findMaxPrice()

function findFilterClick() {
    buttons && buttons.forEach((btn) => {

        btn.addEventListener('click', () => {
            const carrentCategory = btn.dataset.filter;

            if (carrentCategory === 'all') {
                filtersObj.id = 0;
            } else {
                filtersObj.id = carrentCategory;
            }

            filterProducts();
        })
    })

    buttons && buttons.forEach((btn) => {
        btn.addEventListener('click', function () {

            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        })
    })
}

function findMaxPrice() {
    price && price.addEventListener('change', (e) => {
        e.preventDefault();

        const priceMax = price.value;
        filtersObj.price = priceMax;
        maxPrice.innerHTML = priceMax + '&#8372';

        filterProducts();
    })
}

function filterProducts() {
    const filteredData = catalog.filter(item => {
        const name = item.name.toLowerCase();

        if ((!filtersObj.value || name.includes(filtersObj.value)) &&
            (!filtersObj.id || item.id === filtersObj.id) &&
            (!filtersObj.price || filtersObj.price >= item.price)) {
            return item;
        }
    })

    renderList(filteredData);
}

const search = document.querySelector('.search');

searchProducts();

function searchProducts() {
    let value = '';
    search && search.addEventListener('keyup', (e) => {
        e.preventDefault();

        value = search.value.toLowerCase();
        filtersObj.value = value;

        filterProducts();
    })
}

let data = [];

function addToCart(e) {
    if (e.target.classList.contains('btn_add')) {
        let article = e.target.dataset['art'];

        checkCart();

        if (data.filter(item => item.art === article).length > 0) {
            addQuantityToCart(article);
        } else {
            addProductToCart(article);
        }

        saveDataToLocalStorage();
        showCart(data);
    }

}

function addQuantityToCart(article) {
    for (let i in data) {
        if (data[i].art === article) {
            data[i].quantity++
        }
    }
}

function addProductToCart(article) {
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
