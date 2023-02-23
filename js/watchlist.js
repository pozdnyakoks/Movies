import { createEl } from "./createEl.js";

const watchlist = document.querySelector('.watchlist')
let btns;

function renderPage() {
  if (localStorage.films) {
    let localData = JSON.parse(localStorage.getItem('films'))
    let innerWatchlist = ''
    localData.forEach(film => {
      innerWatchlist += createEl(film, false)
    })
    watchlist.innerHTML = innerWatchlist;
    btns = document.querySelectorAll('.btn-add');
    btns.forEach(btn => btn.addEventListener('click', (ev) => {
      removeFilm(ev)
    }))
  } else {
    noData()
  }
}

renderPage();

function removeFilm(ev) {
  const localFilms = JSON.parse(localStorage.getItem('films'))
  const updateFilms = localFilms.filter(el => {
    return el.imdbID !== ev.target.parentElement.dataset.id
  })
  if (updateFilms.length > 0) {
    localStorage.films = JSON.stringify(updateFilms)
  } else {
    localStorage.clear()
    noData()
  }
  document.getElementById(ev.target.parentElement.dataset.id).classList.add('delete')
  setTimeout(renderPage, 300);

}

function noData() {
  watchlist.innerHTML = `
  <div class="empty-list-item">
   <p class="empty">Your watchlist is looking a little empty...</p>
   <p class="empty-add">
      <a href="index.html"><i class="fa-solid fa-circle-plus"></i></a></i>
      Let’s add some movies!
  </p>
  </div>
  `
}


