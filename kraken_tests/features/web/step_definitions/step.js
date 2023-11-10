const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;

When('I go to login', async function () {
  let element = await this.driver.$('a[data-tracking-id="sign-in-top-bar"]');
  element.click();
});

When('I enter email {string}', async function (email) {
  let element = await this.driver.$('#identification');
  return await element.setValue(email);
});

When('I enter password {string}', async function (password) {
  let element = await this.driver.$('#password');
  return await element.setValue(password);
});

When('I click login', async function () {
  let element = await this.driver.$('button[type="submit"]');
  return await element.click();
});

When('I click forget', async function () {
  let element = await this.driver.$('#ember4');
  return await element.click();
});

Then('I should be on dashboard', async function () {
  let element = await this.driver.$('.gh-canvas-title').isExisting();
  expect(element).to.equal(true);
});

Then('I should get an error {string}', async function(message) {
   let element = await this.driver.$('p.main-error');
   const errorText = await element.getText();
  //  console.log('Element text:', errorText);
   expect(errorText.trim()).to.equal(message);
});

Then('I click signout', async function () {
  let dropdown = await this.driver.$('#ember33');
  await dropdown.click();
  let signOutLink = await this.driver.$('.dropdown-item.user-menu-signout');
  await signOutLink.waitForClickable({
    timeout: 10000,
    timeoutMsg: 'Sign out link is not clickable after waiting.',
  });

  await signOutLink.click();
});

Then('I should be in authentication page', async function () {
  let bodyElement = await this.driver.$('body');
  const classAttributeValue = await bodyElement.getAttribute('class');
  expect(classAttributeValue).to.include('ember-application unauthenticated-route');
});
