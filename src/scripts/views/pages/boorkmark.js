import RestaurantBookmarkIdb from '@/data/database';
import RestaurantBookmarkInitiator from '@/utils/restaurant-bookmark-initiator';
import '@/views/components/pre-loader';
const BoorkMark = {
  async render() {
    return `
    <div id="restaurantBookmark" class='container__secondary card-1 mt8'>
        <h2 class="mt1 center">Bookmark Anda</h2>
        <pre-loader></pre-loader>
         <section id="restaurant-bookmark">
         </section>
    </div>
      `;
  },

  async afterRender() {
    try {
      this._restaurantBookmark = document.getElementById('restaurantBookmark');
      this._dataRestaurant = await RestaurantBookmarkIdb.getAllRestaurant();
      this._initialContentBookmarkPage(this._dataRestaurant, this._restaurantBookmark);
    } catch (error) {
      console.log(error);
      this._errorContent(restaurantContent);
      this._errorContent(restaurantPopularContent);
    }
  },

  async _initialContentBookmarkPage(dataRestaurant, bookmarkContent) {
    RestaurantBookmarkInitiator.init({
      data: dataRestaurant,
      content: bookmarkContent,
    });
  },
};

export default BoorkMark;
