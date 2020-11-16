import * as TestFactories from '../specs/helpers/testFactories';
import RestaurantBookmark from '@/data/restaurant-bookmark-idb';

describe('Removing a bookmark', () => {
  let bookmarkButton;

  const addBookmarkButton = () => {
    document.body.innerHTML =
        `<button data-bookmark="1"><i></i></button>
        <div id="toast-notification"></div>`;
  };

  beforeEach( async () => {
    addBookmarkButton();
    const DUMMY_DATA = {'id': '1'};
    await RestaurantBookmark.putRestaurant(DUMMY_DATA);
    bookmarkButton = document.querySelector('button[data-bookmark="1"]');
    await TestFactories.initializeBookmarkButton(bookmarkButton)
    
  });

  fit(`should show the bold bookmark (bookmarked) icon when the restaurant hasn been bookmarked`, async () => {
    await TestFactories.initializeBookmarkButton(bookmarkButton);
    const bookmarkIcon = bookmarkButton.querySelector('i');
      expect(bookmarkIcon.innerHTML === 'bookmark')
          .toBeTruthy();
  });

  fit(`should show the outline bookmark (not bookmarked) icon when the restaurant hasn't been bookmarked`, async () => {
    await TestFactories.initializeBookmarkButton(bookmarkButton);
    const bookmarkIcon = bookmarkButton.querySelector('i');
    expect(bookmarkIcon.innerHTML === 'bookmark_border')
        .toBeFalsy();
  });

  fit(`should be able to remove bookmark from the list `, async (done) => {
      const bookmarkIcon = bookmarkButton.querySelector('i');
      expect(bookmarkIcon.innerHTML === 'bookmark')
        .toBeTruthy();
        setTimeout(async () =>{
          await bookmarkButton.dispatchEvent(new Event('click'));
          setTimeout(async() => {
            expect(await RestaurantBookmark.getAllRestaurant()).toEqual([]);
          }, 200);
          done();
        }, 800);
  });



  
});
