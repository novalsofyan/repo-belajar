// Navbar app

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navMenu");
const navLinks = document.querySelectorAll(".navMenuItem");
const DLMode = document.querySelector(".DLMode");

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

// Pengaturan Night atau Light Mode

DLMode.addEventListener("click", () => {
  document.body.classList.toggle("lightMode");
  const isLight = document.body.classList.contains("lightMode");

  // Ganti teks tombol
  DLMode.textContent = isLight ? "⏾" : "☀";

  // Simpan status  ke localStorage
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Saat halaman dibuka, cek localStorage untuk memuat tema
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("lightMode");
  DLMode.textContent = "⏾";
} else {
  DLMode.textContent = "☀";
}
