class ShowCase extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML =
                  `<section class="why-me">
                  <h2 class="__label"> Mengapa harus kami ?</h2>
                  <div class="content">
                      <div>
                          <span aria-label="bookmark" class="material-icons icons-why-me color-primary">bookmark</span>
                          <p>Simpan restaurant Favoritmu dan Anda bisa melihat kapan saja</p>
                      </div>
                      <div >
                          <span aria-label="rekomendasi restaurant" class="material-icons icons-why-me color-primary">star</span>
                          <p> dapatkan rekomendasi restaurant populer yang diambil dari rating</p>
                      </div>
                      <div >
                          <span aria-label="cari restoran" class="material-icons icons-why-me color-primary">search</span>
                          <p>Cari restaurant dan temukan Restoran mu </p>
                      </div>
                      <div >
                          <span aria-label="menu restoran" class="material-icons icons-why-me color-primary">restaurant_menu</span>
                          <p> explore restoran dan pilih restoran dengan selera menu mu </p>
                      </div>
                  </div>
              </section>`;
  }
}
customElements.define('show-case', ShowCase);

