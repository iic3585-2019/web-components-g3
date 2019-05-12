export default class FlipCard extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({mode: 'open'});
    this.root.innerHTML = `
      <style>
      .flipped {
        transform: rotateY(180deg);
      }
      .flip-box {
        perspective: 1000px;
      }

      .flip-box-back {
        transform: rotateY(180deg);
        position: absolute;
        backface-visibility: hidden;
        width: 100%;
        height: 100%;
      }
      .flip-box-inner {
        position: relative;
        width: 100%;
        min-height: 100%;
        transition: transform 0.8s;
        transform-style: preserve-3d;
      }
      #hack{ /* flip-box-inner's hercules */
        z-index: -1;
        display: flex;
        backface-visibility: hidden;
      }
      #back-wrapper {
        /*
          abstracts css of back component,
          back component actually uses this id
        */
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        background-image: linear-gradient(#FED7B0, #FFFFEE);
      }
      </style>
      <div class="flip-box" id="container">
        <div class="flip-box-inner" id="inner-container">
          <div class="flip-box-back">
            <slot id="back" name="back"></slot>
          </div>
          <div id="hack">
            <slot id="front" name="front"></slot>
          </div>
        </div>
      </div>
    `;
  }

  static get config() {
    return {
      properties: {
        flipBackAfterFlipTime: {type: Boolean},
        flipped: {type: Boolean},
        flipTime: {type: Number},
        demo: Boolean,
      },
    };
  }

  static get observedAttributes() {
    return ['flipped'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case 'flipped':
        this.toggleFlip();
        break;
      default:
        break;
    }
  }

  toggleFlip() {
    const element = this.root.getElementById('inner-container');
    element.classList.toggle('flipped');
  }

  set content(content) {
    this.root.getElementById('inner-container').onclick = () => {
      this.toggleFlip();
    };
    this.root.getElementById('hack').appendChild(content.front);
    this.root.getElementById('back').appendChild(content.back);
  }
}

customElements.define('flip-card', FlipCard);
