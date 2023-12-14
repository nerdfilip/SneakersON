var totalPrice = 0;
var cartItems = {};

// Filter category
function filterCategory(category) {
    var sneakers = document.querySelectorAll('.sneakers');

    sneakers.forEach(function(sneaker) {
        var sneakerCategory = sneaker.id;

        if (category === 'All' || sneakerCategory === category.toLowerCase()) {
            sneaker.style.display = 'block';
        } else {
            sneaker.style.display = 'none';
        }
    });
}

// Change quantity function
function change(sign, where) {
    let currentValue = Number(document.getElementById(where).innerHTML);
    if (currentValue + sign > 0)
        document.getElementById(where).innerHTML = currentValue + sign;
}

// Verify cart items, to add or update items
function addToCart(sneakerName, price, quantity) {
    if (cartItems[sneakerName]) {
        cartItems[sneakerName].quantity += quantity;
        cartItems[sneakerName].totalPrice = cartItems[sneakerName].quantity * price;
    } else {
        cartItems[sneakerName] = {
            quantity: quantity,
            totalPrice: price * quantity
        };
    }

    updateCartDisplay();
}

// Function to clear the cart
function clearCart() {
    cartItems = {};
    updateCartDisplay();
}
var clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', clearCart);

// Function to hide cart
var hideCartButton = document.getElementById('hide-cart');
var cartItemsElement = document.getElementById('cart-items');

hideCartButton.addEventListener('click', function () {
    if (cartItemsElement.style.display === 'none' || cartItemsElement.offsetHeight === 0) {
        // Show Cart
        cartItemsElement.style.display = 'block';
        hideCartButton.textContent = 'Hide Cart';
        clearCartButton.style.display = 'block';
    } else {
        // Hide Cart
        cartItemsElement.style.display = 'none';
        hideCartButton.textContent = 'Show Cart';
        clearCartButton.style.display = 'none';
    }
});

var hideCartButton = document.getElementById('hide-cart');

// Function to clear an specific item
function removeItem(sneakerName) {
    delete cartItems[sneakerName];
    updateCartDisplay();
}

// Update Cart Display
function updateCartDisplay() {
    var cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    totalPrice = 0;

    for (var item in cartItems) {
        var listItem = document.createElement('li');
        listItem.className = 'custom-list-item';
        listItem.textContent = item + ' (Quantity: ' + cartItems[item].quantity + ') - Price: ' + cartItems[item].totalPrice.toFixed(2) + ' RON';
        cartList.appendChild(listItem);

        totalPrice += cartItems[item].totalPrice;
    }

    var totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = totalPrice.toFixed(2) + ' RON';

    var cartStatus = document.querySelector('.cart h4');
    cartStatus.textContent = 'Your shopping cart contains ' + Object.keys(cartItems).length + ' items';

    var totalPriceSection = document.getElementById('total-price-section');
    totalPriceSection.style.display = 'block';

    clearCartButton.style.display = Object.keys(cartItems).length > 0 ? 'block' : 'none';
    hideCartButton.style.display = Object.keys(cartItems).length > 0 ? 'block' : 'none';

    // Add "X" button for every item in the cart
    var cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    for (var item in cartItems) {
        var listItem = document.createElement('li');
        listItem.className = 'custom-list-item';

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.className = 'delete-item-btn';

        // Use a closure to capture the current value of 'item'
        (function (itemName) {
            deleteButton.addEventListener('click', function () {
                removeItem(itemName);
            });
        })(item);

        listItem.textContent = item + ' (Quantity: ' + cartItems[item].quantity + ') - Price: ' + cartItems[item].totalPrice.toFixed(2) + ' RON';
        listItem.appendChild(deleteButton);

        cartList.appendChild(listItem);

        totalPrice += cartItems[item].totalPrice;
    }
}

// Attach function to button
var addToCartButtons = document.querySelectorAll('.sneakers button[id="add-to-cart"]');
addToCartButtons.forEach(function (button, index) { 
    button.addEventListener('click', function () {
        var sneakerName = document.querySelectorAll('.sneakers h3')[index].textContent;
        var price = parseFloat(document.querySelectorAll('.sneakers p')[index].textContent.split(' ')[1]); // Extract the price
        var quantity = parseInt(document.querySelectorAll('.sneakers span')[index].textContent);
        addToCart(sneakerName, price, quantity);
        parseInt(document.getElementById('qty')[index].textContent) = 1;
    });
});