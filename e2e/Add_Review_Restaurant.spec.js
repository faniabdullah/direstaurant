const assert = require('assert');

Feature('Add Restaurant Review');

Before((I) => {
    I.amOnPage('/');
});

Scenario('Add Review', async (I) => {
    const textForReview = 'Hallo Ini Review dengan e2e Testing';

    I.seeElement('restaurant-item');
    I.forceClick('restaurant-item article .wrapper__detail .btn__grup a')
    let url = await I.grabCurrentUrl();
    console.log(`Current URL is [${url}]`);

    I.seeElement('form')
    I.fillField('Nama Lengkap', 'faniabdullah');
    I.fillField('Tanggapan Anda', textForReview);
    I.click('#elmBtnsendReview');
    I.see(textForReview, 'p');
});