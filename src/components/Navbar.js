const template = document.createElement('template');
template.innerHTML = `
<style>
  :host {
    display: block;
    text-align: center;
  }

  .menu {
    display: flex;
  }

</style>
<ul id="menu"></ul>
`;

class Navbar extends HTMLElement {
  constructor() {
    super();
    // Do setup stuff
    this.shadowRoot = this.attachShadow({'mode': 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode);
    this.$menu = this.shadowRoot.getElementById('menu');
  }

  connectedCallback() {

  }

  disconnectedCallback() {

  }

  attributeChangedCallback(name, oldVal, newVal) {

  }

  adoptedCallback() {

  }

  render() {
    this.$menu.innerHTML = '';
    this._items.forEach((i) => {
      this.$menu.appendChild(i);
    });
  }

  // Receives an Array of Arrays containing the names of each menu item
  set items(value) {
    value.forEach((i) => {
      const newItem = document.createElement('nav-bar-item');
      newItem.setAttribute('items', value);
      this._items.push(newItem);
    });
    this.render();
  }

  get items() {
    return this._items;
  }
}

window.customElements.define('nav-bar', Navbar);
