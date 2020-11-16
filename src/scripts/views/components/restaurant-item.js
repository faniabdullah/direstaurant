import CONFIG from '@/globals/config';

class RestaurantItem extends HTMLElement {
  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this._render();
  }

  _render() {
    const restaurant = this._restaurant;
    this.innerHTML =
      `<article class="post-item__content card-1 ">
      <div class="post-item__image"> 
          <img class="lazyload" src="./images/placeholder.webp" width="500" height="250"  data-src="${CONFIG.BASE_IMAGE_URL}small/${restaurant.pictureId}" alt="Restoran ${restaurant.name} , ${restaurant.city}">
      </div>
      <div class="wrapper__detail">
      <div class="post-item__detail">
          <h3 class="post-item__title">${restaurant.name}</h3>
          <div class="post-item__rating">
              <span>${this._getStarRating(restaurant.rating)}</span>
              <p>(${restaurant.rating})</p>
          </div>
          <div class="post-item__info">
              <p> ${restaurant.description.slice(0, 47)}...</p>
          </div>
         <div class="post-item__info">
             <p> <i class="material-icons color-primary" aria-hidden = "true" >place</i> ${restaurant.city}</p>
          </div>
          <div class="post-item__action">
              <div class="btn__grup">
                  <button class="btn__borkmark pure-material-button-outlined" data-bookmark=${restaurant.id} aria-label="Tambahkan Restaurant ${restaurant.name} Ke Bookmark">
                      <i class="material-icons icon">bookmark_border</i>
                  </button>
                  <a class="btn__detail" href="#/detail/${restaurant.id}" aria-label="Lihat Detail Restaurant ${restaurant.name}">
                      Detail
                  </a>
              </div>
          </div>
      </div>
      </div>
  </article>`;
  }

  _getStarRating(rating) {
    let starsRating = ``;
    for (let i = 0; i < parseFloat(rating); i++) {
      if ((parseFloat(rating)) > i && i === (parseInt(rating))) {
        starsRating += `<i class="material-icons" aria-hidden="true">star_half</i>`;
      } else {
        starsRating += `<i class="material-icons" aria-hidden="true">star</i>`;
      }
    }
    return starsRating;
  }
}

customElements.define('restaurant-item', RestaurantItem);
