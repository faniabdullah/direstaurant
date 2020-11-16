import RestaurantBookmarkIdb from '@/data/restaurant-bookmark-idb';
import RestaurantBookmarkView from './bookmarked/bookmarked-view';
import RestaurantBookmarkShowPresenter from './bookmarked/bookmarked-show-presenter';
import RestaurantBookmarkSearchPresenter from './bookmarked/bookmarked-search-presenter';
import BookmarkPresenter from '@/utils/bookmark-presenter';
import ToastInitiator from '@/utils/toast-initiator';
import ApiRestaurant from '@/data/api-restaurant';


const view = new RestaurantBookmarkView({apiRestaurant: ApiRestaurant, restaurantBookmark: RestaurantBookmarkIdb, bookmarkPresenter: BookmarkPresenter, toastInitialize: ToastInitiator});

const BookMark = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new RestaurantBookmarkShowPresenter({view, restaurantBookmark: RestaurantBookmarkIdb});
    new RestaurantBookmarkSearchPresenter({view, restaurantBookmark: RestaurantBookmarkIdb});
  },
};

export default BookMark;
