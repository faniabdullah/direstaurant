import CONFIG from '@/globals/config';

class DetailRestautantInformation extends HTMLElement {
  set detailRestaurant(detail) {
    this._detailRestaurant = detail.restaurant;
    this._render();
  }

  _render() {
    const restaurantDetail = this._detailRestaurant;
    this.classList.add('container-detail-information');
    this.innerHTML =
      `<div class="picture__image_detail">
        <img src="${CONFIG.BASE_IMAGE_URL}medium/${restaurantDetail.pictureId}" alt="Restoran ${restaurantDetail.name}">
      </div>
      <div class="detail__information">
      <small class="color-primary guide">Press B To Add To Bookmark </small>
        <h2 class="detail___title">${restaurantDetail.name}</h2>
          <div class="rating___detail">
            <span>${this._getStarRating(restaurantDetail.rating)}</span>
            <p>(${restaurantDetail.rating})</p>
          </div>
          <div class="detail__location">
          <small class="color-primary"><span class="material-icons color-primary" aria-hidden = "true" >place</span>${restaurantDetail.address} </small>
          </div>
          <div class="category___detail">
            <h3 class="category_title">Kategori</h3>
            <div class="category_item"> 
              ${this._getCategories(restaurantDetail.categories)}
            </div>
          </div>
          <div class="description___detail">
            <p>${restaurantDetail.description.slice(0, 163)}.</p>
          </div>
          <button class="pure-material-button-outlined radius-material bookmark-detail" data-bookmark=${restaurantDetail.id} aria-label="Add to Borkmark ${restaurantDetail.name}">
            <i class="material-icons" aria-hidden="true" >bookmark_border</i>
          </button>
      </div>`;
  }

  _getCategories(restaurant) {
    let categories = '';
    restaurant.forEach((category)=>{
      categories += `<p class="card-1">${category.name}</p>`;
    });
    return categories;
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
customElements.define('detail-restaurant-information', DetailRestautantInformation);

