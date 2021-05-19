import '../views/components/restaurant-item';
import BookmarkInitiator from '@/utils/bookmark-initiator';

const ExploreRestaurantInitiator = {
  async init({data, listContainer, content}) {
    this._data = data;
    this._listContainer = listContainer;
    this._content = content;
    this._listContainer.innerHTML = '';
    this._data.forEach((restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.restaurant = restaurant;
      this._listContainer.appendChild(restaurantItemElement);
    });

    if ( await this._isPreLoaderExist(this._content)) {
      this._content.querySelector('pre-loader').remove();
    }
    this._listContainer.classList.add('post__content_restoran');
    this._listContainer.id= 'explore-restaurant';

    this._initBookmark();
  },

  async _isPreLoaderExist(container) {
    const preLoader = container.querySelector('pre-loader');
    return preLoader;
  },

  async _reset() {
    if (this._content.querySelector('restaurant-list')) {
      this._content.querySelector('restaurant-list').innerHTML = '';
    }
  },

  _initBookmark() {
    const bookmarkButton = this._listContainer.querySelectorAll('button[data-bookmark]');
    bookmarkButton.forEach( async (button) => {
      await BookmarkInitiator.init(button);
    });
  },
};

export default ExploreRestaurantInitiator;