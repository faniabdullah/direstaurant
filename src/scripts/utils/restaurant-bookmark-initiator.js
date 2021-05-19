import '../views/components/restaurant-item';
import BookmarkInitiator from '@/utils/bookmark-initiator';

const RestaurantBookmarkInitiator = {
  init({data, content}) {
    this._listContainer = content.querySelector('#restaurant-bookmark');
    this._data = data;
    this._content = content;
    this._listContainer.innerHTML = '';
    if (this._data.length > 0) {
      this._renderBookmark();
    } else {
      this._renderNothingBookmark();
    }
  },

  async _renderNothingBookmark() {
    const errorContent = `<div class="msg-failed mt2">
    <span class="material-icons mr1" aria-hidden="true">bookmark</span>
    <p class="center">Hmmm .. Rupanya Anda belum memiliki bookmark &#128522</p>
   </div>`;
    this._listContainer.innerHTML = errorContent;
    if ( await this._isPreLoaderExist(this._content)) {
      this._content.querySelector('pre-loader').remove();
    }
  },

  async _renderBookmark() {
    this._data.forEach((restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.restaurant = restaurant;
      this._listContainer.appendChild(restaurantItemElement);
    });

    if ( await this._isPreLoaderExist(this._content)) {
      this._content.querySelector('pre-loader').remove();
    }

    this._listContainer.classList.add('post__content_restoran');
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

export default RestaurantBookmarkInitiator;
