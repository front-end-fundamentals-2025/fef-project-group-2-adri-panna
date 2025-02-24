let slideIndex = 0;

function moveSlide(step) {
  const slides = document.querySelectorAll(".carousel-item");
  slideIndex += step;

  if (slideIndex >= slides.length) {
    slideIndex = 0;
  } else if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }

  const offset = -slideIndex * 100;
  document.querySelector(
    ".carousel-inner"
  ).style.transform = `translateX(${offset}%)`;
}
