
const ExploreRestaurantInitiator = {
  init({data, listContainerExplore, contentExplore, bookmarkPresenter, bookmarkRestaurant, toastInitiator, apiRestaurant}) {
    this._data = data;
    this._containerExplore = listContainerExplore;
    this._contentExplore = contentExplore;
    this._BookmarkPresenter = bookmarkPresenter;
    this._BookmarkRestaurant = bookmarkRestaurant;
    this._ApiRestaurant = apiRestaurant;
    this._ToastInitiator = toastInitiator;

    this._initialContentExplore();
  },

  _initialContentExplore() {
    this._containerExplore.innerHTML = '';
    this._data.forEach( async (restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.restaurant = restaurant;
      this._containerExplore.appendChild(restaurantItemElement);
      this._initBookmark(this._containerExplore, restaurant.id);
    });

    if (this._contentExplore.querySelector('pre-loader')) {
      this._contentExplore.querySelector('pre-loader').remove();
    }

    this._containerExplore.classList.add('post__content_restoran');
    this._containerExplore.id= 'explore-restaurant';
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

export default ExploreRestaurantInitiator;
