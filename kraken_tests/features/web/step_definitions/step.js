const { Given, When, Then} = require('@cucumber/cucumber');
const expect = require('chai').expect;

const email_const="da.gamez97@gmail.com"
const password_const="pPb8c@Jw0c4RyK1i"
const url_base="http://localhost:2368/ghost"

When('I login to ghost', async function () {
  
  let element2 = await this.driver.$('#identification');
  await element2.setValue(email_const);

  let element3 = await this.driver.$('#password');
  await element3.setValue("pPb8c@Jw0c4RyK1i");
  
  let element4 = await this.driver.$('#ember5');
  return await element4.click();
});

//funcion que estando en el dashboard de ghost crea un nuevo post
When('I create a random post from dashboard with Title {string}', async function (title) {
  
  //click en new post
  let element1 = await this.driver.$('.ember-view.gh-secondary-action.gh-nav-new-post');
  await element1.click();
  
  //dar titulo al post
  let element2 = await this.driver.$('.gh-editor-title.ember-text-area.gh-input.ember-view');
  await element2.setValue(title);
  
  //se escribe el titulo del post
  let element3 = await this.driver.$('.kg-prose');
  await element3.setValue("BODY 1");
  
  //da click en publicar post
  let button4 = await this.driver.$('[data-test-button="publish-flow"]');
  await button4.click();
  
  //da click en continuar en el final review 
  let button5 = await this.driver.$('[data-test-button="continue"]');
  await button5.click();
  
  //da click en confirmacion
  let button6 = await this.driver.$('[data-test-button="confirm-publish"]');
  await button6.click();
  
  //vuelve al editor
  let button7 = await this.driver.$('[data-test-button="back-to-editor"]');
  await button7.click();
  
  //vuelve a los posts
  let link8 = await this.driver.$('[data-test-link="posts"]');
  const link8_href=await link8.getAttribute('href');
  await this.driver.url(url_base + "/" + link8_href); 
  
  //vuelve al dashboard
  let link9 = await this.driver.$('[data-test-nav="dashboard"]');
  const link9_href=await link9.getAttribute('href');
  return await this.driver.url(url_base + "/" + link9_href); 
  
});

//When I delete post with Title "Titulo 2"
When('I delete post with Title {string}', async function (title) {
  //navegamos a posts
  let link = await this.driver.$('[data-test-nav="posts"]');
  const link_href=await link.getAttribute('href');
  await this.driver.url(url_base + "/" + link_href);

  //wait for 2 seconds
  await this.driver.pause(2000);
  
  //seleccionamos los elementos [class="gh-content-entry-title"] cuyo contenido sea igual Titulo y damos click al pirmero
  const elements = await this.driver.$$('[class="gh-content-entry-title"]');

  let firstMatchingElement;

  for (const element of elements) {
    elementText = await element.getText();

    if (elementText === title) {
      //print to console elementText
      console.log("elementText " + elementText);

      firstMatchingElement = element;
      break; 
    }
  }

  firstMatchingElement.click();
  //wait for 5 seconds
  await this.driver.pause(5000);


  //damos click en opciones del post .settings-menu-toggle > span'
  let element2 = await this.driver.$('[class="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]');
  element2.click();

  //damos click en borrar .settings-menu-delete-button > .gh-btn > span
  let element3 = await this.driver.$('[class="gh-btn gh-btn-outline gh-btn-icon gh-btn-fullwidth"]');
  await element3.click();

  //confirmamos el borrado [class="gh-btn gh-btn-red gh-btn-icon ember-view"]
  let element4 = await this.driver.$('[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
  await element4.click();

});


//function Then I should not have post with title "Titulo 2"
Then('I should not have post with title {string}', async function (title) {
  //navegamos a los posts
  let link = await this.driver.$('[data-test-nav="posts"]');
  const link_href=await link.getAttribute('href');
  await this.driver.url(url_base + "/" + link_href);

  //wait for 2 seconds
  await this.driver.pause(2000);

  //seleccionamos los elementos [class="gh-content-entry-title"] cuyo contenido sea igual Titulo y damos click al pirmero
  const elements = await this.driver.$$('[class="gh-content-entry-title"]');

  let conteoElementos=0;

  for (const element of elements) {
    elementText = await element.getText();

    if (elementText === title) {
      //print to console elementText
      conteoElementos++;
    
    }
  }

  expect(conteoElementos).to.equal(0);

});



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


When('I go to posts', async function() {
  let link = await this.driver.$('[data-test-nav="posts"]');
  const link_href=await link.getAttribute('href');
  return await this.driver.url(url_base + "/" + link_href); 
  
});


Then(
  "I should have at least {int} post with title {string}",
  async function (number,title) {
    //navegamos a los posts
    let link = await this.driver.$('[data-test-nav="posts"]');
    const link_href=await link.getAttribute('href');
    await this.driver.url(url_base + "/" + link_href); 
    
    
    let titulos = await this.driver.$$('[class="gh-content-entry-title"]');
    //let titulos = await this.driver.$$('h3');

    console.log("titulos lenght " + titulos.length);

    // Create an array to store matching elements
    let matchingElements = [];

    // Iterate through the found h3 elements
    for (const titulo of titulos) {
      const text = await titulo.getText();
      console.log("titulo post: " + text);
      if (text === title) {
        matchingElements.push(titulo);
      }
    }
    // assert
    expect(matchingElements.length).to.be.greaterThanOrEqual(number);
  }
  
);
