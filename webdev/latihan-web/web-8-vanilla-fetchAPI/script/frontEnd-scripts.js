// =========
// API CLASS
// =========

class ApiService {
  constructor() {
    // setup variable urlApi + token(key)
    this.token = "key";
    this.urlApi = `https://www.omdbapi.com/?apikey=${this.token}&`;
  }

  async getMoviesData(searchInput, halaman) {
    const response = await fetch(`${this.urlApi}s=${searchInput}&page=${halaman}`);

    // kasih error kalo url atau token salah
    if (!response.ok) {
      throw new Error("Gagal mengambil data daftar film dari server.");
    }

    const results = await response.json();
    return results;
  }

  async getDetailMovie(imdbID) {
    const response = await fetch(`${this.urlApi}i=${imdbID}`);

    // kasih error kalo url atau token salah
    if (!response.ok) {
      throw new Error("Gagal mengambil data daftar film dari server.");
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
    // API stuff
    this.api = new ApiService();

    // variabel DOM stuff
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
    this.paginationContainer = document.querySelector(".paginationContainer");

    // variabel pagination stuff
    this.halamanSekarang = 0;
    this.totalPencarian = 0;
    this.totalHalaman = 0;
    this.query = "";

    // inisiasi (langsung jalankan) fungsi saat awal halaman diload
    this.init();
  }

  // daftar fungsi init
  init() {
    this.loadDarkLightTheme();

    // cek element DOM, kalo ada jalanin fungsi init
    if (this.darkLightButton) this.darkLightModeToggle();
    if (this.hamburger && this.navbarMenu) this.hamburgerToggle();
    if (this.itemListNavbar.length > 0) this.closeNavbarMenu();
    if (this.inputSearchButton) this.cariFilm();
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
    if (this.darkLightText) {
      this.darkLightText.textContent = this.isDark() ? "☀️" : "🌙";
    }
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
  async getMovies() {
    // ambil data film
    try {
      const movies = await this.api.getMoviesData(this.query, this.halamanSekarang);
      return movies;
    } catch (error) {
      console.error("Gagal fetch film:", error.message);
      return null;
    }
  }

  // tampilkan film
  async tampilkanFilm() {
    this.paginationContainer.innerHTML = "";
    // hapus div.movieCard jika ada (membersihkan hasil pencarian sebelumnya)
    this.contentContainer.querySelectorAll(".movieCard").forEach((card) => card.remove());

    let movies = await this.getMovies();

    // pencarian film tidak ditmukan
    if (!movies || !movies.Search) {
      alert("Film tidak ditemukan.");
      return;
    }

    // setiap film hasil fetch akan dilooping untuk dimasukkan ke card
    movies.Search.forEach((movie) => {
      // membuat element container card (html+css sudah diprototype sebelumnya)
      const movieCard = document.createElement("div");
      movieCard.classList.add("movieCard");

      // tambahin element2 hasil fetch ke dalam div.movieCard
      movieCard.innerHTML = `
          <img src="${movie.Poster}" alt="Gambar tidak ditemukan" class="cardImg" loading="lazy" />
          <h4 class="judulCard">${movie.Title}</h4>
          <h4 class="tahunCard">(${movie.Year})</h4>
          <button class="lihatDetailCard" data-imdbid="${movie.imdbID}">Detail</button>
      `;

      // event tombol detail
      const detailButton = movieCard.querySelector(".lihatDetailCard");
      detailButton.addEventListener("click", async () => {
        // tambahin class toggleDetailMovie jadi => div.detailMovieContainer.toggleDetailMovie
        this.detailMovieContainer.classList.add("toggleDetailMovie");
        // di dalam <div class="detailMovieContainer toggleDetailMovie"></div> tambahin element div.detailMovieCard
        this.detailMovieContainer.innerHTML = `<div class="detailMovieCard loading">Sabar . . .</div>`;

        // ambil data detail
        // ketika tombol .lihatDetailCard diklik mengambil data imdbID dari data-imdbid
        let detail = null;
        try {
          const imdbID = detailButton.dataset.imdbid;
          // mencari detail dari imdbID yang sudah didapatkan
          detail = await this.api.getDetailMovie(imdbID);
        } catch (error) {
          alert("Gagal mengambil data daftar film dari server");
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
    return movies;
  }

  // fungsi mencari film
  cariFilm() {
    // cegah spam enter
    let sedangCari = false;

    const doPencarian = async (event) => {
      // cegah spam
      if (sedangCari) return;
      sedangCari = true;

      // balik ke halaman 1
      this.halamanSekarang = 1;

      // cegah submit form bawaan browser
      event.preventDefault();

      // ambil input, trim
      this.query = this.inputSearch.value.trim();
      if (!this.query) {
        alert("Isi pencarian dulu ya.");
        sedangCari = false;
        return;
      }

      // tampilkan film
      let movies = await this.tampilkanFilm();

      if (!movies) {
        sedangCari = false;
        return;
      }

      // tampilin pagination
      this.totalPencarian = movies.totalResults;
      this.totalHalaman = Math.ceil(this.totalPencarian / 10);
      this.paginationFunction(this.totalHalaman);

      // pencarian selesai
      sedangCari = false;
    };

    // tombol cari diklik
    this.inputSearchButton.addEventListener("click", doPencarian);

    // tekan Enter
    this.inputSearch.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        // cegah submit
        event.preventDefault();
        // kalo dienter sama kaya klik
        doPencarian(event);
      }
    });
  }

  // ==========
  // PAGINATION
  // ==========

  // fungsi pagination
  paginationFunction(totalHalaman) {
    // object untuk ganti halaman
    const gantiHalaman = async (halamanBaru) => {
      this.halamanSekarang = halamanBaru;
      await this.tampilkanFilm();
      this.paginationFunction(this.totalHalaman);
    };

    // tombol "<<" lompat ke halaman pertama
    // munculin tombol "<<" ketika halaman udah nyampe 4
    if (this.halamanSekarang >= 4) {
      const tombolHalPertama = document.createElement("button");
      tombolHalPertama.classList.add("paginationItem");
      tombolHalPertama.textContent = "<<";

      tombolHalPertama.addEventListener("click", () => gantiHalaman(1));
      this.paginationContainer.appendChild(tombolHalPertama);
    }

    // tombol "<" mundur satu halaman
    // munculin halaman lebih dari 1
    if (this.halamanSekarang > 1) {
      const tombolHalSebelumnya = document.createElement("button");
      tombolHalSebelumnya.classList.add("paginationItem");
      tombolHalSebelumnya.textContent = "<";

      tombolHalSebelumnya.addEventListener("click", () => gantiHalaman(this.halamanSekarang - 1));
      this.paginationContainer.appendChild(tombolHalSebelumnya);
    }

    // tombol angka (maksimal 5)
    // hitung halaman pertama (di navigasi pagination) pake max biar kalo dikurangin max nilai 1
    // halaman sekarang - 2 karena biar halaman aktif di tengah
    let noNavHalPertama = Math.max(1, this.halamanSekarang - 2);
    let noNavHalTerakhir = Math.min(totalHalaman, noNavHalPertama + 4);

    // kalo misal noNavHalTerakhir di navigasi - noNavHalPertama di navigasi itu kurang dari 4, tetep munculin 4 angka kebelakang
    // contoh: halaman terakhir 10, sekarang 8, kalo ditampilin 8 9 10, nah pake ini biar tetep 6 7 8 9 10
    if (noNavHalTerakhir - noNavHalPertama < 4) {
      noNavHalPertama = Math.max(1, noNavHalTerakhir - 4);
    }

    // looping buat tambahin halaman angka di antara sebelum dan selanjutnya
    for (let i = noNavHalPertama; i <= noNavHalTerakhir; i++) {
      const tombolHalaman = document.createElement("button");
      tombolHalaman.classList.add("paginationItem");
      tombolHalaman.textContent = i;

      // kalo misal aktif background warnanya berubah
      if (i === this.halamanSekarang) {
        tombolHalaman.classList.add("active");
      }

      tombolHalaman.addEventListener("click", () => gantiHalaman(i));
      this.paginationContainer.appendChild(tombolHalaman);
    }

    // tombol ">" maju satu halaman
    if (this.halamanSekarang < totalHalaman) {
      const tombolHalSelanjutnya = document.createElement("button");
      tombolHalSelanjutnya.classList.add("paginationItem");
      tombolHalSelanjutnya.textContent = ">";

      tombolHalSelanjutnya.addEventListener("click", () => gantiHalaman(this.halamanSekarang + 1));
      this.paginationContainer.appendChild(tombolHalSelanjutnya);
    }

    // tombol ">>" lompat ke halaman terakhir
    // ketika halaman sekarang lebih kecil dari total halaman - 3 munculin
    if (this.halamanSekarang <= totalHalaman - 3) {
      const tombolHalTerakhir = document.createElement("button");
      tombolHalTerakhir.classList.add("paginationItem");
      tombolHalTerakhir.textContent = ">>";

      tombolHalTerakhir.addEventListener("click", () => gantiHalaman(totalHalaman));
      this.paginationContainer.appendChild(tombolHalTerakhir);
    }
  }
}

// jalanin scriptnya setelah konten DOM terload!
document.addEventListener("DOMContentLoaded", () => {
  new FrontEndScripts();
});
