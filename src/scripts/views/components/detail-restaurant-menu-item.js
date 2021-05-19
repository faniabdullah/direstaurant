import CONFIG from '@/globals/config';

class MenuItem extends HTMLElement {
  set menuFoods(food) {
    const menuItem =`
              <div class="item__menu_restaurant card-1">
                <img class="picture__item" src="${CONFIG.IMAGE_DEFAULT_FOOD_URL}" alt="Makanan ${food.name}">
                <div class="name__item">
                  <h3>${food.name}</h3>
                  <span class = "line"></span>
                </div>
              </div>`;
    this._restaurantMenuFoods = menuItem;
    this._render();
  }

  set menuDrinks(drink) {
    const menuItem =`
              <div class="item__menu_restaurant card-1">
                <img class="picture__item" src="${CONFIG.IMAGE_DEFAULT_DRINK_URL}" alt="Minuman ${drink.name}">
                <div class="name__item">
                  <h3>${drink.name}</h3>
                  <span class = "line"></span>
                </div>
              </div>`;
    this._restaurantMenuDrinks = menuItem;
    this._render();
  }

  _render() {
    this.innerHTML = `
    ${this._resolveUndefined(this._restaurantMenuFoods)} 
    ${this._resolveUndefined(this._restaurantMenuDrinks)} 
    `;
  }

  _resolveUndefined(item = '') {
    return item;
  }
}
customElements.define('menu-item', MenuItem);

