import './components/NewsArticle.js';
import './components/FlipCard.js';
import './components/StarsRating.js';
import './components/Button.js';
import './components/TodoList.js';

import topHeadlinesUrl from './services/newsAPI.js';
import countriesData from './assets/data/countries';
import './styles/index.scss';

const todos = [];

const populateTodos = () => {
  const todoList = document.getElementById('todo-list');
  const todoListElem = document.createElement('todo-list');
  todoListElem.setAttribute('id', 'todo-list-elem');
  todoListElem.todos = todos;
  todoList.appendChild(todoListElem);
};

const addTodo = (item) => {
  const todoList = document.getElementById('todo-list-elem');
  const newItem = {text: item.title, checked: false, url: item.url};
  todos.push(newItem);
  todoList.todos = todos;
};

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
    const starsRating = document.createElement('stars-rating');
    //  StarsRating config
    starsRating.onPress = (val) => {
      alert(`${val} clicked`);
    };

    const button = document.createElement('app-button');
    const addTodoListButton = document.createElement('app-button');
    const backElement = document.createElement('div');
    //  adding backcontent
    backElement.setAttribute('id', 'back-wrapper');
    backElement.appendChild(starsRating);
    backElement.appendChild(button);
    backElement.appendChild(addTodoListButton);
    //  config url button
    button.setAttribute('url', article.url);
    button.setAttribute('text', 'Link');
    button.setAttribute('style', 'primary');
    // config todo button
    addTodoListButton.setAttribute('style', 'default');
    addTodoListButton.setAttribute('text', 'Add to to-read list');
    addTodoListButton.item = article;
    addTodoListButton.addEventListener('click', () => {
      addTodo(addTodoListButton.item);
    });

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
  populateTodos();
});

if (module.hot) {
  module.hot.accept();
}
