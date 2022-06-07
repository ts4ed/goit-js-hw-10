import './css/styles.css';
const debounce = require('lodash.debounce');
import { fetchCountries } from './fetchCounetr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;
const refs = {
  serch: document.querySelector('[id="search-box"]'),
  result: document.querySelector('.country-info'),
  list: document.querySelector('.country-list'),
};
refs.serch.addEventListener('input', debounce(fetch, DEBOUNCE_DELAY));

function fetch(elm) {
  const textInput = elm.target.value.trim();

  fetchCountries(textInput)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
        return;
      }
      renderMarkup(data);
    })
    .catch(error => {
      cleanMarkup(refs.result);
      cleanMarkup(refs.list);
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderMarkup(data) {
  if (data.length === 1) {
    cleanMarkup(refs.list);
    const markupInfo = createInfoMarkup(data);
    refs.result.innerHTML = markupInfo;
  } else {
    cleanMarkup(refs.result);
    const markupList = createListMarkup(data);
    refs.list.innerHTML = markupList;
  }
}

function createInfoMarkup(data) {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<h2 style="display: flex;"><img src="${flags.png}" alt="${
        name.official
      }" width="40" height="40"><span style="margin-left: 15px">${
        name.official
      }</span></h2>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`
  );
}

function createListMarkup(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<li style="list-style: none; margin-bottom: 10px; display: flex; align-items: center"><img src="${flags.png}" alt="${name.official}" width="60" height="40"><span style="margin-left: 10px">${name.official}</span></li>`
    )
    .join('');
}

function cleanMarkup (clean) {
  clean.innerHTML = '';
};