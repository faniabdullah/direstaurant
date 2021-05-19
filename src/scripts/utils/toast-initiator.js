import '@/views/components/toast-element';

const Toast = {
  async show({message = 'hello Iam Toast', type = 'default'}) {
    this._container = document.getElementById('toast-notification');
    this._TOAST_ID = Math.random().toString(36).substring(5);
    const ToastElement = document.createElement('toast-element');
    ToastElement.message = {
      id: this._TOAST_ID,
      text: message,
      type: type,
    };
    if (await this._isToastExist(this._container)) {
      this._container.classList.add('active');
    }
    await this._container.appendChild(ToastElement);
    this._toast = document.getElementById(this._TOAST_ID);
    this._closeBtn = this._toast.querySelector('.close-toast');

    setTimeout(() => {
      this._toast.classList.add('show-toast');
    }, 400);


    await this._createEvent(this._toast);
  },

  async _isToastExist(container) {
    const preLoader = container.querySelector('toast-element');
    return !preLoader;
  },

  async _createEvent(toast) {
    const autoHide = setTimeout(() => {
      this._autoHideAndRemove();
    }, 2400);

    const hideEvent = (event) => {
      event.stopPropagation();
      toast.classList.remove('show-toast');
      setTimeout(async () => {
        toast.remove();
        clearTimeout(autoHide);
        if ( await this._isToastExist(this._container)) {
          this._container.classList.remove('active');
        }
      }, 500);
    };
    const closeBtn = this._closeBtn;
    closeBtn.addEventListener('click', hideEvent);
  },


  _autoHideAndRemove() {
    const thisToast = document.querySelectorAll('#toast-notification toast-element');
    if (thisToast[0]) {
      if (thisToast[0].classList.contains('show-toast')) {
        thisToast[0].className = thisToast[0].className.replace('show-toast', '');
      }
      setTimeout(async () => {
        thisToast[0].remove();
        if ( await this._isToastExist(this._container)) {
          this._container.classList.remove('active');
        }
      }, 400);
    }
  },

};

export default Toast;
