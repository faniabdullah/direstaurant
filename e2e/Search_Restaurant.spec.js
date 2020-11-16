const assert = require('assert');

Feature('Search Restaurant ');

Before((I) => {
    I.amOnPage('/');
});

Scenario('search restaurant [existing]', async (I) => {
    const searchText = 'Kafein';
    I.seeElement('#elmSearchRestaurant');
    I.fillField('Cari Restaurant', searchText);
    I.pressKey('Enter');
    I.see(searchText, 'h3');
});

Scenario('Search Restaurant [non-existent]', async (I) => {
    const searchText = `EXAMPLES`;
    I.seeElement('#elmSearchRestaurant');
    I.fillField('Cari Restaurant', searchText);
    I.pressKey('Enter');
    I.see(`Maaf Restaurant ${searchText} yang Anda Cari Belum Terdaftar di Data Kami 😊`, 'p.center'); 
});