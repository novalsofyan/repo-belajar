// navbar responsive

const hamburger = document.querySelector(".hamburger");
const navbarMenu = document.querySelector(".menuContainer");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("toggleMenuNavbar");
  navbarMenu.classList.toggle("toggleMenuNavbar");
});
