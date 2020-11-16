
class AppBar extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML =
              `<div class="title">
                <h1 class="text-logo">
                    <span class="logo-background">di</span>restaurant
                </h1>
              </div>
              <div class="header__menu">
                    <button id="hamburgerButton" aria-label="menu open" class="header__icon-menu">
                    <span class="material-icons">menu</span>
                    </button>
                </div>
                <div id="navigationDrawer" class="nav" role="navigation">
                <ul class="nav__list">
                    <li class="nav__item"><a class="btn"   href="#/home"><span class="material-icons" aria-hidden="true">home</span> Home</a></li>
                    <li class="nav__item"><a class="btn"   href="#/bookmark"><span class="material-icons" aria-hidden="true">book</span> Bookmark</a></li>
                    <li class="nav__item"><a class="btn" rel="noreferrer" href="https://github.com/faniabdullah" target="_blank"><span class="material-icons" aria-hidden="true">person</span> About Us</a></li>
                </ul>
             </div>`;
  }
}

customElements.define('app-bar', AppBar);

