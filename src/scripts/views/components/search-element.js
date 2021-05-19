class SearchElement extends HTMLElement {
  connectedCallback() {
    this._render();
  }
  get value() {
    return this.querySelector('#elmSearchRestaurant').value;
  }
  set eventSearch(event) {
    this._eventSearch = event;
    this._render();
  }
  get value() {
    return this.querySelector('#elmSearchRestaurant').value;
  }
  _render() {
    this.innerHTML = `<div class="search__content">
                          <div class="input-group">
                          <i class="material-icons input-icons" >search</i>
                            <input type="text" class="input-area" required id="elmSearchRestaurant"/>
                            <label for="elmSearchRestaurant" class="label"> Cari Restaurant </label>
                          </div>
                    </div>`;

    this.querySelector('#elmSearchRestaurant').addEventListener('keyup', this._eventSearch);
  }
}
customElements.define('search-element', SearchElement);

