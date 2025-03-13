// Populate the Product Summary Section on Checkout Page
function displayProductSummary() {
  const cartItems = getCartFromLocalStorage(); // Fetch cart items from localStorage
  const productSummarySection = document.querySelector(".product-summary"); // Select the section to inject the products
  const totalPriceElement = document.querySelector(".total span:last-child"); // Select the span for total price
  let totalPrice = 0;

  // Clear the previous product items
  productSummarySection.innerHTML = "<h2>Product Summary</h2>";

  // Loop through cart items and display each one
  cartItems.forEach((item) => {
    // Create a product item container
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    // Create product image
    const productImg = document.createElement("img");
    productImg.src = item.imageSrc;
    productImg.alt = item.name;

    // Create product name
    const productName = document.createElement("span");
    productName.textContent = item.name;

    // Create product price (price * quantity)
    const productPrice = document.createElement("span");
    productPrice.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

    // Append image, name, and price to product item container
    productItem.appendChild(productImg);
    productItem.appendChild(productName);
    productItem.appendChild(productPrice);

    // Append product item to product summary section
    productSummarySection.appendChild(productItem);

    // Update total price
    totalPrice += item.price * item.quantity;
  });

  // Update total price displayed at the bottom of the product summary section
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// When the checkout page is loaded, populate the product summary
document.addEventListener("DOMContentLoaded", () => {
  displayProductSummary();
});

// Call this function to update the product summary when the cart is updated
function updateCheckoutTotal() {
  displayProductSummary();
}

// Call this whenever the user adds/removes items or changes quantities in the cart
function addToCart(gameName, price, imageSrc) {
  let cartItems = getCartFromLocalStorage();
  const existingItemIndex = cartItems.findIndex(
    (item) => item.name === gameName
  );

  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity += 1;
  } else {
    cartItems.push({
      name: gameName,
      price: price,
      imageSrc: imageSrc,
      quantity: 1,
    });
  }

  saveCartToLocalStorage(cartItems);
  updateCheckoutTotal(); // Update the total after adding an item
}

// Update the quantity of an item in the cart
function updateQuantity(gameName, delta) {
  let cartItems = getCartFromLocalStorage();
  const itemIndex = cartItems.findIndex((item) => item.name === gameName);

  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity += delta;

    // Prevent negative quantity
    if (cartItems[itemIndex].quantity < 1) {
      cartItems[itemIndex].quantity = 1;
    }

    saveCartToLocalStorage(cartItems);
    updateCheckoutTotal(); // Update the total after updating the quantity
  }
}

// Remove item from cart
function removeItemFromCart(gameName) {
  let cartItems = getCartFromLocalStorage();

  cartItems = cartItems.filter((item) => item.name !== gameName);

  saveCartToLocalStorage(cartItems);
  updateCheckoutTotal(); // Update the total after removing an item
}
