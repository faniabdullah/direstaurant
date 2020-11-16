class FooterElement extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  set eventBtnTop(event) {
    this._eventClick = event;
    this._render();
  }

  _render() {
    this.innerHTML =
                  `<footer>    
                  <div class="card-1 mt4 footer_app  center">
                      <button id="backToTop" class="pure-material-button-outlined back-to-top mt1" aria-label="Kembali ke Atas"><span class="material-icons icon-top" aria-hidden = "true">keyboard_arrow_up</span></button>
                      <p class="footer__label mt1">Copyright © 2020 - <span class="logo-background">di</span>restaurant</p></footer>
                  </div>
              </footer>`;
    this.querySelector('#backToTop').addEventListener('click', this._eventClick);
  }
}
customElements.define('footer-element', FooterElement);
