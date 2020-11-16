import DrawerInitiator from '../utils/drawer-initiator';
import ModeInitiator from '../utils/view-mode-initiator';
import FooterInitiator from '../utils/footer-initiator';
import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';

// Components
import '@/views/components/hero-jumbotron';
import '@/views/components/toast-element';
import '@/views/components/restaurant-item';
import '@/views/components/pre-loader';
import '@/views/components/search-element';
import '@/views/components/filter-element';
import '@/views/components/search-bookmarked';
import '@/views/components/detail-restaurant-menu-item';
import '@/views/components/detail-restaurant-information';
import '@/views/components/detail-restaurant-review';
import '@/views/components/detail-restaurant-search';

class App {
  constructor({button, drawer, content}) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  async _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
    ModeInitiator.init(document.querySelector('set-mode'));
    FooterInitiator.init(document.querySelector('footer-element'));
  }

  async renderPage() {
    let url = UrlParser.parseActiveUrlWithCombiner();
    if (!(url in routes)) {
      window.location.hash = '#/404';
      url = UrlParser.parseActiveUrlWithCombiner();
    }
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
    this._deleteSceleton();
  }

  _deleteSceleton() {
    document.querySelector('main').classList.remove('skeleton');
  }
}

export default App;
