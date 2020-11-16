const assert = require('assert');

Feature('Add and Remove Restaurant Bookmark');
Before((I) => {
    I.amOnPage('/#/bookmark');
});

Scenario('showing empty Bookmark', (I) => {
I.see('Maaf Tidak Ada Restaurant untuk di tampilkan di Data Bookmark Anda 😊', 'p.center')
});


Scenario('Add to Bookmark restaurant', async (I) => {
    I.see('Maaf Tidak Ada Restaurant untuk di tampilkan di Data Bookmark Anda 😊', 'p.center');
    I.amOnPage('/');
    
    const firstRestaurantCard = locate('.post-item__detail h3').first();
    const firstRestaurantName = await I.grabTextFrom(firstRestaurantCard);
    I.seeElement('button[data-bookmark]');
    I.forceClick('restaurant-item article .wrapper__detail .btn__grup button');

    I.amOnPage('/#/bookmark');
    I.waitForElement('restaurant-item',2 );
    const bookmarkedRestaurantCard = locate('.post-item__detail h3').first();
    const bookmarkedRestaurant = await I.grabTextFrom(bookmarkedRestaurantCard);
    assert.strictEqual(bookmarkedRestaurant, firstRestaurantName);
});

Scenario('Remove Bookmarked restaurant', async (I) => {
    I.see('bookmark', 'button[data-bookmark] i');
    I.seeElement('button[data-bookmark]');
    I.click('button[data-bookmark]');
    I.dontSeeElement('button[data-bookmark]');
    
});