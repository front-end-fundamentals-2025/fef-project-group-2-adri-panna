// Apply parallax effect based on scroll position
window.addEventListener("scroll", function () {
  const bannerImage = document.querySelector(".banner-image");
  const scrollPosition = window.scrollY;

  // Adjust the speed of the parallax effect by changing the transform value
  bannerImage.style.transform = `translateY(${scrollPosition * 0.5}px)`; // Speed can be modified by changing the multiplier (0.5)
});

// Scroll Fade-In Effect
window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight;

  document
    .querySelectorAll(".game-item, .section-heading")
    .forEach((element) => {
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

// Add smooth transitions
const style = document.createElement("style");
style.innerHTML = `
  .game-item, .section-heading {
    transition: transform 0.5s ease-out, opacity 0.5s ease-out;
    opacity: 0;
  }
`;
document.head.appendChild(style);

// Include this script in your HTML file before the closing </body> tag:
// <script src="fade-animation.js"></script>
