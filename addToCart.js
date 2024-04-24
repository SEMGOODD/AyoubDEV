// JavaScript code

var cartItems = []; // Array to store cart items

function addToCart(item, price) {
    // Add item to the cart
    cartItems.push({ item: item, price: price });

    // Update cart display
    updateCartDisplay();
}

function removeFromCart(index) {
    // Remove item from the cart at the specified index
    cartItems.splice(index, 1);

    // Update cart display
    updateCartDisplay();
}

function calculateTotalPrice() {
    var subtotal = 0;
    cartItems.forEach(function (item) {
        subtotal += item.price;
    });

    // Assuming a fixed tax rate of 10%
    var tax = subtotal * 0.1;
    var total = subtotal + tax;

    return { subtotal: subtotal.toFixed(2), tax: tax.toFixed(2), total: total.toFixed(2) };
}

function updateCartDisplay() {
    var totalPrice = calculateTotalPrice();

    // Update HTML elements displaying subtotal, tax, and total
    document.getElementById("subtotal").textContent = totalPrice.subtotal + "€";
    document.getElementById("tax").textContent = totalPrice.tax + "€";
    document.getElementById("total").textContent = totalPrice.total + "€";

    // Update HTML table to display purchased items
    var tableBody = document.getElementById("purchased-items");
    tableBody.innerHTML = ''; // Clear existing rows

    if (cartItems.length > 0) {
        // If there are items in the cart, populate the table and show it
        cartItems.forEach(function (item, index) {
            var row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.item}</td>
                <td>${item.price.toFixed(2)}€</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            `;
            tableBody.appendChild(row);
        });

        // Show the second table
        document.getElementById("second-table-container").style.display = "block";
    } else {
        // If there are no items in the cart, hide the table
        document.getElementById("second-table-container").style.display = "none";
    }
}
