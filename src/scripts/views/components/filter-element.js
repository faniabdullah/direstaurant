class FilterElement extends HTMLElement {
  connectedCallback() {
    this._render();
  }
  get value() {
    return this.querySelector('#selectFilter').value;
  }

  set eventClick(event) {
    this._eventClick = event;
    this._render();
  }

  _render() {
    this.innerHTML = ` 
    <div class="elm-filter">
      <button id="elmBtnFilter" aria-label = "Open List Filter" class="pure-material-button-outlined">Filter
      <i class="material-icons input-icons" aria-hidden="true" >filter_list</i>
      </button>
    </div>`;
    this.querySelector('#elmBtnFilter').addEventListener('click', this._eventClick);
  }
}

customElements.define('filter-element', FilterElement);
