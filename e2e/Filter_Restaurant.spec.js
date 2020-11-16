const assert = require('assert');

Feature('Filter Restaurant ');

Before((I) => {
    I.amOnPage('/');
});

Scenario('Showing List Filter', async (I) => {
    I.seeElement('#elmBtnFilter');
    I.forceClick('#elmBtnFilter');
    I.waitForElement('button[data-filter]',5 );
    I.seeElement('button[data-filter]')
});

Scenario('Filter Restaurant', async (I) => {
    I.seeElement('#elmBtnFilter');
    I.forceClick('#elmBtnFilter');
    I.waitForElement('button[data-filter]',5 );
    I.forceClick('button[data-filter]');
    const firstRestaurantCategory = locate('button[data-filter]').first();
    const name = await I.grabTextFrom(firstRestaurantCategory);
    I.seeInField('#elmSearchRestaurant',name);
});