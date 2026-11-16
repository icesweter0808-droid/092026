var cart = [];
var savedData = localStorage.getItem("ben-to_cart");
if (savedData) {
cart = JSON.parse(savedData);
}

function saveCart() {
localStorage.setItem("ben-to_cart", JSON.stringify(cart));
updateCartBadge();
}

function updateCartBadge() {
var badges = document.getElementsByClassName("cart-badge");
var totalItems = 0;
var i;
for (i = 0; i < cart.length; i++) {
totalItems = totalItems + cart[i].quantity;
}
for (i = 0; i < badges.length; i++) {
badges[i].innerHTML = totalItems;
}
}

function addToCart(productId) {
var selectedProduct = null;
var found = false;
var i;

for (i = 0; i < products.length; i++) {
if (products[i].id === productId) {
selectedProduct = products[i];
}
}

for (i = 0; i < cart.length; i++) {
if (cart[i].id === productId) {
cart[i].quantity = cart[i].quantity + 1;
found = true;
}
}

if (found === false && selectedProduct !== null) {
cart.push({
id: selectedProduct.id,
name: selectedProduct.name,
price: selectedProduct.price,
quantity: 1
});
}

saveCart();
alert(selectedProduct.name + " added to your cart!");
}

function filterMenu(category, clickedBtn) {
var buttons = document.getElementsByClassName("filter-btn");
for (var i = 0; i < buttons.length; i++) {
buttons[i].classList.remove("active");
}
if (clickedBtn) {
clickedBtn.classList.add("active");
}
renderProducts("shop-grid", category, false);
}

function renderProducts(containerId, filterCategory, dealsOnly) {
var container = document.getElementById(containerId);
if (!container) {
return;
}

var html = "";
var i;
for (i = 0; i < products.length; i++) {
var p = products[i];
var showItem = false;

if (dealsOnly === true) {
if (p.onDeal === true) {
showItem = true;
}
} else if (filterCategory === "all" || p.category === filterCategory) {
showItem = true;
}

if (showItem === true) {
html = html + '<article class="product-card">';
html = html + '<img src="' + p.image + '" alt="' + p.name + '">';
html = html + '<div class="product-info">';
html = html + '<h3>' + p.name + '</h3>';
html = html + '<p>' + p.description + '</p>';
html = html + '<div class="price">RM ' + p.price.toFixed(2) + '</div>';
html = html + '<button type="button" class="btn" onclick="addToCart(' + p.id + ')">Add to Cart</button>';
html = html + '</div>';
html = html + '</article>';
}
}

container.innerHTML = html;
}

function renderCartPage() {
var cartBody = document.getElementById("cart-body");
var cartTotalEl = document.getElementById("cart-total");
if (!cartBody) {
return;
}

if (cart.length === 0) {
cartBody.innerHTML = '<tr><td colspan="5">Your cart is empty.</td></tr>';
cartTotalEl.innerHTML = "RM 0.00";
return;
}

var html = "";
var total = 0;
var i;

for (i = 0; i < cart.length; i++) {
var item = cart[i];
var subtotal = item.price * item.quantity;
total = total + subtotal;

html = html + '<tr>';
html = html + '<td>' + item.name + '</td>';
html = html + '<td>RM ' + item.price.toFixed(2) + '</td>';
html = html + '<td>';
html = html + '<button type="button" class="qty-btn" onclick="changeQty(' + i + ', -1)">-</button>';
html = html + item.quantity;
html = html + '<button type="button" class="qty-btn" onclick="changeQty(' + i + ', 1)">+</button>';
html = html + '</td>';
html = html + '<td>RM ' + subtotal.toFixed(2) + '</td>';
html = html + '<td><button type="button" class="remove-btn" onclick="removeItem(' + i + ')">Remove</button></td>';
html = html + '</tr>';
}

cartBody.innerHTML = html;
cartTotalEl.innerHTML = "RM " + total.toFixed(2);
}

function changeQty(index, delta) {
cart[index].quantity = cart[index].quantity + delta;
if (cart[index].quantity <= 0) {
cart.splice(index, 1);
}
saveCart();
renderCartPage();
}

function removeItem(index) {
cart.splice(index, 1);
saveCart();
renderCartPage();
}

function checkout() {
if (cart.length === 0) {
alert("Your cart is empty!");
return;
}
alert("Thank you for your order! Your gourmet food is being prepared.");
cart = [];
saveCart();
renderCartPage();
}

function submitInquiry(event) {
event.preventDefault();
alert("Thank you for your message! Our team will get back to you shortly.");
event.target.reset();
}

window.onload = function() {
updateCartBadge();
renderCartPage();
if (document.getElementById("featured-grid")) {
renderProducts("featured-grid", "all", true);
}
if (document.getElementById("shop-grid")) {
renderProducts("shop-grid", "all", false);
}
if (document.getElementById("deals-grid")) {
renderProducts("deals-grid", "all", true);
}
};
