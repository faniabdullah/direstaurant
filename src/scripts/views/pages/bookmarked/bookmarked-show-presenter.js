class RestaurantBookmarkShowPresenter {
  constructor({view, restaurantBookmark}) {
    this._view = view;
    this._restaurantBookmark = restaurantBookmark;

    this._showrestaurantBookmarks();
  }

  async _showrestaurantBookmarks() {
    const Restaurants = await this._restaurantBookmark.getAllRestaurant();
    this._displayRestaurants(Restaurants);
  }

  _displayRestaurants(Restaurants) {
    this._view.showFavoriteRestaurants(Restaurants);
  }
}

export default RestaurantBookmarkShowPresenter;
