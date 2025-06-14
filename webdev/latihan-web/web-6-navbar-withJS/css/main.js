// Navbar app

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navMenu");
const navLinks = document.querySelectorAll(".navMenuItem");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Tutup menu hamburger ketika setiap element .navMenuItem diklik
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});
