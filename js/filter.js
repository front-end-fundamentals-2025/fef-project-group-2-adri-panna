// Price Range slider
const priceRange = document.getElementById("price-range");
const priceLabel = document.getElementById("price-label");
const priceValue = document.getElementById("price-value");

priceRange.addEventListener("input", function () {
  priceValue.textContent = priceRange.value;
});

// Filter Apply button
document.getElementById("apply-filters").addEventListener("click", function () {
  const searchQuery = document.getElementById("search").value.toLowerCase();
  const genres = Array.from(
    document.querySelectorAll(".genre-filter:checked")
  ).map((input) => input.value);
  const price = priceRange.value;
  const rating = document.querySelector('input[name="rating"]:checked')?.value;

  console.log("Search Query:", searchQuery);
  console.log("Genres:", genres);
  console.log("Price Range:", price);
  console.log("Rating:", rating);

  // Implement your filtering logic here (e.g., make an API call with the filters)
});
