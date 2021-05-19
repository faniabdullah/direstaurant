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
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllRestaurant() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putRestaurant(restaurant) {
    Toast.show({
      message: 'Restaurant Berhasil di Tambahkan Ke Boorkmark',
      type: 'success',
    });
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },
  async deleteRestaurant(idRestaurant) {
    Toast.show({
      message: 'Restaurant Berhasil di Hapus di Bookmark',
      type: 'failed',
    });
    return (await dbPromise).delete(OBJECT_STORE_NAME, idRestaurant);
  },
};


export default RestaurantBookmarkIdb;
