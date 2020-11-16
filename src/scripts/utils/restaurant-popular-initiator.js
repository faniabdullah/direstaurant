

const RestaurantPopularInitiator = {
  init({data, listContainer, content, bookmarkPresenter, bookmarkRestaurant, toastInitiator, apiRestaurant}) {
    this._listContainer = listContainer;
    this._data = data;
    this._content = content;
    this._BookmarkPresenter = bookmarkPresenter;
    this._BookmarkRestaurant = bookmarkRestaurant;
    this._ApiRestaurant = apiRestaurant;
    this._ToastInitiator = toastInitiator;

    this._initialContentPopular();
  },

  _initialContentPopular() {
    this._content.innerHTML = '';
    this._data.filter((restaurant)=> parseFloat(restaurant.rating) > 4.5)
        .map((filteredRestaurant) => {
          const restaurantItemElement = document.createElement('restaurant-item');
          restaurantItemElement.restaurant = filteredRestaurant;
          this._listContainer.appendChild(restaurantItemElement);
          this._initBookmark(this._listContainer, filteredRestaurant.id);
        });

    if ( this._content.querySelector('pre-loader')) {
      this._content.querySelector('pre-loader').remove();
    }
    this._listContainer.classList.add('post-content__populer');
    this._content.appendChild(this._listContainer);
  },

  _initBookmark(container, id) {
    const bookmarkButton = container.querySelector(`button[data-bookmark = '${id}' ]`);
    this._BookmarkPresenter.init({
      bookmarkButton: bookmarkButton,
      ApiRestaurant: this._ApiRestaurant,
      ToastInitiator: this._ToastInitiator,
      BookmarkRestaurant: this._BookmarkRestaurant,
    });
  },
};

export default RestaurantPopularInitiator;
