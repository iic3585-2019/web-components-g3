const template = document.createElement('template');
template.innerHTML = `
  <style>
    .btn {
      text-decoration: none;
    }
    .btn-default {
      background-color: red;
    }
    .btn-primary {
      background-color: blue;
    }
    a {
      color: white;
    }
  </style>
  <a class="btn" id="content"></a>
`;

export default class Button extends HTMLElement {
  static get observedAttributes() {
    return ['onClick', 'text', 'style', 'url'];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.appendChild(template.content.cloneNode(true));
    this.buttonContent = this.shadow.getElementById('content');

    this.buttonContent.addEventListener('click', (e) => {});
  }

  connectedCallback() {
    // We set a default attribute here; if our end user hasn't provided one,
    // our element will display a "placeholder" text instead.
    if (!this.hasAttribute('text')) {
      this.setAttribute('text', 'Button');
    }

    if (!this.hasAttribute('style')) {
      this.buttonContent.classList.add('btn-default');
    }

    this._renderTodoItem();
  }

  _renderTodoItem() {
    if (this.hasAttribute('url')) {
      this.buttonContent.setAttribute('href', this._url);
    }

    if (this.hasAttribute('text')) {
      this.buttonContent.innerHTML = this._text;
    }

    if (this.hasAttribute('style')) {
      switch (this._style) {
        case 'primary':
          this.buttonContent.classList.add('btn-primary');
          break;
        default:
      }
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'url':
        this._url = newValue;
        break;
      case 'text':
        this._text = newValue;
        break;
      case 'style':
        this._style = newValue;
        break;
      default:
        break;
    }
  }
}

customElements.define('app-button', Button);
