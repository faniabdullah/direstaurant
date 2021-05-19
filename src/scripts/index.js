import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.sass';

const menu = document.querySelector('#menu');
const hero = document.querySelector('.hero');
const main = document.querySelector('main');
const drawer = document.querySelector('#drawer');

import { setDarkMode , mode} from "./views/view-mode.js";
import { getRestaurants,getRestaurantsPopuler , searchRestaurants} from "./data/restaurants-api.js";

document.addEventListener('DOMContentLoaded', () => {
      getRestaurants();
      getRestaurantsPopuler();
      window.setDarkMode = setDarkMode; 
      window.searchRestaurant= searchRestaurants;
      mode(); 

    menu.addEventListener('click',  (event) => {
        drawer.classList.toggle('open');
        event.stopPropagation();
    });
    
    hero.addEventListener('click', () => {
        drawer.classList.remove('open');
    })
    
    main.addEventListener('click', () => {
        drawer.classList.remove('open');
     })

    });
