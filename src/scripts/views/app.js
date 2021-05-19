import DrawerInitiator from '../utils/drawer-initiator';
import ModeInitiator from '../utils/view-mode-initiator';
import FooterInitiator from '../utils/footer-initiator';
import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
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
  }

  static async refreshPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    await page.afterRender();
  }
}

export default App;
