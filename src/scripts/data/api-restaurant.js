/* eslint-disable new-cap */
import API_ENDPOINT from '@/globals/endpoint';
import CONFIG from '@/globals/config';

class ApiRestaurant {
  static async getCatalog() {
    try {
      const response = await fetch(API_ENDPOINT.LIST);
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  static async getRestaurantDetail(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      return response.json();
    } catch (err) {
      return {};
    }
  }

  static async addReview(review) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'X-Auth-Token': CONFIG.API_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    return response.json();
  }

  static async searchRestaurants(search) {
    try {
      const response = await fetch(API_ENDPOINT.SEARCH(search));
      return response.json();
    } catch (err) {
      return {};
    }
  }
}

export default ApiRestaurant;
