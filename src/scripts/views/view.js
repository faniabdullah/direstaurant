import { mode} from "../views/view-mode.js";
const viewHtmlRestaurantsAll = (data) => {
      let elmHtml  = '';
      let description = '';
      data.restaurants.forEach((restaurant)=>{
          description = restaurant.description.slice(0,57) + "...";
          elmHtml +=`
            <article class="post-item__content card-1 ">
            <div class="post-item__image"> 
                <img src="${restaurant.pictureId}" alt="Restoran ${restaurant.name} , ${restaurant.city}">
            </div>
            <div class="wrapper__detail">
            <div class="post-item__detail">
                <h3 class="post-item__title">${restaurant.name}</h3>
                <div class="post-item__rating">
                    <span>${getStarRating(restaurant.rating)}</span>
                    <p>(${restaurant.rating})</p>
                </div>
                <div class="post-item__info">
                    <p> ${description}</p>
                </div>
               <div class="post-item__info">
                   <p> <i class="material-icons color-primary" aria-hidden = "true" >place</i> ${restaurant.city}</p>
                </div>
                <div class="post-item__action">
                    <div class="btn__grup">
                        <button class="btn__borkmark" aria-label="Tambahkan Restaurant ${restaurant.name} Ke Bookmark">
                            <i class="material-icons icon">bookmark_border</i>
                        </button>
                        <button class="btn__detail" aria-label="Lihat Detail Restaurant ${restaurant.name}">
                            Detail
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </article>
            `;
      });
      let content = document.querySelector('#post-content-restoran');
      content.innerHTML = elmHtml;
      mode();
}

const viewHtmlRestaurantsSearch = (data , search = '') => {
    let elmHtml  = '';
    console.log("restaurant yang di cari = "+search);
    let description = '';
    let filterResto = search.toUpperCase();
    data.restaurants.forEach((restaurant)=>{
        description = restaurant.description.slice(0,57) + "...";
        if (restaurant.name.toUpperCase().indexOf(filterResto) > -1) {
            console.log("resto ini ada dalam search = "+restaurant.name);
            elmHtml +=`
          <article class="post-item__content card-1 ">
          <div class="post-item__image"> 
              <img src="${restaurant.pictureId}" alt="Restoran ${restaurant.name} , ${restaurant.city}">
          </div>
          <div class="wrapper__detail">
          <div class="post-item__detail">
              <h3 class="post-item__title">${restaurant.name}</h3>
              <div class="post-item__rating">
                  <span>${getStarRating(restaurant.rating)}</span>
                  <p>(${restaurant.rating})</p>
              </div>
              <div class="post-item__info">
                  <p> ${description}</p>
              </div>
             <div class="post-item__info">
                 <p> <i class="material-icons color-primary" aria-hidden = "true" >place</i> ${restaurant.city}</p>
              </div>
              <div class="post-item__action">
                  <div class="btn__grup">
                      <button class="btn__borkmark" aria-label="Tambahkan Restaurant ${restaurant.name} Ke Bookmark">
                          <i class="material-icons icon">bookmark_border</i>
                      </button>
                      <button class="btn__detail" aria-label="Lihat Detail Restaurant ${restaurant.name}">
                          Detail
                      </button>
                  </div>
              </div>
          </div>
          </div>
      </article>
          `;
        }
     ;
    });
    if (elmHtml === '') {
        elmHtml = `<p tabindex="0" class="center nothing-restaurant"> Maaf Restaurant bernama ${search} yang anda cari, Tidak ada di data kami :)</p>`
    }
    let content = document.querySelector('#post-content-restoran');
    content.innerHTML = elmHtml;
    mode();
}

const viewHtmlRestaurantsPopuler = (data) => {
    let elmHtml  = '';
    let description = '';
    
    data.restaurants.forEach((restaurant)=>{
      //populer as rating 4.5
      if (parseFloat(restaurant.rating) >= 4.5) {
        description = restaurant.description.slice(0,57) + "...";
        elmHtml += `
        <article class="post-item__content card-1 ">
        <div class="post-item__image"> 
            <img src="${restaurant.pictureId}" alt="Restoran ${restaurant.name} , ${restaurant.city}">
        </div>
        <div class="wrapper__detail">
        <div class="post-item__detail">
            <h3 class="post-item__title">${restaurant.name}</h3>
            <div class="post-item__rating">
                <span>${getStarRating(restaurant.rating)}</span>
                <p>(${restaurant.rating})</p>
            </div>
            <div class="post-item__info">
                <p> ${description}</p>
            </div>
           <div class="post-item__info">
               <p> <i class="material-icons color-primary" aria-hidden = "true" >place</i> ${restaurant.city}</p>
            </div>
            <div class="post-item__action">
                <div class="btn__grup">
                    <button class="btn__borkmark" aria-label="Tambahkan Restaurant ${restaurant.name}  ke Bookmark">
                        <i class="material-icons icon">bookmark_border</i>
                    </button>
                    <button class="btn btn__detail" aria-label="Lihat Detail Restauran ${restaurant.name} ">
                        Detail
                    </button>
                </div>
            </div>
        </div>
        </div>
    </article>
        `;
      } 
    });
    let content = document.querySelector('#post-content-restoran-populer');
    content.innerHTML = elmHtml;
    mode();
}

const getStarRating = (rating) => {
    let starsRating = ``;
    for (let i = 0; i < parseFloat(rating); i++) {
      if ((parseFloat(rating)) > i && i === (parseInt(rating))) {
        starsRating += `<i class="material-icons" aria-hidden="true">star_half</i>`;
      } else {
        starsRating += `<i class="material-icons" aria-hidden="true">star</i>`;
      }
    }
    return starsRating;
}

export { viewHtmlRestaurantsAll  , viewHtmlRestaurantsPopuler , viewHtmlRestaurantsSearch };