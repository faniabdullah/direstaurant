const ModeInitiator = {
  init(element) {
    this._html = document.documentElement;
    this._elementSetMode = element;
    this._mode();
    this._giveEventClick();
  },

  async _mode() {
    if (localStorage.getItem('preferredTheme') === 'dark') {
      await this._setEvent(true);
    } else {
      await this._setEvent(false);
    }
  },

  async _setEvent(isDark) {
    if (isDark) {
      this._setDark();
    } else {
      this._setLight();
    }
  },

  async _giveEventClick() {
    const eventBtnDark = () => {
      this._setEvent(true);
      this._setHideButton();
    };

    const eventBtnLight = () => {
      this._setEvent(false);
      this._setHideButton();
    };
    this._elementSetMode.eventSetDark = eventBtnDark;
    this._elementSetMode.eventSetLight = eventBtnLight;
  },
  _setHideButton() {
    if (localStorage.getItem('preferredTheme') === 'dark') {
      document.querySelector('#setDark').classList.add('hide');
      document.querySelector('#setLight').classList.remove('hide');
    } else {
      document.querySelector('#setLight').classList.add('hide');
      document.querySelector('#setDark').classList.remove('hide');
    }
  },

  _setDark() {
    this._html.setAttribute('data-theme', 'dark');
    localStorage.setItem('preferredTheme', 'dark');
    this._transition();
  },

  _setLight() {
    localStorage.removeItem('preferredTheme');
    document.documentElement.setAttribute('data-theme', 'light');
    this._transition();
  },

  _transition() {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
      this._setHideButton();
      document.documentElement.classList.remove('transition');
    }, 1000);
  },

};

export default ModeInitiator;
