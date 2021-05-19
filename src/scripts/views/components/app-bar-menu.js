class AppBarMenu extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML =
                `<div class="header__menu">
                    <button id="hamburgerButton" aria-label="menu open" class="header__icon-menu">
                    <span class="material-icons">menu</span>
                    </button>
                </div>`;
  }
}
customElements.define('app-bar-menu', AppBarMenu);
