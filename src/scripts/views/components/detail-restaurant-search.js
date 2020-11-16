class SearchMenu extends HTMLElement {
  connectedCallback() {
    this._render();
  }
  get value() {
    return this.querySelector('#elmSearchMenu').value;
  }
  set eventSearch(event) {
    this._eventSearch = event;
    this._render();
  }
  _render() {
    this.innerHTML = ` <div class="menu__restaurant-filtur">
                            <div class="input-group">
                            <i class="material-icons input-icons" >search</i>
                              <input type="text" class="input-area" required id="elmSearchMenu"/>
                              <label for="elmSearchMenu" class="label"> Cari Menu </label>
                            </div>
                        </div>`;
    this.querySelector('#elmSearchMenu').addEventListener('keyup', this._eventSearch);
  }
}

customElements.define('detail-restaurant-search', SearchMenu);
