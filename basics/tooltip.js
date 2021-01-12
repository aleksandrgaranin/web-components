class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipIcon;
    this._tooltipVisible = false;
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
          position: relative;
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
    this._tooltipIcon = this.shadowRoot.querySelector('span');
    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    this._tooltipIcon.addEventListener('mouseleave', this._closeTooltip.bind(this));
    this.shadowRoot.appendChild(this._tooltipIcon);
    // console.log('It is working');
    this._render();
  }

  attributeChangedCallback(name, oldValue, newVAlue) {
    console.log(name, oldValue, newVAlue)
    if (oldValue === newVAlue) {
      return;
    }
    if (name === 'text') {
      this._tooltipText = newVAlue;
    }
  }

  static get observedAttributes() {
    return ['text'] //returning array with all attributes what we want to listen
  }

  disconnectedCallback() { // could use but unnecessary for this case
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
    this._tooltipIcon.removeEventListener('mouseleave', this._showTooltip);
    console.log('DISCONNECTED!');
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector('div');
    if (this._tooltipVisible) {
      tooltipContainer = document.createElement('div');
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _closeTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define('uc-tooltip', Tooltip);