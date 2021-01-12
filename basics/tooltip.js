class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'some dummy text';
    this.attachShadow({ mode: 'open' });
    // const template = document.querySelector('#tooltip-template');
    // this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.innerHTML = `
      <style>
        div{
          background-color: black;
          color: white;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          z-index: 10;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
        }

        :host(.important) {
          background: var(--color-prymary, #ccc);
        }

        // :host-context(p) {
        //   font-weight: bold;
        // }

        .highlight {
          background-color: red;
        }

        .icon {
          background-color: gray;
          color: orange;
          padding: 0.15rem 0.45rem;
          border-radius: 50%;
          text-align: center;
        }

        ::slotted(.highlight) {
          border-bottom: 2px dotted red
        }

      </style>
      <slot>Some default</slot>
      <span class="icon">?</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }
    console.log(this._tooltipText)
    // const tooltipIcon = document.createElement('span');
    // tooltipIcon.textContent = ' (?)';
    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hloseTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = 'relative'
    // console.log('It is working');
  }

  attributeChangedCallback(name, oldValue, newVAlue) {
    console.log(name, oldValue, newVAlue)
    if (oldValue === newVAlue) {
      return;
    }
    if (name === 'text') {
      this._tooltipText = newVAlue
    }
  }

  static get observedAttributes() {
    return ['text'] //returning array with all attributes what we want to listen
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    // this._tooltipContainer.style.backgroundColor = 'black';
    // this._tooltipContainer.style.color = 'white';
    // this._tooltipContainer.style.position = 'absolute';
    // this._tooltipContainer.style.zIndex = '10';

    this.shadowRoot.appendChild(this._tooltipContainer);

  }

  _hloseTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }

  disconnectedCallback() {

  }
}

customElements.define('uc-tooltip', Tooltip);