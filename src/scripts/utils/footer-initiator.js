const FooterInitiator = {
  async init(footerElm) {
    this._footerElm = footerElm;
    this._setEvent();
  },

  _setEvent() {
    const scrollTop = () => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };
    this._footerElm.eventBtnTop = scrollTop;
  },
};


export default FooterInitiator;
