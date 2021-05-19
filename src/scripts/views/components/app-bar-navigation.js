class AppBarNavigation extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML =
                `<div id="navigationDrawer" class="nav" role="navigation">
                    <ul class="nav__list">
                        <li class="nav__item"><a class="btn"   href="#/home"><span class="material-icons" aria-hidden="true">home</span> Home</a></li>
                        <li class="nav__item"><a class="btn"   href="#/boorkmark"><span class="material-icons" aria-hidden="true">book</span> Bookmark</a></li>
                        <li class="nav__item"><a class="btn" rel="noreferrer" href="https://www.linkedin.com/in/fani-abdullah/" target="_blank"><span class="material-icons" aria-hidden="true">person</span> About Us</a></li>
                    </ul>
                 </div>`;
  }
}
customElements.define('app-bar-navigation', AppBarNavigation);
