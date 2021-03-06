import BookMark from '../views/pages/boorkmark';
import Home from '../views/pages/home';
import DetailRestaurant from '../views/pages/detail-restaurant';
import notFound from '../views/pages/404';

const routes = {
  '/': Home, // default page
  '/bookmark': BookMark,
  '/home': Home,
  '/detail/:id': DetailRestaurant,
  '/404': notFound,
};

export default routes;
