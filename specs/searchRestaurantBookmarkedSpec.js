import RestaurantBookmarkSearchPresenter
  from '@/views/pages/bookmarked/bookmarked-search-presenter';
  import RestaurantBookmarkIdb from '@/data/restaurant-bookmark-idb';
  import RestaurantBookmarkView from '@/views/pages/bookmarked/bookmarked-view';
  import BookmarkPresenter from '@/utils/bookmark-presenter';
  import ToastInitiator from '@/utils/toast-initiator';
  import ApiRestaurant from '@/data/api-restaurant';
  
describe('Searching restaurant', () => {
  let presenter;
  let restaurantBookmark;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('elmSearchBookmarked');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new RestaurantBookmarkView({apiRestaurant: ApiRestaurant, restaurantBookmark: RestaurantBookmarkIdb, bookmarkPresenter: BookmarkPresenter, toastInitialize: ToastInitiator});
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    restaurantBookmark = spyOnAllFunctions(RestaurantBookmarkIdb);
    presenter = new RestaurantBookmarkSearchPresenter({
      restaurantBookmark,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    fit('should be able to capture the query typed by the user', () => {
      searchRestaurants('resto a');

      expect(presenter.latestQuery)
        .toEqual('resto a');
    });

    fit('should ask the model to search for restaurants', () => {
        searchRestaurants('resto a');
  
        expect(restaurantBookmark.searchRestaurants)
          .toHaveBeenCalledWith('resto a');
      });

    fit('should show the found restaurans', () => {
      presenter._showFoundRestaurants([{ id: 1 }]);
      expect(document.querySelectorAll('restaurant-item').length)
        .toEqual(1);

      presenter._showFoundRestaurants([{
        id: 1,
        title: 'Satu',
      }, {
        id: 2,
        title: 'Dua',
      }]);
      expect(document.querySelectorAll('restaurant-item').length)
        .toEqual(2);
    });
      
  });

  describe('When query is empty', () => {
    fit('should capture the query as empty', () => {
      searchRestaurants(' ');
      expect(presenter.latestQuery.length)
        .toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length)
        .toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length)
        .toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length)
        .toEqual(0);
    });

    fit('should show all restaurant bookmarked', () => {
      searchRestaurants('    ');

      expect(restaurantBookmark.getAllRestaurant)
        .toHaveBeenCalled();
    });
  });

  describe('When no restaurant bookmarked could be found', () => {
    fit('should show the empty message', (done) => {
      document.getElementById('restaurant-bookmark').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant_not_found').length).toEqual(1);

        done();
      });

      restaurantBookmark.searchRestaurants.withArgs('resto a').and.returnValues([]);

      searchRestaurants('resto a');
    });

    fit('should not show any restaurant', (done) => {
      document.getElementById('restaurant-bookmark').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('restaurant-item').length)
          .toEqual(0);
        done();
      });

      restaurantBookmark.searchRestaurants.withArgs('resto a')
        .and
        .returnValues([]);

      searchRestaurants('resto a');
    });
  });
});
