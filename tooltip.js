class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'some dummy text';
    this.attachShadow({ mode: 'open' });
    // const template = document.querySelector('#tooltip-template');
    // this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.innerHTML = `
      <slot>Some default</slot>
      <span> (?)</span>
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

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this._tooltipContainer.style.backgroundColor = 'black';
    this._tooltipContainer.style.color = 'white';
    this._tooltipContainer.style.position = 'absolute';
    this._tooltipContainer.style.zIndex = '10';

    this.shadowRoot.appendChild(this._tooltipContainer);

  }

  _hloseTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }

  disconnectedCallback() {

  }
}

customElements.define('uc-tooltip', Tooltip);