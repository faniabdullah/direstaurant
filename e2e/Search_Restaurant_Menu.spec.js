const assert = require('assert');

Feature('Search Restaurant Menu ');

Before((I) => {
    I.amOnPage('/');
});

Scenario('search restaurant [existing] and [non-existent] ', async (I) => {
    const searchTextNonExits = `EXAMPLES OF MENU THAT DON'T EXIST`;
    const searchTextExist = 'Sirup';
    I.seeElement('restaurant-item');
    I.forceClick('restaurant-item article .wrapper__detail .btn__grup a')
    let url = await I.grabCurrentUrl();
    console.log(`Current URL is [${url}]`);
    I.seeElement('#elmSearchMenu');

    I.fillField('Cari Menu', searchTextExist);
    I.see(searchTextExist, 'h3');
    I.fillField('Cari Menu', searchTextNonExits);
    I.see(`Maaf , Menu ${searchTextNonExits} yang anda cari Tidak Ada di Restaurant ini , Cari Restaurant Yang Lain ya 😊`, 'p.center'); 
});