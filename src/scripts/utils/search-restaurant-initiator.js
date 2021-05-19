import BookmarkInitiator from '@/utils/bookmark-initiator';

const SearchRestaurantInitiator = {
  init({data, content, elmSearch}) {
    this._data = data;
    this._content = content.querySelector('#explore-restaurant');
    this._elmSearch = elmSearch;
    this._setEvent();
  },

  async _setEvent() {
    const eventSearchRestaurant = async () => {
      this._content.innerHTML = '';
      const searchValue = this._elmSearch.value.toUpperCase();
      if (searchValue === '') {
        await this._showAllRestaurant();
      } else {
        await this._searchRestaurant(searchValue);
      }
      this._initBookmark();
    };
    this._elmSearch.eventSearch = eventSearchRestaurant;
  },

  async _searchRestaurant(searchValue) {
    await this._data.filter((restaurant)=> restaurant.name.toUpperCase().indexOf(searchValue) > -1)
        .map((filteredRestaurant) => {
          const restaurantItemElement = document.createElement('restaurant-item');
          restaurantItemElement.restaurant = filteredRestaurant;
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
      await BookmarkInitiator.init(button);
    });
  },
};

export default SearchRestaurantInitiator;
