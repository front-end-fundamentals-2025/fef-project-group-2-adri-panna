// Parallax effect based on scroll position (for carousel container, but stays static)
window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;

  // Apply parallax effect to other sections like carousel container if needed
  // In this case, we will not move the carousel, so we can just ignore it here.
  // Leave this part empty or you can remove it if unnecessary.
});

// Scroll Fade-In Effect for game items and the genres text
window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight;

  document.querySelectorAll(".game-item, #genres-text").forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.style.opacity = 1;
      element.style.transform = "translateY(0)";
    } else {
      element.style.opacity = 0;
      element.style.transform = "translateY(50px)";
    }
  });
});

// Add smooth transitions for fading and sliding effect
const style = document.createElement("style");
style.innerHTML = `
    .game-item, #genres-text {
      transition: transform 0.5s ease-out, opacity 0.5s ease-out;
      opacity: 0;
    }
  `;
document.head.appendChild(style);
