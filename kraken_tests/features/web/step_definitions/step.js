const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;

function getRandomBetween() {
  return Math.random() * (11 - 99) + 11;
}

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

// New post workflow

Then('I click in new post', async function () {
  let element = await this.driver.$('.ember-view.gh-secondary-action.gh-nav-new-post');
  return await element.click();
});

Then('I write the title {string} of the post', async function(title) {
  let element = await this.driver.$('.gh-editor-title.ember-text-area.gh-input.ember-view');
  return await element.setValue(title);
});

Then('I write the body {string} of the post', async function(body) {
  let element = await this.driver.$('.kg-prose');
  return await element.setValue(body);
});

Then('I click in publish my post', async function() {
  let button = await this.driver.$('[data-test-button="publish-flow"]');
  return await button.click();
});

Then('I click in Continue final review', async function() {
  let button = await this.driver.$('[data-test-button="continue"]');
  return await button.click();
});

When('I click in confirm publish', async function() {
  let button = await this.driver.$('[data-test-button="confirm-publish"]');
  return await button.click();
});

Then('I get the boom confirmation message', async function() {
  let element = await this.driver.$('[data-test-publish-flow="complete"]').isExisting();
  expect(element).to.equal(true);
});

Then('I click in back to editor', async function() {
  let button = await this.driver.$('[data-test-button="back-to-editor"]');
  return await button.click();
});

Then('I go back to posts', async function() {
  let button = await this.driver.$('[data-test-link="posts"]');
  return await button.click();
});

// New tag workflow

Then("I click list tags", async function () {
  let element = await this.driver.$("#ember29");
  return await element.click();
});

Then("I click in new tag", async function () {
  let element = await this.driver.$(".gh-btn-primary");
  return await element.click();
});

Then('I write the title {string} of the tag', async function(title) {
  let element = await this.driver.$("#tag-name");
  return await element.setValue(title);
});

Then("I write the body {string} of the tag", async function (body) {
  let element = await this.driver.$("#tag-description");
  return await element.setValue(body);
});

Then('I click in publish my tag', async function() {
  let button = await this.driver.$("button.ember-view");
  return await button.click();
});

// New tag with metadata

Then("I click expand metadata", async function () {
  let element = await this.driver.$("button.gh-btn-expand");
  return await element.click();
});

Then("I write the metatitle {string} of the tag", async function (metatitle) {
  let element = await this.driver.$("#meta-title");
  return await element.setValue(metatitle);
});

Then("I write the metadrescription {string} of the tag", async function (metadescription) {
  let element = await this.driver.$("#meta-description");
  return await element.setValue(metadescription);
});
