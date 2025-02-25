let currentIndex = 0;

function scrollCarousel(direction) {
  const carousel = document.querySelector(".carousel");
  const images = document.querySelectorAll(".carousel-image");
  const totalImages = images.length;
  const visibleImages = 4;
  const imageWidth = images[0].clientWidth;

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalImages - visibleImages;
  } else if (currentIndex >= totalImages - visibleImages + 1) {
    currentIndex = 0;
  }

  const offset = -currentIndex * imageWidth;
  carousel.style.transform = `translateX(${offset}px)`;
}
