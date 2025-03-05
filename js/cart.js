// Toggle the cart popup
function toggleCartPopup() {
  const cartPopup = document.getElementById("cart-popup");
  if (cartPopup.style.display === "block") {
    cartPopup.style.display = "none";
  } else {
    cartPopup.style.display = "block";
    displayCartItems();
  }
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
  displayCartItems();
}

// Display items in the cart
function displayCartItems() {
  const cartItems = getCartFromLocalStorage();
  const cartItemsList = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const priceSumElement = document.querySelector(".price-sum");
  cartItemsList.innerHTML = ""; // Clear the current list

  let totalPrice = 0;

  if (cartItems.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent = "Your cart is empty.";
    cartItemsList.appendChild(emptyMessage);
    priceSumElement.style.display = "none"; // Hide the total price element
  } else {
    priceSumElement.style.display = "flex"; // Show the total price element
    cartItems.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.classList.add("cart-item");

      // Create left part of cart item
      const cartItemLeft = document.createElement("div");
      cartItemLeft.classList.add("cart-item-left");

      const cartItemImg = document.createElement("img");
      cartItemImg.src = item.imageSrc;
      cartItemImg.alt = "Game Image";
      cartItemImg.classList.add("cart-item-img");

      const cartItemDetails = document.createElement("div");
      cartItemDetails.classList.add("cart-item-details");

      const cartItemTitle = document.createElement("div");
      cartItemTitle.classList.add("cart-item-title");
      cartItemTitle.textContent = item.name;

      const cartItemPrice = document.createElement("div");
      cartItemPrice.classList.add("cart-item-price");
      cartItemPrice.textContent = `${item.price} SEK`;

      cartItemDetails.appendChild(cartItemTitle);
      cartItemDetails.appendChild(cartItemPrice);

      cartItemLeft.appendChild(cartItemImg);
      cartItemLeft.appendChild(cartItemDetails);

      // Create right part of cart item (quantity and remove buttons)
      const cartItemRight = document.createElement("div");
      cartItemRight.classList.add("cart-item-right");

      const quantityControls = document.createElement("div");
      quantityControls.classList.add("quantity-controls");

      const minusBtn = document.createElement("button");
      minusBtn.classList.add("quantity-btn");
      minusBtn.textContent = "-";
      minusBtn.onclick = () => updateQuantity(item.name, -1);

      const quantityText = document.createElement("span");
      quantityText.classList.add("quantity-text");
      quantityText.textContent = item.quantity;

      const plusBtn = document.createElement("button");
      plusBtn.classList.add("quantity-btn");
      plusBtn.textContent = "+";
      plusBtn.onclick = () => updateQuantity(item.name, 1);

      quantityControls.appendChild(minusBtn);
      quantityControls.appendChild(quantityText);
      quantityControls.appendChild(plusBtn);

      const removeBtn = document.createElement("button");
      removeBtn.classList.add("remove-item");
      removeBtn.onclick = () => removeItemFromCart(item.name);

      const binImg = document.createElement("img");
      binImg.src = "img/bin.png"; // Path to your bin image
      binImg.alt = "Remove";
      binImg.classList.add("bin-icon");

      removeBtn.appendChild(binImg);

      cartItemRight.appendChild(quantityControls);
      cartItemRight.appendChild(removeBtn);

      cartItem.appendChild(cartItemLeft);
      cartItem.appendChild(cartItemRight);

      cartItemsList.appendChild(cartItem);

      // Calculate total price
      totalPrice += item.price * item.quantity;
    });
  }

  // Update total price element
  totalPriceElement.textContent = `${totalPrice} SEK`;
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
    displayCartItems();
  }
}

// Remove item from cart
function removeItemFromCart(gameName) {
  let cartItems = getCartFromLocalStorage();

  cartItems = cartItems.filter((item) => item.name !== gameName);

  saveCartToLocalStorage(cartItems);
  displayCartItems();
}
