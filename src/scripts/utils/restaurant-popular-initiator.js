import '../views/components/restaurant-item';
import BookmarkInitiator from '@/utils/bookmark-initiator';

const RestaurantPopularInitiator = {
  async init({data, listContainer, content}) {
    this._listContainer = listContainer;
    this._data = data;
    this._content = content;
    this._content.innerHTML = '';

    this._data.filter((restaurant)=> parseFloat(restaurant.rating) > 4.5)
        .map((filteredRestaurant) => {
          const restaurantItemElement = document.createElement('restaurant-item');
          restaurantItemElement.restaurant = filteredRestaurant;
          this._listContainer.appendChild(restaurantItemElement);
        });
    this._listContainer.classList.add('post-content__populer');

    if ( await this._isPreLoaderExist(this._content)) {
      this._content.querySelector('pre-loader').remove();
    }

    this._content.appendChild(this._listContainer);
    this._initBookmark();
  },

  async _isPreLoaderExist(container) {
    const preLoader = container.querySelector('pre-loader');
    return preLoader;
  },

  _initBookmark() {
    const bookmarkButton = this._listContainer.querySelectorAll('button[data-bookmark]');
    bookmarkButton.forEach( async (button) => {
      await BookmarkInitiator.init(button);
    });
  },
};

export default RestaurantPopularInitiator;
