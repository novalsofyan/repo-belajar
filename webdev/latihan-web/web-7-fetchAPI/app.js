searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function getMovies() {
  try {
    const inputKeyword = document.querySelector(".input-search-keyword").value;
    const response = await fetch("http://www.omdbapi.com/?apikey=api&s=" + inputKeyword);
    const results = await response.json();
    const movies = results.Search;
    console.log(movies);

    let cards = "";

    movies.sort((a, b) => {
      const yearA = parseInt(a.Year.slice(0, 4));
      const yearB = parseInt(b.Year.slice(0, 4));
      return yearB - yearA;
    });

    movies.forEach((m) => {
      cards += `
        <div class="col-sm-6 col-md-4 col-lg-3 my-3 d-flex">
          <div class="card h-100 w-100 d-flex flex-column">
            <img src="${m.Poster}" class="card-img-top" alt="Tidak ada gambar ditemukan" />
            <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
              <a href="#" class="btn btn-primary modal-detail-mov" data-bs-toggle="modal" data-bs-target="#detailModal" data-imdbid="${m.imdbID}">Detail</a>
            </div>
          </div>
        </div>`;

      const movieContainer = document.querySelector(".movie-container");
      movieContainer.innerHTML = cards;
    });

    const detailMov = document.querySelectorAll(".modal-detail-mov");
    detailMov.forEach((btn) => {
      btn.addEventListener("click", async function () {
        const responseDetailMov = await fetch("http://www.omdbapi.com/?apikey=api&i=" + this.getAttribute("data-imdbid"));
        const resultsDetailMov = await responseDetailMov.json();
        const detailMovies = resultsDetailMov;

        const modalDetailMovies = document.querySelector(".modal-body");
        modalDetailMovies.innerHTML = `
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-4 mb-3">
                    <img src="${detailMovies.Poster}" alt="Tidak ada gambar ditemukan" class="img-fluid rounded shadow" />
                </div>

                <div class="col-md-8">
                    <ul class="list-group">
                          <li class="list-group-item"> <h4>${detailMovies.Title} (${detailMovies.Year})</h4></li>
                          <li class="list-group-item"><strong>Director: </strong>${detailMovies.Director}</li>
                          <li class="list-group-item"><strong>Aktor: </strong>${detailMovies.Actors}</li>
                        <li class="list-group-item"><strong>Writer: </strong>${detailMovies.Writer}</li>
                      <li class="list-group-item"><strong>Plot: </strong><br />${detailMovies.Plot}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        `;
      });
    });
  } catch (error) {
    console.log(error);
  }
});
