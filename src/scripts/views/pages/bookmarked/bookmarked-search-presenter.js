class RestaurantBookmarkSearchPresenter {
  constructor({restaurantBookmark, view}) {
    this._view = view;
    this._listenToSearchRequestByUser();
    this._restaurantBookmark = restaurantBookmark;
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestaurants(latestQuery);
    });
  }

  async _searchRestaurants(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundRestaurants;
    if (this.latestQuery.length > 0) {
      foundRestaurants = await this._restaurantBookmark.searchRestaurants(this.latestQuery);
    } else {
      foundRestaurants = await this._restaurantBookmark.getAllRestaurant();
    }

    this._showFoundRestaurants(foundRestaurants);
  }

  _showFoundRestaurants(Restaurants) {
    this._view.showFavoriteRestaurants(Restaurants);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default RestaurantBookmarkSearchPresenter;
