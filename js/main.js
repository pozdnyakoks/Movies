import { createEl } from "./createEl.js";

const filmList = document.querySelector('.film-list')
let filmAr = []
let filmData = [];

document.querySelector('form').addEventListener('submit', (ev) => {
  ev.preventDefault();
  const value = document.querySelector('.search').value.toLowerCase();

  fetch(`http://www.omdbapi.com/?s=${value}&apikey=8f38710c`)
    .then(res => res.json())
    .then(data => {
      for (let film of data.Search) {
        fetch(`http://www.omdbapi.com/?i=${film.imdbID}&apikey=8f38710c`)
          .then(res => res.json())
          .then(data => {
            filmData.push(data)

            filmAr.push(createEl(data, true))
            let listInnerHTML = '';
            filmAr.forEach(filmStr => {
              listInnerHTML += filmStr
            })

            filmList.innerHTML = listInnerHTML;
            document.querySelectorAll('.btn-add').forEach(btn => {
              btn.addEventListener('click', (ev) => {
                addToLocStorage(ev.target.parentElement.dataset.id)
                btn.parentElement.innerHTML = `
                <i class="fa-solid fa-check"></i> Go watch
                `
              })
            })

          })
      }
    })

    .catch(() => filmList.innerHTML = `
      <li class="empty-list-item"><p class="empty">Unable to find what you’re looking for. Please try another search.</p></li>
    `)


})

function addToLocStorage(id) {
  let arr = [];
  const filmObj = filmData.filter(film => {
    return film.imdbID === id
  })[0]

  if (localStorage.getItem('films') !== null) {
    arr = JSON.parse(localStorage.getItem('films'))
  }
  arr.push(filmObj);
  localStorage.setItem('films', JSON.stringify(arr))
}



