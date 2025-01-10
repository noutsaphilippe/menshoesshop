
const cart = JSON.parse(sessionStorage.getItem('cart'));
const cartTotalQty = JSON.parse(sessionStorage.getItem('cartTotalQty'));
const articles = document.querySelector(".product-line");
const navItems = document.querySelector(".nav-items");
const invoice = document.querySelector('.invoice');
let paymentHtml = '';
let bill = 0;
const cartItems = [];


cartItems.push(...cart);
console.log(cartItems);
cartItems.forEach((e)=> {
    paymentHtml += `
        <div class="pay-article">
            <p>productId: ${e.id} </p>
            <img src=${e.image} alt="">
            <p>unit(s): ${e.quantity} </p>
            <p>unit cost: ${e.price} </p>
            <p>Total cost: ${(e.quantity * e.price).toFixed(2)} </p>
        </div>
    `;
    bill += (e.quantity * e.price);
})

articles.innerHTML = paymentHtml;
navItems.innerHTML = cartTotalQty;
invoice.innerHTML = `<div class="invoice">Total Invoice = $${bill.toFixed(2)}</div>`;
console.log(cartTotalQty);

sessionStorage.setItem("bill", JSON.stringify(bill));