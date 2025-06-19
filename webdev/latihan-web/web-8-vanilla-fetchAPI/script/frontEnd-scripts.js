class FrontEndScripts {
  constructor() {
    this.localDarkLightTheme = localStorage.getItem("darkLightTheme");
    this.hamburger = document.querySelector(".hamburger");
    this.navbarMenu = document.querySelector(".navbarMenu");
    this.darkLightButton = document.querySelector(".darkLightToggle");
    this.darkLightText = document.querySelector(".darkLightToggleText");
    this.bodyElement = document.querySelector("body");
    this.itemListNavbar = document.querySelectorAll(".itemListNavbar");

    this.init();
  }

  init() {
    this.loadDarkLightTheme();
    this.isDark();
    this.updateDarkLightIcon();
    this.hamburgerToggle();
    this.closeNavbarMenu();
    this.darkLightModeToggle();
  }

  // load dark light theme
  loadDarkLightTheme() {
    if (this.localDarkLightTheme === "dark") {
      this.bodyElement.classList.add("darkMode");
    }
    this.updateDarkLightIcon();
  }

  // cek class body untuk dark mode
  isDark() {
    return this.bodyElement.classList.contains("darkMode");
  }

  // update dark light icon
  updateDarkLightIcon() {
    this.darkLightText.textContent = this.isDark() ? "☀️" : "🌙";
  }

  // navbar responsive
  hamburgerToggle() {
    this.hamburger.addEventListener("click", () => {
      this.hamburger.classList.toggle("toggleMenuNavbar");
      this.navbarMenu.classList.toggle("toggleMenuNavbar");
    });
  }

  // tutup navmenu ketika mengklik itemListNavbar
  closeNavbarMenu() {
    this.itemListNavbar.forEach((item) => {
      item.addEventListener("click", () => {
        this.hamburger.classList.remove("toggleMenuNavbar");
        this.navbarMenu.classList.remove("toggleMenuNavbar");
      });
    });
  }

  //dark light mode toggle + save theme
  darkLightModeToggle() {
    this.darkLightButton.addEventListener("click", () => {
      this.bodyElement.classList.toggle("darkMode");
      this.updateDarkLightIcon();

      this.darkLightText.classList.add("animasiIkon");
      setTimeout(() => {
        this.darkLightText.classList.remove("animasiIkon");
      }, 500);

      localStorage.setItem("darkLightTheme", this.isDark() ? "dark" : "light");
    });
  }
}

// run script!
document.addEventListener("DOMContentLoaded", () => {
  new FrontEndScripts();
});
