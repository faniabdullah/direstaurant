class Mode extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  set eventSetLight(event) {
    this._setLight = event;
    this._render();
  }

  set eventSetDark(event) {
    this._setDark = event;
    this._render();
  }

  _render() {
    this.innerHTML = `
            <div class="set-mode">
                <button  id="setDark" class="set-mode"   aria-label="Rubah mode menjadi gelap"> <span class="material-icons" aria-hidden="true">brightness_3</span></button>          
                <button  id="setLight" class="set-mode"  aria-label="Rubah Mode menjadi Terang"> <span class="material-icons" aria-hidden="true">brightness_5</span></button>
            </div>
          `;
    this.querySelector('#setLight').addEventListener('click', this._setLight);
    this.querySelector('#setDark').addEventListener('click', this._setDark);
  }
}
customElements.define('set-mode', Mode);
