class SearchBookmarked extends HTMLElement {
  connectedCallback() {
    this._render();
  }
  get value() {
    return this.querySelector('#elmSearchBookmarked').value;
  }
  set eventSearch(event) {
    this._eventSearch = event;
    this._render();
  }
  _render() {
    this.innerHTML = `<div class="search__content">
                            <div class="input-group">
                            <i class="material-icons input-icons" >search</i>
                              <input type="text" class="input-area" required id="elmSearchBookmarked"/>
                              <label for="elmSearchBookmarked" class="label">Cari Restaurant Bookmark</label>
                            </div>
                      </div>`;

    this.querySelector('#elmSearchBookmarked').addEventListener('change', this._eventSearch);
  }
}

customElements.define('search-bookmarked', SearchBookmarked);

