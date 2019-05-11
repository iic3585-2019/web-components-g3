import './components/NewsArticle.js';
import topHeadlinesUrl from './services/newsAPI.js';
import './styles/index.scss';

async function getNews() {
  const res = await fetch(topHeadlinesUrl);
  const json = await res.json();

  const main = document.querySelector('main');

  json.articles.forEach((article) => {
    const el = document.createElement('news-article');
    el.article = article;
    main.appendChild(el);
  });
}

window.addEventListener('load', () => {
  getNews();
});

if (module.hot) {
  module.hot.accept();
}
