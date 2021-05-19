import ApiRestaurant from '@/data/api-restaurant';
import ExploreRestaurantInitiator from '@/utils/explore-restaurant-initiator';
import RestaurantPopularInitiator from '@/utils/restaurant-popular-initiator';
import SearchRestaurantInitiator from '@/utils/search-restaurant-initiator';
import FilterRestaurantInitiator from '@/utils/filter-restaurant-initiator';
import '@/views/components/pre-loader';
import '@/views/components/search-element';
import '@/views/components/filter-element';
const Home = {
  async render() {
    return `
            <hero-jumbotron></hero-jumbotron>
            <show-case></show-case>
            <section class="content-populer">
              <h2 class="content__label"> Lagi Populer nih !!</h2>
              <div id="restaurantPopularContent" class="content-populer">
                  <pre-loader></pre-loader>
              </div>
            </section>

            <section id="restaurantContent" class="content__explore-restaurant mt2">
                <h2 class="content__label"> Jelajahi Restoran </h2>
                <search-element></search-element>
                <filter-element></filter-element>
                <pre-loader></pre-loader>
                <div id="explore-restaurant"></div>
            </section>
        `;
  },

  async afterRender() {
    try {
      this._restaurantContent = document.getElementById('restaurantContent');
      this._dataRestaurant = await ApiRestaurant.getCatalog();
      await this._initContentHomePage({
        dataRestaurant: this._dataRestaurant,
        restaurantContent: this._restaurantContent,
      });
    } catch (error) {
      console.log(error);
      this._errorContent(restaurantContent);
      this._errorContent(restaurantPopularContent);
    }
  },

  async _errorContent(container) {
    const errorContent = document.createElement('error-content');
    errorContent.innerHTML = `<div class="msg-failed">
                            <span class="material-icons mr1" aria-hidden="true">wifi_off</span>
                            <p class="center">Maaf , List Restoran tidak dapat di tampilkan. Periksa kembali internet anda ya &#128522</p>
                           </div>`;
    if ( await this._isPreLoaderExist(container)) {
      container.querySelector('pre-loader').remove();
    }
    container.appendChild(errorContent);
  },

  async _isPreLoaderExist(container) {
    const preLoader = container.querySelector('pre-loader');
    return preLoader;
  },

  async _initContentHomePage({dataRestaurant, restaurantContent} ) {
    await ExploreRestaurantInitiator.init({
      data: dataRestaurant,
      listContainer: document.querySelector('#explore-restaurant'),
      content: restaurantContent,
    });
    await RestaurantPopularInitiator.init({
      data: dataRestaurant,
      listContainer: document.createElement('restaurant-popular'),
      content: document.getElementById('restaurantPopularContent'),
    });
    await SearchRestaurantInitiator.init({
      data: dataRestaurant,
      content: restaurantContent,
      elmSearch: document.querySelector('search-element'),
    });
    await FilterRestaurantInitiator.init({
      data: dataRestaurant,
      content: restaurantContent,
      elmFilter: document.querySelector('filter-element'),
    });
  },
};

export default Home;
