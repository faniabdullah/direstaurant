const assert = require('assert');

Feature('Dark / Light Mode apps');
Before((I) => {
    I.amOnPage('/');
});

Scenario('Set Mode', async (I) => {
  I.seeElement('#setDark');
  I.dontSeeElement('#setLight');
  I.click('#setDark');
  I.dontSeeElement('#setDark');

  I.seeElement('#setLight');
  I.click('#setLight');
  I.dontSeeElement('#setLight');
  I.seeElement('#setDark');

});
