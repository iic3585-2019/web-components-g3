const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
            font-family: sans-serif;
        }
        .completed {
            text-decoration: line-through;
        }
        button {
            border: none;
            cursor: pointer;
        }
    </style>
    <li class="item">
        <input type="checkbox">
        <a></a>
        <button>❌</button>
    </li>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$item = this._shadowRoot.querySelector('.item');
    this.$removeButton = this._shadowRoot.querySelector('button');
    this.$text = this._shadowRoot.querySelector('a');
    this.$checkbox = this._shadowRoot.querySelector('input');

    this.$removeButton.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('onRemove', {detail: this.index}));
    });

    this.$checkbox.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('onToggle', {detail: this.index}));
    });
  }

  connectedCallback() {
    if (!this.hasAttribute('text')) {
      this.setAttribute('text', 'placeholder');
    }

    this._renderTodoItem();
  }

  static get observedAttributes() {
    return ['text', 'checked', 'index', 'url'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'text':
        this._text = newValue;
        break;
      case 'checked':
        this._checked = this.hasAttribute('checked');
        break;
      case 'index':
        this._index = parseInt(newValue);
        break;
      case 'url':
        this._url = newValue;
        break;
    }
  }

  _renderTodoItem() {
    if (this.hasAttribute('checked')) {
      this.$item.classList.add('completed');
      this.$checkbox.setAttribute('checked', '');
    } else {
      this.$item.classList.remove('completed');
      this.$checkbox.removeAttribute('checked');
    }

    this.$text.innerHTML = this._text;
    if (this._url) {
      this.$text.setAttribute('href', this._url);
    }
  }

  set index(val) {
    this.setAttribute('index', val);
  }

  get index() {
    return this._index;
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  get url() {
    return this._url;
  }

  set url(val) {
    this.setAttribute('url', val);
  }

  set checked(val) {
    if (val) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }
}
window.customElements.define('to-do-item', TodoItem);
