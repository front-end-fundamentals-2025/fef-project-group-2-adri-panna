// Apply parallax effect based on scroll position
window.addEventListener("scroll", function () {
  const bannerImage = document.querySelector(".banner-image");
  const scrollPosition = window.scrollY;

  // Adjust the speed of the parallax effect by changing the transform value
  bannerImage.style.transform = `translateY(${scrollPosition * 0.5}px)`; // Speed can be modified by changing the multiplier (0.5)
});
