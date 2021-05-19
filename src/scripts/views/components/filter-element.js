class FilterElement extends HTMLElement {
  connectedCallback() {
    this._render();
  }
  get value() {
    return this.querySelector('#selectFilter').value;
  }

  set eventChange(event) {
    this._eventChange = event;
    this._render();
  }

  set filterList(filters) {
    this._filterList = '';
    filters.forEach((filter)=>{
      this._filterList += `<option value="${filter}">${filter}</option>`;
    });
    this._render();
  }

  _render() {
    this.innerHTML = `<div class="input-group">
                            <i class="material-icons input-icons" >filter_list</i>
                            <select id="selectFilter" style="padding-left : 50px" required class="input-area">
                            <option value="" selected> Semua Restaurant</option>
                                ${this._filterList}
                            </select>
                            <label for="selectFilter" class="label" style="width:80%"> Filter Restaurant </label>
                        </div>`;
    this.querySelector('#selectFilter').addEventListener('change', this._eventChange);
  }
}

customElements.define('filter-element', FilterElement);
