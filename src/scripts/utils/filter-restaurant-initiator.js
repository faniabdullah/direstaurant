import '../views/components/restaurant-item';
import ApiRestaurant from '@/data/api-restaurant';
import BookmarkInitiator from '@/utils/bookmark-initiator';

/* Hello mr/mrs. this is a filter data manually,because the server does not provide filtering
  by category.and in the main data there is no category data. so you must first retrieve detailed
  data through the main data id to retrieve the category list and event category. Thanks*/

const FilterRestaurantInitiator = {
  init({data, content, elmFilter}) {
    this._data = data;
    this._content = content.querySelector('#explore-restaurant');
    this._elmFilter = elmFilter;
    this._listCategories = [];
    this._setEvent();
    this._setCategory(this._data);
  },

  async _setEvent() {
    const eventFilterRestaurant = async () => {
      if (this._elmFilter.value === '') {
        await this._showAll();
      } else {
        await this._showFilter();
      }
    };
    this._elmFilter.eventChange = eventFilterRestaurant;
  },

  _showFilterError() {
    this._content.innerHTML = 'Tidak dapat MemFilter Data karena jaringan koneksi anda';
  },

  async _showAll() {
    this._content.innerHTML = '';
    await this._data.forEach(async (restaurant) => {
      await this._createElement(restaurant);
    });
    this._initBookmark();
  },

  async _createElement(restaurant) {
    const restaurantItemElement = document.createElement('restaurant-item');
    restaurantItemElement.restaurant = restaurant;
    this._content.appendChild(restaurantItemElement);
  },

  async _showFilter() {
    this._content.innerHTML = '';
    await this._data.forEach( async (restaurant) => {
      const restaurantDetail = await ApiRestaurant.getRestaurantDetail(restaurant.id);
      await restaurantDetail.restaurant.categories.forEach(async (category)=>{
        if (this._elmFilter.value.toUpperCase() === category.name.toUpperCase() ) {
          await this._createElement(restaurant);
          this._initBookmarkFromFilter(restaurant.id);
        }
      });
    });
  },

  async _setCategory(restaurants) {
    await restaurants.forEach(async (restaurant)=>{
      const getDetail = await ApiRestaurant.getRestaurantDetail(restaurant.id);
      const getCategories = await this._getCategory(getDetail);
      this._elmFilter.filterList = getCategories;
    });
  },

  async _getCategory(data) {
    data.restaurant.categories.forEach((category)=>{
      if (this._listCategories.indexOf(category.name) === -1) {
        this._listCategories.push(category.name);
      }
    });
    return this._listCategories;
  },

  async _initBookmark() {
    const bookmarkButton = this._content.querySelectorAll('button[data-bookmark]');
    bookmarkButton.forEach( async (button) => {
      await BookmarkInitiator.init(button);
    });
  },

  async _initBookmarkFromFilter(id) {
    const bookmarkButton = this._content.querySelector(`button[data-bookmark = '${id}' ]`);
    await BookmarkInitiator.init(bookmarkButton );
  },
};

export default FilterRestaurantInitiator;
