import { itActsAsRestaurantBookmarkModel } from './contract/restaurantBookmarkContract';
import RestaurantBookmarkIdb from '@/data/restaurant-bookmark-idb';

describe('Restaurant Bookmark Idb Contract Test Implementation', () => {
  beforeEach(async () => {
    (await RestaurantBookmarkIdb.getAllRestaurant()).forEach(async (restaurant) => {
      await RestaurantBookmarkIdb.deleteRestaurant(restaurant.id);
    });
  });
  afterEach(async () => {
    (await RestaurantBookmarkIdb.getAllRestaurant()).forEach(async (restaurant) => {
      await RestaurantBookmarkIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsRestaurantBookmarkModel(RestaurantBookmarkIdb);
});
