import BookmarkPresenter from '@/utils/bookmark-presenter';
import BookmarkRestaurant from '@/data/restaurant-bookmark-idb';
import ToastInitiator from '@/utils/toast-initiator';
import ApiRestaurant from '@/data/api-restaurant';

const initializeBookmarkButton = async (bookmarkSelector) => {
    await BookmarkPresenter.init({
      bookmarkButton: bookmarkSelector,
      ApiRestaurant: ApiRestaurant,
      ToastInitiator: ToastInitiator,
      BookmarkRestaurant: BookmarkRestaurant,
    });
};

export {initializeBookmarkButton};
