import BookmarkPresenter from '@/utils/bookmark-presenter';
import BookmarkRestaurant from '@/data/restaurant-bookmark-idb';
import ToastInitiator from '@/utils/toast-initiator';
import ApiRestaurant from '@/data/api-restaurant';
import UrlParser from '../routes/url-parser';

const DetailRestaurantInformationInitiator = {

  async init(data, elmInformation) {
    this._data = data;
    this._elmInformation = elmInformation;
    this._elmInformation.detailRestaurant = this._data;
    this._bookmarkButton = this._elmInformation.querySelector(`button[data-bookmark = '${this._data.restaurant.id}']`);

    this._BookmarkRestaurant = BookmarkRestaurant;
    this._ApiRestaurant = ApiRestaurant;
    this._ToastInitiator = ToastInitiator;
    await this._initBookmark();
  },
  async _initBookmark() {
    await BookmarkPresenter.init({
      bookmarkButton: this._bookmarkButton,
      ApiRestaurant: this._ApiRestaurant,
      ToastInitiator: this._ToastInitiator,
      BookmarkRestaurant: this._BookmarkRestaurant,
    });
    document.addEventListener('keyup', this._keyEvent.bind(this));
  },

  async _keyEvent(event) {
    const bookmarkButton = this._bookmarkButton;
    const url = UrlParser.parseActiveUrlWithCombiner();
    if (url.includes('/detail')) {
      if (event.keyCode === 66) {
        if (!(document.activeElement.hasAttribute('required'))) {
          bookmarkButton.click();
        }
      }
      event.preventDefault();
    }
  },
};

export default DetailRestaurantInformationInitiator;
