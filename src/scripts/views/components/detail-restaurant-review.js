class DetailRestautantReview extends HTMLElement {
  set detailRestaurant(detail) {
    this._detailRestaurant = detail;
    this._restaurantReviews = this._detailRestaurant.customerReviews;
    this._render();
  }

  set asyncReviews(reviews) {
    this._restaurantReviews = reviews;
    this._render();
  }

  set sendReview(eventSend) {
    this._sendReview = eventSend;
    this._render();
    this.querySelector('#addReview').reset;
  }

  set activeCollapsible(event) {
    this._eventCollapsible = event;
    this._render();
  }

  get valueName() {
    return this.querySelector('#inputName').value;
  }
  get valueReview() {
    return this.querySelector('#inputReview').value;
  }
  _render() {
    const reviewsList = this._restaurantReviews;
    this.innerHTML =
    `<div class="collapsible-review card-1">
      <button id="collapsibleButton" aria-label = "Buka Review Pengunjung" class="collapsible-btn card-1">Review Pengunjung</button>
      <div class="content-collapsible mt1" id="content-collapsible">
        <div class="list-review">
          <div class="review-costumer">
              ${this._getListReviews(reviewsList)}
          </div>
        </div
        <div class="send_review-restaurant">
          <form id="addReview" name="review" tabindex="0" role="form" class="form-review mt2">
              <div class="input-group">
                <i class="material-icons input-icons" aria-hidden="true" >person_outline</i>
                <input type="text" class="input-area" required id="inputName"/>
                <label for="inputName" class="label">Nama Lengkap</label>
              </div>
              <div class="input-group">
                <i class="material-icons input-icons" aria-hidden="true" >comment</i>
                <textarea id="inputReview" class="input-area" rows="1" required></textarea>
                <label for="inputReview" class="label">Tanggapan Anda</label>
              </div>
              <button id="elmBtnsendReview" aria-label = "Kirim Tanggapan Anda" class="pure-material-button-outlined radius-material">Submit
              <i class="material-icons input-icons" aria-hidden="true" >send</i>
              </button>
            </form>
        </div>
      </div>
  </div>`;
    this.querySelector('#collapsibleButton').addEventListener('click', this._eventCollapsible);
    this.querySelector('#addReview').addEventListener('submit', this._sendReview);
  }

  _getListReviews(reviews) {
    let reviewItems = '';
    reviews.forEach((review)=>{
      reviewItems += `<div class="review-item card-1">
                        <h3>${review.name}</h3>
                        <p>${review.review}</p>
                        <small><span class="material-icons color-primary" aria-hidden = "true" >access_time</span>${review.date}</small>
                      </div>`;
    });
    return reviewItems;
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

customElements.define('detail-restaurant-review', DetailRestautantReview);
