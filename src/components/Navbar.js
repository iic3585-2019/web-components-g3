const template = document.createElement('template');
template.innerHTML = `
<style>
  :host {
    display: block;
    text-align: center;
  }

</style>
`;

class Navbar extends HTMLElement {
  constructor() {
    super();
    // Do setup stuff
    this.shadowRoot = this.attachShadow({'mode': 'open'});
  }

  connectedCallback() {

  }

  disconnectedCallback() {

  }

  attributeChangedCallback(name, oldVal, newVal) {

  }

  adoptedCallback() {

  }
}

window.customElements.define('nav-bar', Navbar);
