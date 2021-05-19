class HeroJumbotron extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML =
                `<div class="hero">
                    <div class="hero__overlay">
                    <div class="hero__inner">
                            <h2 class="hero__title">direstaurant</h2>
                            <p class="hero__tagline">Expoler restaurants , search restaurant , populer restaurant & rating restaurant</p>                       
                        </div>
                    </div>
                </div>`;
  }
}
customElements.define('hero-jumbotron', HeroJumbotron);
