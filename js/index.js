import { products } from "./product.js";


//---------------------------DOMcontent---------------------------------------

const boxProducts = document.querySelector(".box-products");
const cartFrame = document.querySelector(".cart-frame");
const totalItems = document.querySelector(".total-items");
const totalCost = document.querySelector(".total-cost");
const navItems = document.querySelector(".nav-items");
const payment = document.querySelector(".payment");
const clearCart = document.querySelector(".clear");
const closeCart = document.querySelector(".fa-window-close");
const openCart = document.querySelector(".fa-cart-plus");
const mainCart = document.querySelector(".main-cart");
//const noCart = document.querySelector(".fa-cart-plus");

const cart = [];
let bringProductHtml = '';
let cartHtml = '';

products.forEach((product) => {
    bringProductHtml += `
    <div class="product">
        <div class="data">
            <img src=${product.image} alt="shoes">
            <p class="name-prod">${product.name}</p>
            <p>$${(product.price).toFixed(2)}</p>
        </div>
        <div>
            <button class="add-btn" data-id=${product.id}>add to cart</button>
        </div>
    </div>`;
})

saveProduct(products);

boxProducts.innerHTML = bringProductHtml;
const btnHtml ='';
const btns = [...document.querySelectorAll(".add-btn")];

btns.forEach((button) => {
    let btnId = button.dataset.id;

    button.addEventListener("click", () => {
        let getProduct = products.find(item => item.id === btnId);
        let cartItems = {...getProduct};
        cart.push(cartItems);
        let inCart = cart.find(item => item.id === btnId) 

        if (inCart){
            button.innerHTML = `<i class="fa fa-cart-plus" aria-hidden="true">  in cart</i>`;
            button.disabled = true;
        } 
            addCartItems(getProduct);
            cartCalcul(cart);
            saveCart(cart);
    })   
})

clearCart.addEventListener("click", () => {
    getCart(cart);
    let itemInside = cart.map(item => item)
    console.log(itemInside);
    cart.splice(itemInside);
    saveCart(cart);
    cartCalcul(cart);
    cartFrame.innerHTML = "";
})

//------------------Manage cart--------------------------------------

cartFrame.addEventListener("click", (event) => {
console.log(event.target);
    getCart(cart);


    if (event.target.classList.contains("material-symbols-outlined")){
        let btnHtml = event.target;
        console.log(btnHtml)
        let btnTarget = btnHtml.dataset.id;
        let cartFill = cart.map(item => item);
        let cartMatch = cart.filter(item => item.id !== btnTarget);
        cart.splice(cartFill);
        cart.push(...cartMatch);
        console.log(cart);
        cartCalcul(cart);
        saveCart(cart);
        cartFrame.removeChild(btnHtml.parentNode.parentNode.parentNode);
    } else
    if (event.target.classList.contains("arrowR")){
        let arrowR = event.target;
        let btnR = arrowR.dataset.id;
        let iteration = cart.find(item => item.id === btnR);
        console.log(iteration);
        iteration.quantity = iteration.quantity + 1;
        console.log(iteration.quantity);
        saveCart(cart);
        arrowR.previousElementSibling.innerText = iteration.quantity;
        console.log(cart);
        cartCalcul(cart);
    } else
    if (event.target.classList.contains("arrowL")){
        let arrowL = event.target;
        let btnL = arrowL.dataset.id;
        let iteration = cart.find(item => item.id === btnL);
        console.log(iteration);
        if (iteration.quantity > 1){
            iteration.quantity = iteration.quantity - 1;
            console.log(iteration.quantity);
        }
        else 
        {iteration.quantity = 1}
        saveCart(cart);
        arrowL.nextElementSibling.innerText = iteration.quantity;
        console.log(arrowL.nextElementSibling);
        console.log(cart);
        cartCalcul(cart);
    }
})

//--------------------------animation css---------------------------------

openCart.addEventListener('click', (evt)=> {
    console.log(evt.target);
        mainCart.classList.add("show-cart");
})

closeCart.addEventListener('click', ()=> {
    mainCart.classList.remove("show-cart");
})

//--------------------------------functions------------------------------

function addCartItems(getProduct) {
    const divP = document.createElement("div");
    divP.classList.add("cart");
    divP.innerHTML =  `
    <div class="cart">
        <img class="img" src=${getProduct.image} alt="">
        <div class="prod">
            <div class="head">
                <p class="name-prod">${getProduct.name}</p>
                <p class="price">${getProduct.price}</p>
            </div>
            <div class="amount">
                <p class="arrowL" data-id=${getProduct.id}><</p>
                <p class="disp-qty" data-id=>${getProduct.quantity}</p>
                <p class="arrowR" data-id=${getProduct.id}>></p>
            </div> 
        </div> 
        <div>
            <span class="material-symbols-outlined" data-id=${getProduct.id} >
            close_small
        </span>
    </div>            
          
    </div>`;

    cartFrame.appendChild(divP);
}

function cartCalcul(cart) {
    let cartTotalQty = 0;
    let cartTotalCost = 0;

    cart.map(cartItems => {
        cartTotalQty += cartItems.quantity;
        cartTotalCost += cartItems.price * cartItems.quantity;
        console.log(cartTotalQty, cartTotalCost);
    })

    totalItems.innerHTML = `<p class="total-items">Total unit : ${cartTotalQty} items packed</p>`;
    totalCost.innerHTML = ` <h3 class="total-cost">Total cost : $${cartTotalCost.toFixed(2)}</h3>`;
    navItems.innerHTML = cartTotalQty;
}

//--------------Session Storage-------------------------------------

function saveProduct(products) {
    sessionStorage.setItem("products", JSON.stringify(products));
}
function saveCart(cart) {
    sessionStorage.setItem("cart", JSON.stringify(cart));
}
function getProduct() {
    let products = JSON.parse(sessionStorage.getItem("products"));
}
function getCart() {
    let cart = JSON.parse(sessionStorage.getItem("cart"));
}

//-----------------exporting data stored/payment---------------------------

const payMent = document.querySelector('.payment');
sessionStorage.setItem('cartTotalQty', JSON.stringify(cartTotalQty));

payMent.addEventListener('click', () => {
    window.location.href = "./payment.html";
})