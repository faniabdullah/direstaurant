class PreLoader extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML =
                  `<div class="preloader-blue"></div>`;
  }
}
customElements.define('pre-loader', PreLoader);
