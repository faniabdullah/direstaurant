

/* Hello mr/mrs. this is a filter data manually,because the server does not provide filtering
  by category.and in the main data there is no category data. so you must first retrieve detailed
  data through the main data id to retrieve the category list. Thanks*/

const FilterRestaurantInitiator = {
  init({data, content, elmFilter, apiRestaurant}) {
    this._data = data;
    this._content = content.querySelector('#explore-restaurant');
    this._listFilter = document.querySelector('#list-filter');
    this._searhElement = document.querySelector('#elmSearchRestaurant');
    this._elmFilter = elmFilter;
    this._listCategories = [];
    this._ApiRestaurant = apiRestaurant;

    this._setEvent(this._data);
  },

  _setEvent(data) {
    const eventFilterRestaurant = async () => {
      this._listCategories = [];
      if (this._listFilter.innerHTML === '') {
        await this._showCategory(data);
      } else {
        this._listFilter.innerHTML = ``;
      }
    };
    this._elmFilter.eventClick = eventFilterRestaurant;
  },

  async _setEventButton() {
    const buttonFilter = this._listFilter.querySelectorAll('button');
    buttonFilter.forEach((button) =>{
      button.addEventListener('click', () =>{
        this._searhElement.value = button.innerHTML;
        this._searhElement.dispatchEvent(new Event('change'));
      });
    });
  },

  async _showCategory(data) {
    await data.forEach(async (restaurant)=>{
      const getDetail = await this._ApiRestaurant.getRestaurantDetail(restaurant.id);
      await this._getCategory(getDetail);
    });
  },

  async _getCategory(data) {
    await data.restaurant.categories.forEach( (category)=>{
      if (this._listCategories.indexOf(category.name) === -1) {
        this._listCategories.push(category.name);
        this._createElementButton(category.name);
      }
    });
  },

  _createElementButton(name) {
    const button = `<button class="card-1" data-filter = ${name} aria-label ="filter restaurant">${name}</button>`;
    this._listFilter.innerHTML += button;
    this._setEventButton();
  },


};

export default FilterRestaurantInitiator;
