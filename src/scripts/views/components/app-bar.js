import './app-bar-menu.js';
import './app-bar-title.js';
import './app-bar-navigation';

class AppBar extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    const appBarTitle = document.createElement('app-bar-title');
    const appBarMenu = document.createElement('app-bar-menu');
    const appBarNavigation = document.createElement('app-bar-navigation');
    this.appendChild(appBarTitle);
    this.appendChild(appBarMenu);
    this.appendChild(appBarNavigation);
  }
}
customElements.define('app-bar', AppBar);
