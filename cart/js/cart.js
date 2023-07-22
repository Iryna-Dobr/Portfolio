const cartIcon = document.querySelector('.cart_icon');
const cart = document.querySelector('.cart');
const cartClose = document.querySelector('.cart_close');

cartIcon.addEventListener('click', () => {
    cart.classList.add("active");
})

cartClose.addEventListener('click', () => {
    cart.classList.remove("active");
})

const burger = document.querySelector('.burger');
const nav = document.querySelector('.header_nav');

burger.addEventListener('click', () => {
    nav.classList.toggle('header_nav_visible');
})

const cartContainer = document.querySelector('.cart_container');
const total = document.querySelector('.total');
const cartQuantity = document.querySelector('.cart_quantity');

checkCart();
showCart();

function showCart() {
    if (data.length === 0) {
        cartContainer.innerHTML = 'Кошик порожній';
        total.innerHTML = '';
        cartQuantity.classList.remove('active_quantity');
        cartQuantity.textContent = '';
    } else {
        let template = '';
        let totalPrice = 0;
        let quantityProducts = 0;
        cartQuantity.classList.add('active_quantity');

        for (let key in data) {
            template += `
                <div class="cart_product">
                    <img src=${data[key].img} class="cart_img">
                    <div class="about_product_cart">
                        <h4 class="product_name_cart">${data[key].name}</h4>
                        <p class="cart_price">${data[key].price + ' &#8372'}</p>
                        <p class="remove" data-art=${data[key].art}>видалити</p>
                    </div>
                    <div class="quantity_product">
                        <img class="plus" data-art=${data[key].art} src="./images/plus30.png">
                        <p class="quantity">${data[key].quantity}</p>
                        <img class="minus" data-art=${data[key].art} src="./images/minus.png">
                    </div>
                </div>
            `;

            quantityProducts++;
            totalPrice += data[key].price * data[key].quantity;

            total.innerHTML = `
                    <p><strong>Загалом: </strong>${'&#8372 '}  ${totalPrice}</p>
                    <button type="button" class="btn_buy">Купити</button>
                `;

            cartQuantity.textContent = quantityProducts;
            cartContainer.innerHTML = template;

        }
    }


}

cartContainer && cartContainer.addEventListener('click', (e) => {
    let classElem = e.target.className;

    switch (classElem) {
        case 'plus':
            plusProductToCart(e);
            break;
        case 'minus':
            minusProductToCart(e);
            break;
        case 'remove':
            deleteProductFromCart(e);
            break;
    }
})


function plusProductToCart(e) {
    let articul = e.target.dataset['art'];

    checkCart();

    for (let key in data) {
        if (articul === data[key].art) {
            data[key].quantity++;
        }
    }

    saveDataToLocalStorage()
    showCart();
}

function minusProductToCart(e) {
    let articul = e.target.dataset['art'];

    checkCart();

    for (let key in data) {
        if (articul === data[key].art) {
            if (data[key].quantity > 1) {
                data[key].quantity--;
            } else {
                data.splice(key, 1);
            }
        }
    }

    saveDataToLocalStorage()
    showCart();
}

function deleteProductFromCart(e) {
    let articul = e.target.dataset['art'];

    checkCart();

    for (let key in data) {
        if (articul === data[key].art) {
            data.splice(key, 1);
        }
    }

    saveDataToLocalStorage()
    showCart();
}
const btnBuy = document.querySelector('.btn_buy');

total && total.addEventListener('click', () => {

    openModal();
    clearCart();
})

const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal_close');

function clearCart() {
    cart.classList.remove("active");

    checkCart();
    data.splice(0, data.length);

    saveDataToLocalStorage()
    showCart();
}

function openModal() {
    modal.classList.add('modal_active');
}

modalClose && modalClose.addEventListener('click', () => {
    modal.classList.remove('modal_active');
})

function checkCart() {
    if (localStorage.getItem('data') !== null) {
        data = JSON.parse(localStorage.getItem('data'));
    }
}
function saveDataToLocalStorage() {
    localStorage.setItem('data', JSON.stringify(data));
}
