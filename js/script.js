document.addEventListener("DOMContentLoaded", function () {
  fetch("layout.html")
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");

      // Insert navbar
      document.getElementById("navbar").innerHTML =
        doc.querySelector("nav").outerHTML;

      // Insert footer
      document.getElementById("footer").innerHTML =
        doc.querySelector("footer").outerHTML;
    })
    .catch((error) => console.error("Error loading layout:", error));
});
