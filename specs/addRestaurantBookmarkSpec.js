import * as TestFactories from '../specs/helpers/testFactories';
import RestaurantBookmark from '@/data/restaurant-bookmark-idb';

describe('Bookmarking a restaurant', () => {
  let bookmarkButton;
  let bookmarkButtonNoData;
  const addBookmarkButton = () => {
    document.body.innerHTML =
        `<button data-bookmark="1"><i></i></button>
        <button data-bookmark=""><i></i></button>
      
        <div id="toast-notification"></div>`;
  };

  beforeEach( () => {
    addBookmarkButton();
    bookmarkButton = document.querySelector(`button[data-bookmark='1']`);
    bookmarkButtonNoData = document.querySelector('button[data-bookmark=""]');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  });

  fit(`should show the outline bookmark (not bookmarked) icon when the restaurant hasn't been bookmarked`, async (done) => {
    await TestFactories.initializeBookmarkButton(bookmarkButton);
    const bookmarkIcon = bookmarkButton.querySelector('i');
      expect(bookmarkIcon.innerHTML === 'bookmark_border')
        .toBeTruthy();
      done();
   
  });

  fit(`shouldn't show the bold bookmark (bookmarked) icon when the restaurant hasn't been bookmarked`, async (done) => {
    await TestFactories.initializeBookmarkButton(bookmarkButton);
    const bookmarkIcon = bookmarkButton.querySelector('i');
    setTimeout(async () =>{
    expect(bookmarkIcon.innerHTML === 'bookmark')
        .toBeFalsy();
        done();
    }, 200);
  });

  fit(`should be able to bookmark a restaurant`, async (done) => {
    const DUMMY_DATA = {'id': '1'};
    await TestFactories.initializeBookmarkButton(bookmarkButton);
    await bookmarkButton.dispatchEvent(new Event('click'));
    setTimeout(async () =>{
      setTimeout(async() => {
        expect(await RestaurantBookmark.getAllRestaurant()).toEqual([DUMMY_DATA]);
      }, 300);
      done();
  }, 600);
  });

  fit(`shouldn't be able to bookmark a bookmarked restaurant`, async (done) => {
    const DUMMY_DATA = {'id': '1'};
    await TestFactories.initializeBookmarkButton(bookmarkButton);
    await RestaurantBookmark.putRestaurant(DUMMY_DATA);
    await bookmarkButton.dispatchEvent(new Event('click'));
    setTimeout(async () =>{
      setTimeout(async() => {
        expect(await RestaurantBookmark.getAllRestaurant()).toEqual([DUMMY_DATA]);
      }, 300);
      done();
    }, 600);
  });

  fit('should unable to bookmark restaurant with no id', async (done) => {
    await RestaurantBookmark.deleteRestaurant('1');
    await TestFactories.initializeBookmarkButton(bookmarkButtonNoData);
    bookmarkButtonNoData.dispatchEvent(new Event('click'));
    setTimeout(async() => {
      expect(await RestaurantBookmark.getAllRestaurant()).toEqual([]);
      done();
    }, 200);
     
  });


});
