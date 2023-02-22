import { createEl } from "./createEl.js";

const watchlist = document.querySelector('.watchlist')
let btns;

function renderPage() {
  if (localStorage.getItem('films') !== null) {
    let localData = JSON.parse(localStorage.getItem('films'))
    let innerWatchlist = ''
    localData.forEach(film => {
      innerWatchlist += createEl(film, false)
    })
    watchlist.innerHTML = innerWatchlist;
    btns = document.querySelectorAll('.btn-add');
    btns.forEach(btn => btn.addEventListener('click', (ev) => {
      removeFilm(ev)
    }
    ))
  } else {
    noData()
  }
}
renderPage();

function removeFilm(ev) {
  const locAr = JSON.parse(localStorage.getItem('films'))
  const newAr = locAr.filter(el => {
    return el.imdbID !== ev.target.parentElement.dataset.id
  })
  if (newAr.length > 0) {
    localStorage.setItem('films', JSON.stringify(newAr))
  } else {
    localStorage.clear()
    noData()
  }

  renderPage();

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


