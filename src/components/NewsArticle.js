export default class NewsArticle extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({mode: 'open'});
  }
  set article(article) {
    this.root.innerHTML = `
      <style>
      h2 {
        font-family: NYTCheltenham;
      }

       a,
       a:visited {
        text-decoration: none;
        color: inherit;
      }

       img {
        width: 100%;
      }
      </style>
      <div>
        <h2>${article.title}</h2>
        <img src="${article.urlToImage ? article.urlToImage : ''}">
        <p>${article.description}</p>
      </div>`;
  }
}

customElements.define('news-article', NewsArticle);
