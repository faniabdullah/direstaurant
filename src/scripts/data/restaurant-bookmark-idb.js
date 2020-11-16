import {openDB} from 'idb';
import CONFIG from '@/globals/config';
import Toast from '@/utils/toast-initiator';

const {DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME} = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, {keyPath: 'id'});
  },
});

const RestaurantBookmarkIdb= {
  async getRestaurant(id) {
    if (!id) {
      return;
    }
    const data = (await dbPromise).get(OBJECT_STORE_NAME, id);
    return data;
  },
  async getAllRestaurant() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }
    await Toast.show({
      message: 'Restaurant Berhasil di Tambahkan Ke Boorkmark',
      type: 'success',
    });
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },
  async deleteRestaurant(idRestaurant) {
    await Toast.show({
      message: 'Restaurant Berhasil di Hapus di Bookmark',
      type: 'failed',
    });
    return (await dbPromise).delete(OBJECT_STORE_NAME, idRestaurant);
  },
  async searchRestaurants(query) {
    return (await this.getAllRestaurant()).filter((Restaurant) => {
      const loweredCaseRestaurantTitle = (Restaurant.name || '-').toLowerCase();
      const jammedRestaurantTitle = loweredCaseRestaurantTitle.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedRestaurantTitle.indexOf(jammedQuery) !== -1;
    });
  },
};


export default RestaurantBookmarkIdb;
