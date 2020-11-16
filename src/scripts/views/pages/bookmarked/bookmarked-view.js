

class RestaurantBookmarkView {
  constructor({apiRestaurant, restaurantBookmark, bookmarkPresenter, toastInitialize}) {
    this._restaurantBookmark = restaurantBookmark;
    this._apiRestaurant = apiRestaurant;
    this._bookmarkPresenter = bookmarkPresenter;
    this._toastInitialize = toastInitialize;
  }

  getTemplate() {
    return `
            <div id="restaurantBookmark" class='container__secondary card-1 mt8'>
            <h2 class="mt1 center">Bookmark Restaurant Anda</h2>
            <div class="search__content">
                <div class="input-group">
                <i class="material-icons input-icons" >search</i>
                <input type="text" class="input-area" required id="elmSearchBookmarked"/>
                <label for="elmSearchBookmarked" class="label">Cari Restaurant Bookmark</label>
                </div>
            </div>
            <pre-loader></pre-loader>
            <section id="restaurant-bookmark" class="post__content_restoran">

            </section>
        </div>
   `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('elmSearchBookmarked').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurants(Restaurants) {
    this.showFavoriteRestaurants(Restaurants);
  }

  showFavoriteRestaurants(Restaurants = []) {
    this._resetView();
    if (Restaurants.length) {
      Restaurants.forEach((restaurant) => {
        const restaurantItemElement = document.createElement('restaurant-item');
        restaurantItemElement.restaurant = restaurant;
        document.getElementById('restaurant-bookmark').appendChild(restaurantItemElement);
      });
    } else {
      const html = this._getEmptyMovieTemplate();
      document.getElementById('restaurant-bookmark').innerHTML = html;
    }
    document.getElementById('restaurant-bookmark').dispatchEvent(new Event('restaurants:updated'));
    this._initializeBookmark();
  }

  _getEmptyMovieTemplate() {
    return `<div class="msg-failed restaurant_not_found mt2">
    <span class="material-icons" aria-hidden="true">bookmark</span>
    <p class="center">Maaf Tidak Ada Restaurant untuk di tampilkan di Data Bookmark Anda &#128522</p>
   </div>`;
  }

  _initializeBookmark() {
    const bookmarkButton = document.querySelectorAll('button[data-bookmark]');
    bookmarkButton.forEach( async (button) => {
      await this._bookmarkPresenter.init({
        bookmarkButton: button,
        ApiRestaurant: this._apiRestaurant,
        ToastInitiator: this._toastInitialize,
        BookmarkRestaurant: this._restaurantBookmark,
      });
    });
  }

  _resetView() {
    document.getElementById('restaurant-bookmark').innerHTML = '';
    if ( this._isPreLoaderExist()) {
      document.querySelector('pre-loader').remove();
    }
  }

  _isPreLoaderExist() {
    const preLoader = document.querySelector('pre-loader');
    return preLoader;
  }
}

export default RestaurantBookmarkView;
