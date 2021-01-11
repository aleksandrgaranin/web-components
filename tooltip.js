class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer


  }

  connectedCallback() {
    const tooltipIcon = document.createElement('span');
    tooltipIcon.textContent = ' (?)';
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hloseTooltip.bind(this));
    this.appendChild(tooltipIcon);
    // console.log('It is working');
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = 'This is the tooltip text!';
    this.appendChild(this._tooltipContainer);

  }

  _hloseTooltip() {
    this.removeChild(this._tooltipContainer);
  }

  disconnectedCallback() {

  }
}

customElements.define('uc-tooltip', Tooltip);