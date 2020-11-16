
import ApiRestaurant from '@/data/api-restaurant';
const DetailRestaurantReviewInitiator = {
  init(data, elmReview) {
    this._data = data.restaurant;
    this._elmReview = elmReview;
    this._elmReview.detailRestaurant = this._data;
    this._initialSend();
    this._initialCollapsible();
  },

  _initialSend() {
    const eventSendReview = async (event) => {
      event.preventDefault();
      const nameInput = this._elmReview.valueName;
      const reviewInput = this._elmReview.valueReview;
      const reviewData = {
        id: this._data.id,
        name: nameInput,
        review: reviewInput,
      };
      const updatedReview = await ApiRestaurant.addReview(reviewData);
      this._elmReview.asyncReviews = await updatedReview.customerReviews;
      this._collapsibleOpen();
    };
    this._elmReview.sendReview = eventSendReview;
  },

  _collapsibleOpen() {
    const elm = document.querySelector('#collapsibleButton');
    elm.classList.toggle('active');
    const content = elm.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  },

  _initialCollapsible() {
    const eventCollapsible = async () => {
      this._collapsibleOpen();
    };
    this._elmReview.activeCollapsible = eventCollapsible;
  },
};

export default DetailRestaurantReviewInitiator;
