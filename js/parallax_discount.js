// Scroll Fade-In Effect for H1 and Game Items
window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight;

  // Select h1 and all game items in the discounts container
  document.querySelectorAll("h1, .game-item").forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    // If element is in view (100px before bottom)
    if (elementTop < windowHeight - 100) {
      element.style.opacity = 1;
      element.style.transform = "translateY(0)";
    } else {
      element.style.opacity = 0;
      element.style.transform = "translateY(50px)";
    }
  });
});

// Add smooth transitions to H1 and Game Items
const style = document.createElement("style");
style.innerHTML = `
    h1, .game-item {
      transition: transform 0.5s ease-out, opacity 0.5s ease-out;
      opacity: 0; /* Ensure elements start as invisible */
      transform: translateY(50px); /* Ensure elements start with an offset */
    }
  `;
document.head.appendChild(style);

// Add the fade-in effect when the page loads
window.addEventListener("load", () => {
  // Manually trigger scroll event for initial fade-in when page loads
  window.dispatchEvent(new Event("scroll"));
});
