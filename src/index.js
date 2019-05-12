import './components/NewsArticle.js';
import './components/FlipCard.js';

import topHeadlinesUrl from './services/newsAPI.js';
import countriesData from './assets/data/countries';
import './styles/index.scss';

async function getNews(country) {
  const res = await fetch(topHeadlinesUrl(country));
  const json = await res.json();

  const main = document.querySelector('main');
  while (main.firstChild) {
    main.firstChild.remove();
  }

  json.articles.forEach((article) => {
    const el = document.createElement('news-article');
    const flipCard = document.createElement('flip-card');
    // TODO: add news stars rating at the back of the card
    // backElement is just an example
    const backElement = document.createElement('div');
    const pElement = document.createElement('p');
    pElement.innerHTML = ':-)';
    backElement.setAttribute('style', 'display: flex; background-color: red;');
    backElement.appendChild(pElement);

    el.article = article;
    flipCard.content = {
      front: el,
      back: backElement,
    };
    main.appendChild(flipCard);
  });
}

async function populateCountriesSelect() {
  const select = document.getElementById('countries-select');
  select.addEventListener('change', (country) => {
    getNews(select.value);
  });

  countriesData.forEach((country) => {
    const option = document.createElement('option');
    option.value = country.value;
    option.innerHTML = country.title;
    select.appendChild(option);
  });
}

window.addEventListener('load', () => {
  populateCountriesSelect();
});

if (module.hot) {
  module.hot.accept();
}
