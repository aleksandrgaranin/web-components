class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'some dummy text';

  }

  connectedCallback() {
    if( this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');      
    }
    console.log(this._tooltipText)
    const tooltipIcon = document.createElement('span');
    tooltipIcon.textContent = ' (?)';
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hloseTooltip.bind(this));
    this.appendChild(tooltipIcon);
    // console.log('It is working');
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.appendChild(this._tooltipContainer);

  }

  _hloseTooltip() {
    this.removeChild(this._tooltipContainer);
  }

  disconnectedCallback() {

  }
}

customElements.define('uc-tooltip', Tooltip);