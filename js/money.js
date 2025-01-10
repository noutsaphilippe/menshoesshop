const bill = JSON.parse(sessionStorage.getItem("bill"));
const invoice = document.querySelector('.invoice');

invoice.innerHTML = `<p>Total Invoice = $${bill}</p>  `;