// Continuous slow scrolling carousel with clickable images that navigate to links
const carousel = document.querySelector(".carousel");
const images = document.querySelectorAll(".carousel-image");

let currentOffset = 0;
const imageWidth = images[0].clientWidth + 10; // Including gap

// Continuous scrolling function
function continuousScroll() {
  currentOffset -= 1; // Scroll speed (1px per frame)

  // Reset position to create a seamless loop
  if (Math.abs(currentOffset) >= carousel.scrollWidth / 2) {
    currentOffset = 0;
  }

  carousel.style.transform = `translateX(${currentOffset}px)`;
  requestAnimationFrame(continuousScroll);
}

// Add click event to images
images.forEach((image) => {
  image.style.cursor = "pointer";
  image.addEventListener("click", () => {
    const link = image.getAttribute("data-link");
    if (link) {
      window.open(link, "_blank"); // Opens in a new tab
    }
  });
});

// Start the continuous scrolling
continuousScroll();

// Responsive resize handling
window.addEventListener("resize", () => {
  imageWidth = images[0].clientWidth + 10;
});

// Now clicking an image opens its link in a new tab — just add a 'data-link' attribute to each <img> tag! 🚀
