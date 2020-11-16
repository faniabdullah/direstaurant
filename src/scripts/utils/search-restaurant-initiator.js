

const SearchRestaurantInitiator = {
  init({data, content, elmSearch, bookmarkPresenter, bookmarkRestaurant, toastInitiator, apiRestaurant}) {
    this._data = data;
    this._content = content.querySelector('#explore-restaurant');
    this._elmSearch = elmSearch;
    this._BookmarkPresenter = bookmarkPresenter;
    this._BookmarkRestaurant = bookmarkRestaurant;
    this._ApiRestaurant = apiRestaurant;
    this._ToastInitiator = toastInitiator;


    this._setEvent();
  },

  async _setEvent() {
    const eventSearchRestaurant = async () => {
      this._content.innerHTML = '';
      const searchValue = this._elmSearch.value;
      await this._searchRestaurant(searchValue);
      this._initBookmark();
    };
    this._elmSearch.eventSearch = eventSearchRestaurant;
  },

  async _searchRestaurant(searchValue) {
    const getSearchRestaurant = await this._ApiRestaurant.searchRestaurants(searchValue);
    getSearchRestaurant.restaurants.forEach((restaurant) =>{
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.restaurant = restaurant;
      this._content.appendChild(restaurantItemElement);
    });
    this._isNothingRestaurant(searchValue);
  },

  async _isNothingRestaurant(searchValue) {
    if (this._content.innerHTML === '') {
      this._content.innerHTML = `<div class="msg-failed mt2">
      <span class="material-icons" aria-hidden="true">search</span>
      <p class="center">Maaf Restaurant ${searchValue} yang Anda Cari Belum Terdaftar di Data Kami &#128522</p>
     </div>`;
    }
  },

  async _showAllRestaurant() {
    this._data.forEach((restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.restaurant = restaurant;
      this._content.appendChild(restaurantItemElement);
    });
  },

  _initBookmark() {
    const bookmarkButton = this._content.querySelectorAll('button[data-bookmark]');

    bookmarkButton.forEach( async (button) => {
      await this._BookmarkPresenter.init({
        bookmarkButton: button,
        ApiRestaurant: this._ApiRestaurant,
        ToastInitiator: this._ToastInitiator,
        BookmarkRestaurant: this._BookmarkRestaurant,
      });
    });
  },
};

export default SearchRestaurantInitiator;
