import RestaurantBookmarkIdb from '@/data/database';
import ApiRestaurant from '@/data/api-restaurant';
import Toast from '@/utils/toast-initiator';
import App from '@/views/app';

const BookmarkInitiator = {
  async init(bookmarkButton) {
    this._bookmarkButton = bookmarkButton;
    await this._createEvent();
  },

  async _createEvent( bookmarkButton = this._bookmarkButton, bookmarkId = bookmarkButton.dataset.bookmark) {
    if (await this._isRestaurantExist(bookmarkId)) {
      this._removeBookmark(bookmarkButton);
    } else {
      this._addBookmark(bookmarkButton);
    }
  },

  async _isRestaurantExist(bookmarkId) {
    const restaurant = await RestaurantBookmarkIdb.getRestaurant(bookmarkId);
    return !!restaurant;
  },

  _addBookmark(bookmarkButton) {
    const bookmarkId = bookmarkButton.dataset.bookmark;
    const bookmarkIcon = bookmarkButton.querySelector(`i`);
    bookmarkIcon.innerHTML = 'bookmark_border';
    bookmarkIcon.classList.remove('color-primary');

    const addEvent = async (event) => {
      event.stopPropagation();
      const restaurant = await ApiRestaurant.getRestaurantDetail(bookmarkId);
      if (JSON.stringify(restaurant) === '{}') {
        Toast.show('Periksa kembali internet Anda :)', 'failed');
      } else {
        await RestaurantBookmarkIdb.putRestaurant(restaurant.restaurant);
        this._syncBookmark(bookmarkButton);
      }
    };
    bookmarkButton.addEventListener('click', addEvent.bind(this), {once: true});
  },

  _removeBookmark(bookmarkButton) {
    const bookmarkId = bookmarkButton.dataset.bookmark;
    const bookmarkIcon = bookmarkButton.querySelector(`i`);
    bookmarkIcon.innerHTML = 'bookmark';
    bookmarkIcon.classList.add('color-primary');

    const removeEvent = async (event) => {
      event.stopPropagation();
      await RestaurantBookmarkIdb.deleteRestaurant(bookmarkId);
      this._syncBookmark(bookmarkButton);
    };
    bookmarkButton.addEventListener('click', removeEvent.bind(this), {once: true});
  },


  async _syncBookmark(bookmark) {
    await this._createEvent();
    await App.refreshPage();
    setTimeout(async () => {
      const backtoDetailButton = document.querySelector(`button[data-bookmark="${bookmark.dataset.bookmark}"]`);
      if (backtoDetailButton) {
        await backtoDetailButton.focus();
      }
    }, 300);
  },

};


export default BookmarkInitiator;
