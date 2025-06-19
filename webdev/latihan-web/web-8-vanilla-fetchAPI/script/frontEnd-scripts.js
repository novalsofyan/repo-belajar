// =========
// API CLASS
// =========

class ApiService {
  constructor() {
    // setup variable urlApi + token(key)
    this.token = "key";
    this.urlApi = `http://www.omdbapi.com/?apikey=${this.token}&`;
  }

  async getMoviesData(searchInput) {
    const response = await fetch(`${this.urlApi}s=${searchInput}`);

    // kasih error kalo url atau token salah
    if (!response.ok) {
      throw new Error("Gagal mengambil data daftar film dari server.");
    }

    const results = await response.json();
    return results.Search;
  }

  async getDetailMovie(imdbID) {
    const response = await fetch(`${this.urlApi}i=${imdbID}`);

    // kasih error kalo url atau token salah
    if (!response.ok) {
      throw new Error("Gagal mengambil data daftar film dari server");
    }
    const result = await response.json();
    return result;
  }
}

// =======================
// FRONT-END SCRIPTS CLASS
// =======================

class FrontEndScripts {
  constructor() {
    this.api = new ApiService();

    this.localDarkLightTheme = localStorage.getItem("darkLightTheme");
    this.hamburger = document.querySelector(".hamburger");
    this.navbarMenu = document.querySelector(".navbarMenu");
    this.darkLightButton = document.querySelector(".darkLightToggle");
    this.darkLightText = document.querySelector(".darkLightToggleText");
    this.bodyElement = document.querySelector("body");
    this.itemListNavbar = document.querySelectorAll(".itemListNavbar");
    this.inputSearchButton = document.querySelector(".searchButton");
    this.inputSearch = document.querySelector(".inputSearch");
    this.contentContainer = document.querySelector(".contentContainer");
    this.detailMovieContainer = document.querySelector(".detailMovieContainer");

    this.init();
  }

  init() {
    this.loadDarkLightTheme();
    this.isDark();
    this.updateDarkLightIcon();
    this.darkLightModeToggle();
    this.hamburgerToggle();
    this.closeNavbarMenu();
    this.getMovies();
  }

  // ================
  // DARK LIGHT THEME
  // ================

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

  // dark light mode toggle + save theme
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

  // =====================
  // FUNGSIONALITAS NAVBAR
  // =====================

  // klik hamburger muncul menu
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

  // ==========================
  // FUNGSIONALITAS DATA MOVIES
  // ==========================

  // mendapatkan data film
  getMovies() {
    this.inputSearchButton.addEventListener("click", async (event) => {
      // biar ga refresh ketika diklik search
      event.preventDefault();

      // kalo misal user tidak input apapun kasih alert
      const query = this.inputSearch.value.trim();
      if (!query) {
        alert("Isi pencarian dulu ya.");
        return;
      }

      // hapus div.movieCard jika ada (membersihkan hasil pencarian sebelumnya)
      this.contentContainer.querySelectorAll(".movieCard").forEach((card) => card.remove());

      // ambil data film
      let movies = null;
      try {
        movies = await this.api.getMoviesData(query);
      } catch (error) {
        alert(error.message);
        return;
      }

      // kalo misal film tidak ada kasih alert
      if (!movies) {
        alert("Film tidak ditemukan.");
        return;
      }

      // setiap film hasil fetch akan dilooping untuk dimasukkan ke card
      movies.forEach((movie) => {
        // membuat element container card (html+css sudah diprototype sebelumnya)
        const movieCard = document.createElement("div");
        movieCard.classList.add("movieCard");

        // tambahin element2 hasil fetch ke dalam div.movieCard
        movieCard.innerHTML = `
          <img src="${movie.Poster}" alt="Gambar tidak ditemukan" class="cardImg" />
          <h4 class="judulCard">${movie.Title}</h4>
          <h4 class="tahunCard">(${movie.Year})</h4>
          <button class="lihatDetailCard" data-imdbid="${movie.imdbID}">Detail</button>
      `;

        // event tombol detail
        const detailButton = movieCard.querySelector(".lihatDetailCard");
        detailButton.addEventListener("click", async () => {
          // tampilkan container dulu
          // tambahin class toggleDetailMovie jadi => div.detailMovieContainer.toggleDetailMovie
          this.detailMovieContainer.classList.add("toggleDetailMovie");
          // di dalam <div class="detailMovieContainer toggleDetailMovie"></div> tambahin element div.detailMovieCard
          this.detailMovieContainer.innerHTML = `<div class="detailMovieCard"></div>`;

          // ambil data detail
          // ketika tombol .lihatDetailCard diklik mengambil data imdbID dari data-imdbid
          let detail = null;
          try {
            const imdbID = detailButton.dataset.imdbid;
            // mencari detail dari imdbID yang sudah didapatkan
            detail = await this.api.getDetailMovie(imdbID);
          } catch (error) {
            alert(error.message);
            return;
          }

          // tampilkan isi lengkap setelah data tersedia (html+css sudah diprototype sebelumnya)
          this.detailMovieContainer.innerHTML = `
          <div class="detailMovieCard">
            <div class="imgDMContainer">
              <img class="imgDetail" src="${detail.Poster}" alt="Gambar tidak ditemukan" />
            </div>
            <ul class="detailDesc">
              <li class="detailDescItem"><strong>Judul</strong></li>
              <li class="detailDescItem">:</li>
              <li class="detailDescItem">${detail.Title}</li>
              <li class="detailDescItem"><strong>Tahun</strong></li>
              <li class="detailDescItem">:</li>
              <li class="detailDescItem">${detail.Year}</li>
              <li class="detailDescItem"><strong>Direktor</strong></li>
              <li class="detailDescItem">:</li>
              <li class="detailDescItem">${detail.Director}</li>
              <li class="detailDescItem"><strong>Penulis</strong></li>
              <li class="detailDescItem">:</li>
              <li class="detailDescItem">${detail.Writer}</li>
              <li class="detailDescItem"><strong>Aktor</strong></li>
              <li class="detailDescItem">:</li>
              <li class="detailDescItem">${detail.Actors}</li>
              <li class="detailDescItem"><strong>Sinopsis</strong></li>
              <li class="detailDescItem">:</li>
              <li class="detailDescItem">${detail.Plot}</li>
              <button class="closeDetailMovie">Tutup</button>
            </ul>
          </div>
        `;

          // tutup detail
          const closeDetailMovie = this.detailMovieContainer.querySelector(".closeDetailMovie");
          closeDetailMovie.addEventListener("click", () => {
            // hapus class .toggleDetailMovie biar ketutup
            this.detailMovieContainer.classList.remove("toggleDetailMovie");
            // kosongin isi detailMovieContainer buat di isi di klik selanjutnya
            this.detailMovieContainer.innerHTML = "";
          });
        });

        // tambahin movie card ke div.contentContainer setelah form.searchForm
        this.contentContainer.appendChild(movieCard);
      });
    });
  }
}

// jalanin scriptnya setelah konten DOM terload!
document.addEventListener("DOMContentLoaded", () => {
  new FrontEndScripts();
});
