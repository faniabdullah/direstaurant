import ApiRestaurant from '@/data/api-restaurant';
import ExploreRestaurantInitiator from '@/utils/explore-restaurant-initiator';
import RestaurantPopularInitiator from '@/utils/restaurant-popular-initiator';
import SearchRestaurantInitiator from '@/utils/search-restaurant-initiator';
import FilterRestaurantInitiator from '@/utils/filter-restaurant-initiator';
import BookmarkPresenter from '@/utils/bookmark-presenter';
import BookmarkRestaurant from '@/data/restaurant-bookmark-idb';
import ToastInitiator from '@/utils/toast-initiator';

const Home = {
  async render() {
    return `<hero-jumbotron></hero-jumbotron>
            <show-case></show-case>
            <section class="content-populer">
              <h2 class="content__label"> Lagi Populer nih !!</h2>
              <div id="restaurantPopularContent" class="content-populer">
                  <pre-loader></pre-loader>
              </div>
            </section>

            <section id="restaurantContent" class="content__explore-restaurant mt2">
                <h2 class="content__label"> Jelajahi Restoran </h2>
                <div class="filtur-restaurant">
                  <search-element></search-element>
                  <filter-element></filter-element>
                  <div id="list-filter"></div>
                </div>
                <pre-loader></pre-loader>
                <div id="explore-restaurant"></div>
            </section>
        `;
  },

  async afterRender() {
    try {
      this._restaurantContent = document.getElementById('restaurantContent');
      this._restaurantPopularContent = document.getElementById('restaurantPopularContent');
      this._dataRestaurant = await ApiRestaurant.getCatalog();
      this._initContentHomePage({
        dataRestaurant: this._dataRestaurant,
        restaurantContent: this._restaurantContent,
        restaurantPopularContent: this._restaurantPopularContent,
      });
    } catch (error) {
      console.log(error);
      this._errorContent(this._restaurantContent);
      this._errorContent(this._restaurantPopularContent);
    }
  },

  _errorContent(container) {
    const errorContent = document.createElement('error-content');
    errorContent.innerHTML = `<div class="msg-failed">
                            <span class="material-icons mr1" aria-hidden="true">wifi_off</span>
                            <p class="center">Maaf , List Restoran tidak dapat di tampilkan. Periksa kembali internet anda ya &#128522</p>
                           </div>`;
    if ( container.querySelector('pre-loader')) {
      container.querySelector('pre-loader').remove();
    }
    container.appendChild(errorContent);
  },

  _initContentHomePage({dataRestaurant, restaurantContent, restaurantPopularContent} ) {
    ExploreRestaurantInitiator.init({
      data: dataRestaurant,
      listContainerExplore: document.querySelector('#explore-restaurant'),
      contentExplore: restaurantContent,
      bookmarkPresenter: BookmarkPresenter,
      bookmarkRestaurant: BookmarkRestaurant,
      toastInitiator: ToastInitiator,
      apiRestaurant: ApiRestaurant,
    });
    RestaurantPopularInitiator.init({
      data: dataRestaurant,
      listContainer: document.createElement('restaurant-popular'),
      content: restaurantPopularContent,
      bookmarkPresenter: BookmarkPresenter,
      bookmarkRestaurant: BookmarkRestaurant,
      toastInitiator: ToastInitiator,
      apiRestaurant: ApiRestaurant,
    });
    SearchRestaurantInitiator.init({
      data: dataRestaurant,
      content: restaurantContent,
      elmSearch: document.querySelector('search-element'),
      bookmarkPresenter: BookmarkPresenter,
      bookmarkRestaurant: BookmarkRestaurant,
      toastInitiator: ToastInitiator,
      apiRestaurant: ApiRestaurant,
    });
    FilterRestaurantInitiator.init({
      data: dataRestaurant,
      content: restaurantContent,
      elmFilter: document.querySelector('filter-element'),
      apiRestaurant: ApiRestaurant,
    });
  },
};

export default Home;
