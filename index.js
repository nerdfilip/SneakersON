// Change quantity function
function change(sign, where) {
    let currentValue = Number($('#' + where).text());
    if (currentValue + sign > 0) {
        $('#' + where).text(currentValue + sign);
    }
}

// Filter category function
function filterCategory(category) {
    $('.sneakers').each(function() {
        var sneakerCategory = $(this).attr('id');

        if (category === 'All' || sneakerCategory === category.toLowerCase()) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

$(document).ready(function () {
    var totalPrice = 0;
    var cartItems = {};

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
        $('#clear-cart').hide(); // Hide the "Clear Cart" button
    }

    $('#clear-cart').on('click', clearCart);

    // Function to hide/show cart
    $('#hide-cart').click(function () {
        $('#cart-items').slideToggle();

        if ($(this).text() == "Hide Cart") {
            $(this).text("Show Cart");
            $('#clear-cart').hide();
        } else {
            $(this).text("Hide Cart");
            $('#clear-cart').show();
        }
    });

    // Function to clear a specific item
    function removeItem(sneakerName) {
        delete cartItems[sneakerName];
        updateCartDisplay();
    }

    // Update Cart Display
    function updateCartDisplay() {
        var cartList = $('#cart-items');
        cartList.empty();
    
        totalPrice = 0;
        
        // Add "X" button for every item in the cart
        for (var item in cartItems) {
            var listItem = $('<li>').addClass('custom-list-item');
            var deleteButton = $('<button>').text('x').addClass('delete-item-btn');
    
            // Use a closure to capture the current value of 'item'
            (function (itemName) {
                deleteButton.on('click', function () {
                    removeItem(itemName);
                });
            })(item);
    
            listItem.text(
                item + ' (Quantity: ' + cartItems[item].quantity + ') - Price: ' + cartItems[item].totalPrice.toFixed(2) + ' RON'
            ).append(deleteButton);
    
            cartList.append(listItem);
    
            totalPrice += cartItems[item].totalPrice;
        }
    
        var totalPriceElement = $('#total-price');
        totalPriceElement.text(totalPrice.toFixed(2) + ' RON');
    
        var cartStatus = $('.cart h4');
        cartStatus.text('Your shopping cart contains ' + Object.keys(cartItems).length + ' items');
    
        var totalPriceSection = $('#total-price-section');
        totalPriceSection.show();
    
        $('#clear-cart').toggle(Object.keys(cartItems).length > 0);
        $('#hide-cart').toggle(Object.keys(cartItems).length > 0);
    }
    

    // Attach function to button
    $('.sneakers button[id="add-to-cart"]').on('click', function () {
        var index = $('.sneakers button[id="add-to-cart"]').index(this);
        var sneakerName = $('.sneakers h3').eq(index).text();
        var price = parseFloat($('.sneakers p').eq(index).text().split(' ')[1]); // Extract the price
        var quantity = parseInt($('.sneakers span').eq(index).text());
        addToCart(sneakerName, price, quantity);
        $('#qty').eq(index).text(1);
    });
});