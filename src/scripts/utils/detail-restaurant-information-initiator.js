import BookmarkInitiator from '@/utils/bookmark-initiator';
import UrlParser from '../routes/url-parser';

const DetailRestaurantInformationInitiator = {

  async init(data, elmInformation) {
    this._data = data;
    this._elmInformation = elmInformation;
    this._elmInformation.detailRestaurant = this._data;
    this._bookmarkButton = this._elmInformation.querySelector(`button[data-bookmark = '${this._data.restaurant.id}']`);
    await this._initBookmark();
  },
  async _initBookmark() {
    await BookmarkInitiator.init(this._bookmarkButton);
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
