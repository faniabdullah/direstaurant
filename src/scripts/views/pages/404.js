
const NotFound = {
  async render() {
    return `
    <div class='container__secondary card-1 mt8'>
        <div class="msg-failed mt2">
            <span class="material-icons mr1" aria-hidden="true">error_outline</span>
            <p class="center">404 Hai Kak Halaman yang di cari Tidak Ada , kembali ke home ya &#128522</p>
        </div>
    </div>
        `;
  },

  async afterRender() {

  },

};

export default NotFound;
