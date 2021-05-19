class ContentPopular extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML =
                    `<section class="content-populer">
                    <h2 class="content__label"> Lagi Populer nih !!</h2>
                    <div class="post-content__populer" id="post-content-restoran-populer">
                    </div>
                    </section>`;
  }
}
customElements.define('content-popular', ContentPopular);


