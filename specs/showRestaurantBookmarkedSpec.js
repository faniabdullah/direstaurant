
import RestaurantBookmarkIdb from '@/data/restaurant-bookmark-idb';
import RestaurantBookmarkView from '@/views/pages/bookmarked/bookmarked-view';
import RestaurantBookmarkShowPresenter from '@/views/pages/bookmarked/bookmarked-show-presenter';
import BookmarkPresenter from '@/utils/bookmark-presenter';
import ToastInitiator from '@/utils/toast-initiator';
import ApiRestaurant from '@/data/api-restaurant';

describe('Showing all restaurant bookmark', () => {
  let view;

  const renderTemplate = () => {
    view = new RestaurantBookmarkView({apiRestaurant: ApiRestaurant, restaurantBookmark: RestaurantBookmarkIdb, bookmarkPresenter: BookmarkPresenter, toastInitialize: ToastInitiator});
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurant have been bookmarked', () => {
    fit('should ask for the restaurant bookmark', () => {
      const restaurantBookmark = spyOnAllFunctions(RestaurantBookmarkIdb);

      new RestaurantBookmarkShowPresenter({
        view,
        restaurantBookmark,
      });

      expect(restaurantBookmark.getAllRestaurant).toHaveBeenCalledTimes(1);
    });

    fit('should show the information that no restaurants have been bookmarked', (done) => {
      document.getElementById('restaurant-bookmark').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant_not_found').length)
          .toEqual(1);

        done();
      });

      const restaurantBookmark = spyOnAllFunctions(RestaurantBookmarkIdb);
      restaurantBookmark.getAllRestaurant.and.returnValues([]);

      new RestaurantBookmarkShowPresenter({
        view,
        restaurantBookmark,
      });
    });
  });

  describe('When restaurant bookmark exist', () => {
    fit('should show the restaurants', (done) => {
      document.getElementById('restaurant-bookmark').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('restaurant-item').length).toEqual(2);
        done();
      });

      const restaurantBookmark = spyOnAllFunctions(RestaurantBookmarkIdb);
      restaurantBookmark.getAllRestaurant.and.returnValues([
        {
          id: 11, name: 'A', rating: 3, description: 'Sebuah Resto A',
        },
        {
          id: 22, name: 'B', rating: 4, description: 'Sebuah Resto B',
        },
      ]);

      new RestaurantBookmarkShowPresenter({
        view,
        restaurantBookmark,
      });
    });
  });
});