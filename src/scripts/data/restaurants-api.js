import { viewHtmlRestaurantsAll , viewHtmlRestaurantsPopuler , viewHtmlRestaurantsSearch} from "../views/view.js";


const base_url = "./DATA.json"

const status = (response) => {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
      } else {
        return Promise.resolve(response);
      }
}

const json = (response) => {
    return response.json();
}

const getRestaurants = () => {
  fetch(base_url)
    .then(status)
    .then(json)
    .then(viewHtmlRestaurantsAll)
    .catch(errors =>{
     console.log("your error "+errors)
    });
}

const getRestaurantsPopuler = () => {
  fetch(base_url)
    .then(status)
    .then(json)
    .then(viewHtmlRestaurantsPopuler)
    .catch(errors =>{
     console.log("your error "+errors)
    });
}

const searchRestaurants = () => {
  let restaurant = document.getElementById("search-restaurant").value;
  if (restaurant === '') {
     getRestaurants();
  }else{
    getSearchRestaurants(restaurant);
  }
}


const getSearchRestaurants = (restaurant) => {
  fetch(base_url)
    .then(status)
    .then(json)
    .then((data) => {
      viewHtmlRestaurantsSearch(data,restaurant)
    })
    .catch(errors =>{
     console.log("your error "+errors)
    });
}

export { getRestaurants,getRestaurantsPopuler,searchRestaurants };