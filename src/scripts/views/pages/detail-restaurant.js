import ApiRestaurant from '@/data/api-restaurant';
import UrlParser from '@/routes/url-parser';
import '@/views/components/detail-restaurant-information';
import '@/views/components/detail-restaurant-review';
import '@/views/components/detail-restaurant-search';
import '@/views/components/pre-loader';
import DetailRestaurantInformationInitiator from '@/utils/detail-restaurant-information-initiator';
import DetailRestaurantReviewInitiator from '@/utils/detail-restaurant-review-initiator';
import DetailRestaurantMenuInitiator from '@/utils/detail-restaurant-menu-initiator';

const DetailRestaurant = {
  async render() {
    return `
      <div class='container__detail-restaurant card-1 mt8'>
      <pre-loader></pre-loader>
      <detail-restaurant-information></detail-restaurant-information>
        <div class="detail__filtur">
        <detail-restaurant-review></detail-restaurant-review>
        <detail-restaurant-search></detail-restaurant-search>
          <div class="explore__menu_restaurant">
            
          </div>
        </div>
    </div>`;
  },

  async afterRender() {
    this._scrollTop();
    const container = document.querySelector('.container__detail-restaurant');
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurantDetail = await ApiRestaurant.getRestaurantDetail(url.id);
      await this._initialDetailPage(restaurantDetail);
      await this._removeLoading(container);
    } catch (error) {
      this._errorContent(container);
      console.log(error);
    }
  },

  async _removeLoading(container) {
    if (await this._isPreLoaderExist(container)) {
      container.querySelector('pre-loader').remove();
    }
    this._scrollTop();
  },

  async _isPreLoaderExist(container) {
    const preLoader = container.querySelector('pre-loader');
    return preLoader;
  },

  _scrollTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  },

  async _initialDetailPage(restaurantDetail) {
    await DetailRestaurantInformationInitiator.init(restaurantDetail, document.querySelector('detail-restaurant-information'));
    DetailRestaurantReviewInitiator.init(restaurantDetail, document.querySelector('detail-restaurant-review'));
    DetailRestaurantMenuInitiator.init({
      data: restaurantDetail,
      elmMenus: document.querySelector('.explore__menu_restaurant'),
      elmSearchMenus: document.querySelector('detail-restaurant-search'),
    });
  },

  _errorContent(container) {
    const errorContent = `<div class="msg-failed">
                            <span class="material-icons mt1" aria-hidden="true">wifi_off</span>
                            <p class="center">Maaf , Detail Restaurant tidak dapat di tampilkan. Periksa kembali internet anda ya &#128522</p>
                           </div>`;
    container.innerHTML = errorContent;
  },
};

export default DetailRestaurant;
