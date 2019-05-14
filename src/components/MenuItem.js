const template = document.createElement('template');
template.innerHTML = `
<style>
  :host {
    display: block;
    text-align: center;
  }

  ul {
    display: none;
  }

  ul:hover {
    display: block;
  }

</style>
<li id="menu-item">
  <p id="name"></p>
  <ul>
  </ul>
</li>
`;

class NavbarItem extends HTMLElement {
  constructor() {
    super();
    // Do setup stuff
    this.shadowRoot = this.attachShadow({'mode': 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode);
    this.$name = this.shadowRoot.getElementById('name');
    this.$list = this.shadowRoot.querySelector('ul');
  }

  connectedCallback() {

  }

  disconnectedCallback() {

  }

  attributeChangedCallback(name, oldVal, newVal) {

  }

  adoptedCallback() {

  }

  _render() {
    this._items.forEach((i) => {
      const $item = document.createElement('li');
      $item.innerHTML = i;
      this.$list.appendChild($item);
    });
  }

  set items(value) {
    this.$name.innerHTML = value[0];
    const items = value.slice(1);
    items.forEach((i) => {
      this._items.push(i);
    });
    this._render();
  }

  get items() {
    return this._items;
  }
}

window.customElements.define('nav-bar-item', NavbarItem);

