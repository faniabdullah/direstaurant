class AppBarTitle extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML =
              `<div class="title">
                <h1 class="text-logo">
                    <span class="logo-background">di</span>restaurant
                </h1>
              </div>`;
  }
}
customElements.define('app-bar-title', AppBarTitle);
