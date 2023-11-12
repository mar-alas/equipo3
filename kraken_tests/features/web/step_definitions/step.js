const { Given, When, Then} = require('@cucumber/cucumber');
const expect = require('chai').expect;
const fs = require("fs");

let credentials = JSON.parse(fs.readFileSync("./properties.json", "utf8"));
const email_const = credentials.USERNAME;
const password_const = credentials.PASSWORD;
const url_base = credentials.URLBASE;

When('I login to ghost', async function () {
  
  let element2 = await this.driver.$('#identification');
  await element2.setValue(email_const);

  let element3 = await this.driver.$('#password');
  await element3.setValue(password_const);
  
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

  await this.driver.pause(2000);
  
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

//function Then I should  have post with title "Titulo 2"
Then('I should have post with title {string}', async function (title) {
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
  //expect to be greater than 0
  expect(conteoElementos).to.be.greaterThan(0);
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

When('I click signout', async function () {
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

When('I create a new post called {string} with {string} information', async function(title, body) {
  let element1 = await this.driver.$('.ember-view.gh-secondary-action.gh-nav-new-post');
  await element1.click();

  element2 = await this.driver.$('.gh-editor-title.ember-text-area.gh-input.ember-view');
  await element2.setValue(title);

  element3 = await this.driver.$('.kg-prose');
  await element3.setValue(body);

  let button = await this.driver.$('[data-test-button="publish-flow"]');
  return await button.click();
});

When('I schedule the post to {string}', async function(date) {
  let element1 = await this.driver.$('.gh-publish-setting.last');
  await element1.click();
  
  console.log("Click on the 'Schedule' button");
  
  let element5 = await this.driver.$('.gh-publish-schedule');
  await element5.waitForExist();
  await element5.click();
  
  let dateInput = await this.driver.$('.gh-date-time-picker-date input');
  return await dateInput.setValue(date);
});

When('I finish the publication of my scheduled post', async function() {
  let continue_review = await this.driver.$('[data-test-button="continue"]');
  await continue_review.click();

  let confirm_publish = await this.driver.$('[data-test-button="confirm-publish"]');
  await confirm_publish.click();

  let close_pubish_flow = await this.driver.$('[data-test-button="close-publish-flow"]');
  await close_pubish_flow.click();

  const postsLink = await this.driver.$('.ember-view.gh-btn-editor.gh-editor-back-button');
  await postsLink.click();

  //vuelve a los posts
  let link8 = await this.driver.$('[data-test-link="posts"]');
  const link8_href=await link8.getAttribute('href');
  await this.driver.url(url_base + "/" + link8_href); 
  //vuelve al dashboard
  let link9 = await this.driver.$('[data-test-nav="dashboard"]');
  const link9_href=await link9.getAttribute('href');
  return await this.driver.url(url_base + "/" + link9_href); 
});

When('I finish the publication of my post', async function() {
  let continue_review = await this.driver.$('[data-test-button="continue"]');
  await continue_review.click();

  let confirm_publish = await this.driver.$('[data-test-button="confirm-publish"]');
  await confirm_publish.click();

  await this.driver.pause(2000);
  let boom_message = await this.driver.$('[data-test-publish-flow="complete"]').isExisting();
  expect(boom_message).to.equal(true);

  let back_to_editor = await this.driver.$('[data-test-button="back-to-editor"]');
  await back_to_editor.click();
  
  //vuelve a los posts
  let link8 = await this.driver.$('[data-test-link="posts"]');
  const link8_href=await link8.getAttribute('href');
  await this.driver.url(url_base + "/" + link8_href); 
  
  //vuelve al dashboard
  let link9 = await this.driver.$('[data-test-nav="dashboard"]');
  const link9_href=await link9.getAttribute('href');
  return await this.driver.url(url_base + "/" + link9_href); 
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

// tags
When("I click list tags", async function () {
  let link = await this.driver.$('[data-test-nav="tags"]');
  const link_href = await link.getAttribute("href");
  return await this.driver.url(url_base + "/" + link_href);
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

Then("I should have at least 1 tag with title {string}", async function (title) {

  let link = await this.driver.$('[data-test-nav="tags"]');
  const link_href = await link.getAttribute("href");
  await this.driver.url(url_base + "/" + link_href);

  let titulos = await this.driver.$$(".gh-tag-list-name");
  let matchingElements = [];

  for (const titulo of titulos) {
    const text = await titulo.getText();
    if (text === title) {
      matchingElements.push(titulo);
    }
  }

  expect(matchingElements.length).to.be.greaterThanOrEqual(1);
});

When("I create a random tag from dashboard with Title {string}", async function (title) {
  let link8 = await this.driver.$('[data-test-nav="tags"]');
  const link8_href = await link8.getAttribute("href");
  await this.driver.url(url_base + "/" + link8_href);

  await this.driver.pause(2000);

  let btnNewTag = await this.driver.$(".gh-btn-primary");
  await btnNewTag.click();

  let titleTag = await this.driver.$("#tag-name");
  await titleTag.setValue(title);

  let DescTag = await this.driver.$("#tag-description");
  await DescTag.setValue("Info del tag");

  let publicarTag = await this.driver.$("button.ember-view");
  await publicarTag.click();

  let link9 = await this.driver.$('[data-test-nav="dashboard"]');
  const link9_href = await link9.getAttribute("href");
  return await this.driver.url(url_base + "/" + link9_href);
});

// Tag metadata

Then("I click expand metadata", async function () {
  let element = await this.driver.$("button.gh-btn-expand");
  return await element.click();
});

Then("I click expand xcard", async function () {
  let elements = await this.driver.$$("button.gh-btn-expand");
  let segundoBoton = elements[1];
  return await segundoBoton.click();
});

Then("I click expand facebookcard", async function () {
  let elements = await this.driver.$$("button.gh-btn-expand");
  let segundoBoton = elements[2];
  return await segundoBoton.click();
});

Then("I write the metatitle {string} of the tag", async function (metatitle) {
  let element = await this.driver.$("#meta-title");
  return await element.setValue(metatitle);
});

Then("I write the twitterTitle {string} of the tag", async function (twitterTitle) {
  let element = await this.driver.$("#twitter-title");
  return await element.setValue(twitterTitle);
});

Then("I write the og-title {string} of the tag", async function (ogtitle) {
  let element = await this.driver.$("#og-title");
  return await element.setValue(ogtitle);
});

Then("I write the metadrescription {string} of the tag", async function (metadescription) {
  let element = await this.driver.$("#meta-description");
  return await element.setValue(metadescription);
});

Then("I write the twitterDescription {string} of the tag", async function (twitterDescription) {
  let element = await this.driver.$("#twitter-description");
  return await element.setValue(twitterDescription);
});

Then("I write the og-description {string} of the tag", async function (ogdescription) {
  let element = await this.driver.$("#og-description");
  return await element.setValue(ogdescription);
});

//Busqueda de un tag por titulo"
When('I edit tag with Title {string}', async function (title) {

  let link = await this.driver.$('[data-test-nav="tags"]');
  const link_href=await link.getAttribute('href');
  await this.driver.url(url_base + "/" + link_href);

  await this.driver.pause(2000);
  const elements = await this.driver.$$(".gh-tag-list-name");
  let firstMatchingElement;

  for (const element of elements) {
    elementText = await element.getText();

    if (elementText === title) {
      firstMatchingElement = element;
      break; 
    }
  }

  firstMatchingElement.click();
  await this.driver.pause(3000);

});

When("I delete tag with Title {string}", async function (title) {
  let link = await this.driver.$('[data-test-nav="tags"]');
  const link_href = await link.getAttribute("href");
  await this.driver.url(url_base + "/" + link_href);

  await this.driver.pause(2000);

  const elements = await this.driver.$$(".gh-tag-list-name");
  let firstMatchingElement;

  for (const element of elements) {
    elementText = await element.getText();

    if (elementText === title) {
      firstMatchingElement = element;
      break;
    }
  }

  firstMatchingElement.click();
  await this.driver.pause(3000);

  let btnBorrar = await this.driver.$('[data-test-button="delete-tag"]');
  await btnBorrar.click();
  await this.driver.pause(3000);
  let btnconfirmar = await this.driver.$('[data-test-button="confirm"]');
  await btnconfirmar.click();
});

