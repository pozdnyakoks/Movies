export function createEl({ Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID }, isAdd) {

  return `
      <li class="film-item" id=${imdbID}>
          <img src=${Poster} alt="poster">
          <div class="film-block">
            <div class="film-title">
              <h2 class="film-capture">${Title}</h2>
              <i class="fa-solid fa-star"></i><span class="rating">${imdbRating}</span>
            </div>
            <div class="film-info">
              <p class="desc count">${Runtime}</p>
              <p class="desc type">${Genre}</p>
              <p class="desc"><button class="btn-add" data-id=${imdbID}><i class="fa-solid ${isAdd ? 'fa-circle-plus' : "fa-circle-minus"}"></i></button>Watchlist</p>
            </div>
            <p class="film-desc">${Plot}</p>

          </div>
        </li>
      `
}