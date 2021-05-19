import '@/views/components/detail-restaurant-menu-item';
const DetailRestaurantMenuInitiator = {
  init({data, elmMenus, elmSearchMenus}) {
    this._menuFoods = data.restaurant.menus.foods;
    this._menuDrinks = data.restaurant.menus.drinks;
    this._elmSearchMenus = elmSearchMenus;
    this._elmMenus= elmMenus;
    this._showMenus();
    this._SearchMenus();
  },
  async _SearchMenus() {
    const eventSearch = async () => {
      if (this._elmSearchMenus.value === '') {
        this._showMenus();
      } else {
        this._showMenusSearch(this._elmSearchMenus.value.toUpperCase());
      }
    };
    this._elmSearchMenus.eventSearch = eventSearch;
  },

  async _showMenusSearch(search) {
    this._elmMenus.innerHTML = '';
    await this._searchFoods(search);
    await this._searchDrinks(search);
    this._isNothingMenus(search);
  },

  async _isNothingMenus(searchValue) {
    if (this._elmMenus.innerHTML === '') {
      this._elmMenus.innerHTML = `<div class="msg-failed mt2">
      <span class="material-icons mr1" aria-hidden="true">restaurant_menu</span>
      <p class="center">Maaf , Menu ${searchValue} yang anda cari Tidak Ada di Restaurant ini , Cari Restaurant Yang Lain ya &#128522</p>
     </div>`;
    };
  },

  async _showMenus() {
    this._elmMenus.innerHTML = '';
    await this._showFoods();
    await this._showDrinks();
  },

  async _searchFoods(searchValue) {
    this._menuFoods.filter((food)=> food.name.toUpperCase().indexOf(searchValue) > -1)
        .map((filteredItem) => {
          const MenuItemDrinks = document.createElement('menu-item');
          MenuItemDrinks.menuFoods = filteredItem;
          this._elmMenus.appendChild(MenuItemDrinks);
        });
  },

  async _searchDrinks(searchValue) {
    this._menuDrinks.filter((drink)=> drink.name.toUpperCase().indexOf(searchValue) > -1)
        .map((filteredItem) => {
          const MenuItemDrinks = document.createElement('menu-item');
          MenuItemDrinks.menuDrinks = filteredItem;
          this._elmMenus.appendChild(MenuItemDrinks);
        });
  },

  async _showFoods() {
    this._menuFoods.forEach((food) => {
      const MenuItemFood = document.createElement('menu-item');
      MenuItemFood.menuFoods = food;
      this._elmMenus.appendChild(MenuItemFood);
    });
  },

  async _showDrinks() {
    this._menuDrinks.forEach((drink) => {
      const MenuItemDrinks = document.createElement('menu-item');
      MenuItemDrinks.menuDrinks = drink;
      this._elmMenus.appendChild(MenuItemDrinks);
    });
  },

};

export default DetailRestaurantMenuInitiator;
