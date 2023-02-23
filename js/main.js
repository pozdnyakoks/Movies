import { createEl } from "./createEl.js";

const filmList = document.querySelector('.film-list')
let filmAr = []
let filmData = [];

document.querySelector('form').addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const value = document.querySelector('.search').value.toLowerCase();

  fetch(`https://www.omdbapi.com/?s=${value}&apikey=8f38710c`)
    .then(res => res.json())
    .then((data) => {
      Promise.all(
        data.Search.map((film) => fetch(`https://www.omdbapi.com/?i=${film.imdbID}&apikey=8f38710c`).then((res) => res.json()))
      ).then(result => {
        for (let filmObj of result) {
          let listInnerHTML = '';
          filmData.push(filmObj)
          filmAr.push(createEl(filmObj, true))
          filmAr.forEach(filmStr => {
            listInnerHTML += filmStr
          })
          filmList.innerHTML = listInnerHTML;
        }

        document.querySelectorAll('.btn-add').forEach(btn => {
          btn.addEventListener('click', (ev) => {
            addToLocStorage(ev.target.parentElement.dataset.id)
            btn.parentElement.innerHTML = `
              <i class="fa-solid fa-check"></i> Go watch
                `
          })
        })
      })

    })

    .catch((er) => {
      console.log(er)
      filmList.innerHTML = `
    <li class="empty-list-item"><p class="empty">Unable to find what you’re looking for. Please try another search.</p></li>
  `
    })

})

function addToLocStorage(id) {
  let updateFilms = [];
  const filmObj = filmData.filter(film => {
    return film.imdbID === id
  })[0]

  if (localStorage.films) {
    updateFilms = JSON.parse(localStorage.getItem('films'))
  }
  updateFilms.push(filmObj);
  localStorage.films = JSON.stringify(updateFilms)
}



