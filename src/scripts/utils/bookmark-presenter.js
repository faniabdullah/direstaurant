import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';

const BookmarkPresenter = {
  async init({bookmarkButton, ApiRestaurant, ToastInitiator, BookmarkRestaurant}) {
    this._bookmarkButton = bookmarkButton;
    this._ApiRestaurant = ApiRestaurant;
    this._ToastInitiator = ToastInitiator;
    this._BookmarkRestaurant = BookmarkRestaurant;
    await this._createEvent();
  },

  async _createEvent( bookmarkButton = this._bookmarkButton, bookmarkId = bookmarkButton.dataset.bookmark) {
    if (await this._isRestaurantExist(bookmarkId)) {
      await this._removeBookmark(bookmarkButton);
    } else {
      await this._addBookmark(bookmarkButton);
    }
  },

  async _isRestaurantExist(bookmarkId) {
    const restaurant = await this._BookmarkRestaurant.getRestaurant(bookmarkId);
    return !!restaurant;
  },

  async _addBookmark(bookmarkButton) {
    const bookmarkId = bookmarkButton.dataset.bookmark;
    const bookmarkIcon = bookmarkButton.querySelector(`i`);
    bookmarkIcon.innerHTML = 'bookmark_border';
    bookmarkIcon.classList.remove('color-primary');

    const addEvent = async (event) => {
      event.stopPropagation();
      try {
        const restaurant = await this._ApiRestaurant.getRestaurantDetail(bookmarkId);
        await this._BookmarkRestaurant.putRestaurant(restaurant.restaurant );
        await this._syncBookmark();
      } catch (error) {
        await this._ToastInitiator.show({
          message: 'Periksa Kembali Internet Anda',
          type: 'failed',
        });
        await this._BookmarkRestaurant.putRestaurant(bookmarkId);
        await this._removeBookmark(bookmarkButton);
      }
    };
    bookmarkButton.addEventListener('click', addEvent.bind(this), {once: true});
  },

  async _removeBookmark(bookmarkButton) {
    const bookmarkId = bookmarkButton.dataset.bookmark;
    const bookmarkIcon = bookmarkButton.querySelector(`i`);
    bookmarkIcon.innerHTML = 'bookmark';
    bookmarkIcon.classList.add('color-primary');

    const removeEvent = async (event) => {
      event.stopPropagation();
      await this._BookmarkRestaurant.deleteRestaurant(bookmarkId);
      await this._syncBookmark();
    };
    bookmarkButton.addEventListener('click', removeEvent.bind(this), {once: true});
  },


  async _syncBookmark() {
    await this._createEvent();
    const url = UrlParser.parseActiveUrlWithCombiner();
    if ((url.includes('/bookmark') || document.querySelector('#explore-restaurant') != null)) {
      const page = await routes[url];
      await page.afterRender();
    }
  },

};


export default BookmarkPresenter;
