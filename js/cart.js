// Open the cart popup
function openCartPopup() {
  document.getElementById("cart-popup").style.display = "block";
  displayCartItems();
}

// Close the cart popup
function closeCartPopup() {
  document.getElementById("cart-popup").style.display = "none";
}

// Continue shopping (close the cart without removing items)
function continueShopping() {
  document.getElementById("cart-popup").style.display = "none";
}

// Save cart to localStorage
function saveCartToLocalStorage(cartItems) {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Get cart items from localStorage
function getCartFromLocalStorage() {
  const cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
}

// Add item to cart
function addToCart(gameName, price, imageSrc) {
  // Get the cart from localStorage or initialize it
  let cartItems = getCartFromLocalStorage();

  // Check if the item already exists in the cart
  const existingItemIndex = cartItems.findIndex(
    (item) => item.name === gameName
  );

  if (existingItemIndex !== -1) {
    // If item exists, update the quantity
    cartItems[existingItemIndex].quantity += 1;
  } else {
    // If item doesn't exist, add it
    cartItems.push({
      name: gameName,
      price: price,
      imageSrc: imageSrc,
      quantity: 1,
    });
  }

  // Save the updated cart to localStorage
  saveCartToLocalStorage(cartItems);

  // Update the cart popup
  displayCartItems();
}

// Display items in the cart
function displayCartItems() {
  const cartItems = getCartFromLocalStorage();
  const cartItemsList = document.getElementById("cart-items");
  cartItemsList.innerHTML = ""; // Clear existing items

  if (cartItems.length === 0) {
    cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    cartItems.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
        <div class="cart-item-left">
          <img src="${item.imageSrc}" alt="Game Image" class="cart-item-img">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">${item.price} SEK</div>
          </div>
        </div>
        <div class="cart-item-right">
          <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
          <span class="quantity-text">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
          <button class="remove-item" onclick="removeItemFromCart('${item.name}')">Remove</button>
        </div>
      `;
      cartItemsList.appendChild(cartItem);
    });
  }
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

    // Save updated cart to localStorage
    saveCartToLocalStorage(cartItems);

    // Update the cart popup
    displayCartItems();
  }
}

// Remove item from cart
function removeItemFromCart(gameName) {
  let cartItems = getCartFromLocalStorage();

  // Filter out the item that matches the name
  cartItems = cartItems.filter((item) => item.name !== gameName);

  // Save the updated cart to localStorage
  saveCartToLocalStorage(cartItems);

  // Update the cart popup
  displayCartItems();
}
