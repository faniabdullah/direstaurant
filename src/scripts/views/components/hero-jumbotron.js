class HeroJumbotron extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML =`
                <div class="hero">
                <picture>
                      <source type="image/webp" 
                              srcset="./images/heros/hero-small.webp"
                              media="(max-width: 600px) ">
                      <source type="image/webp"
                              srcset="./images/heros/hero-large.webp"
                              media="(min-width: 601px)">
                      <img class="lazyload" src="./images/placeholder.jpg" width="500" height="250"  
                          srcset="./images/heros/hero-small.jpg 480w, ./images/heros/hero-large.jpg 800w"
                          sizes="(max-width: 600px) 480px, 800px"
                          alt="Direstaurant Hero">
                  </picture>
                  <div class="overlay">
                  <div class="content">
                      <p class="title">direstaurant</p>
                      <p>Explore Restaurant , Search Restaurant , Popular Restaurant & Rating Restaurant</p>
                  </div>
                  </div>
                </div>
                `;
  }
}
customElements.define('hero-jumbotron', HeroJumbotron);
