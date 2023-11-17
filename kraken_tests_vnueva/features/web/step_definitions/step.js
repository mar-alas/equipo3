const { promisify } = require('util');
const { Given, When, Then} = require('@cucumber/cucumber');
const expect = require('chai').expect;
const fs = require("fs");
const { format } = require('date-fns');
const path = require('path');
const writeFile = promisify(fs.writeFile);

let credentials = JSON.parse(fs.readFileSync("./properties.json", "utf8"));
const email_const = credentials.USERNAME;
const password_const = credentials.PASSWORD;
const url_base = credentials.URLBASE;
numero_paso = 1

// Funcion para tomar el screenshot
async function takeScreenshot(driver, description) {
  const screenshot = await driver.takeScreenshot();
  const escenario = process.env.ESCENARIO || 'escenario';
  const filename = 'screenshots/' + escenario + '/paso' + numero_paso + '-' + description +'.png';
  numero_paso = numero_paso + 1
  const directory = path.dirname(filename);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  fs.writeFileSync(filename, screenshot, 'base64');
}

Given('I navigate to ghost', async function () {
  await this.driver.url(url_base);
  await takeScreenshot(this.driver, 'navegar a ghost');
});

When('I login to ghost', async function () {
  
  let element2 = await this.driver.$('[name="identification"]');
  await element2.setValue(email_const);

  let element3 = await this.driver.$('[name="password"]');
  await element3.setValue(password_const);
  
  let element4 = await this.driver.$('[class="login gh-btn gh-btn-login gh-btn-block gh-btn-icon js-login-button ember-view"]');
  await takeScreenshot(this.driver, 'escribir credenciales');
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
  
  //se escribe el body del post
  let element3 = await this.driver.$('[class="koenig-editor__editor __mobiledoc-editor __has-no-content"]');
  await this.driver.pause(1000);
  await element3.setValue("BODY 1");
  await this.driver.pause(1000);
  await takeScreenshot(this.driver, 'escribir titulo y body de post');
  
  //da click en publicar post
  let button4 = await this.driver.$('[class="gh-publishmenu ember-view"]');
  await button4.click();


  await this.driver.pause(2000);
  await takeScreenshot(this.driver, 'publicar el post');

  
  
  //da click en continuar en el final review 
  let button5 = await this.driver.$('[class="gh-btn gh-btn-black gh-publishmenu-button gh-btn-icon ember-view"]');
  await button5.click();
  await takeScreenshot(this.driver, 'continuar al final del review');
  
  //da click en confirmacion
  let button6 = await this.driver.$('[class="gh-btn gh-btn-black gh-btn-icon ember-view"]');
  await button6.click();
  await takeScreenshot(this.driver, 'click en confirmacion');
  
  //vuelve al editor
  //let button7 = await this.driver.$('[data-test-button="back-to-editor"]');
  //await button7.waitForDisplayed();
  //await button7.click();
  await takeScreenshot(this.driver, 'volver al editor');
  
    //vuelve a los posts
  let link8 = await this.driver.$('[class="ember-view gh-editor-back-button"]');
  const link8_href=await link8.getAttribute('href');
  await this.driver.url(url_base + "/" + link8_href); 
  await takeScreenshot(this.driver, 'volver a los posts');
  
    //vuelve al dashboard
  let link9 = await this.driver.$('[title="Dashboard"]');
  const link9_href=await link9.getAttribute('href');
  await this.driver.url(url_base + "/" + link9_href); 
  return await takeScreenshot(this.driver, 'volver al dashboard');
  
});

//When I delete post with Title "Titulo 2"
When('I delete post with Title {string}', async function (title) {
  //navegamos a posts dando click al boton de la izquierda que dice posts
  let link = await this.driver.$('[href="#/posts/"]');
  const link_href=await link.getAttribute('href');
  await this.driver.url(url_base + "/" + link_href);

  //wait for 2 seconds
  await this.driver.pause(2000);
  await takeScreenshot(this.driver, 'navegar a los posts');
  
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
  await takeScreenshot(this.driver, 'click en un elemento');


  //damos click en opciones del post .settings-menu-toggle > span'
  let element2 = await this.driver.$('[class="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]');
  element2.click();
  await takeScreenshot(this.driver, 'click en opciones del post');

  //damos click en borrar .settings-menu-delete-button > .gh-btn > span
  let element3 = await this.driver.$('[class="gh-btn gh-btn-hover-red gh-btn-icon settings-menu-delete-button"]');
  await element3.click();
  await takeScreenshot(this.driver, 'click en borrar post');

  //confirmamos el borrado [class="gh-btn gh-btn-red gh-btn-icon ember-view"]
  let element4 = await this.driver.$('[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
  await element4.click();
  await takeScreenshot(this.driver, 'confirmar el borrado');

});

//When I edit post with Title "Titulo 700" with the content "ContenidoEditado"
When('I edit post with Title {string} with the new title {string}', async function (title, content) {

//navegamos a posts
let link = await this.driver.$('[data-test-nav="posts"]');
const link_href=await link.getAttribute('href');
await this.driver.url(url_base + "/" + link_href);

//wait for 2 seconds
await this.driver.pause(2000);
await takeScreenshot(this.driver, 'navegar a posts');

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
//wait for 2 seconds
await this.driver.pause(2000);
await takeScreenshot(this.driver, 'escoger un elemento');

//editamos el contenido usamos identificador data-lexical-text="true"
// Find a specific `p` element or any other parent element
const element2 = await this.driver.$('[placeholder="Post title"]');
element2.setValue(content);

//wait for 3 seconds
await this.driver.pause(3000);
await takeScreenshot(this.driver, 'editar el elemento');


//damos click en actualizar data-test-button="publish-save"
let element3 = await this.driver.$('[data-test-button="publish-save"]');
await element3.click();
await takeScreenshot(this.driver, 'click en actualizar elemento');

//nos devolemos a posts
let link4 = await this.driver.$('[data-test-link="posts"]');
const link4_href=await link4.getAttribute('href');
await this.driver.url(url_base + "/" + link4_href);
await takeScreenshot(this.driver, 'volver a posts');

});  


//function Then I should not have post with title "Titulo 2"
Then('I should not have post with title {string}', async function (title) {
  //navegamos a los posts
  let link = await this.driver.$('[href="#/posts/"]');
  const link_href=await link.getAttribute('href');
  await this.driver.url(url_base + "/" + link_href);

  //wait for 2 seconds
  await this.driver.pause(2000);
  await takeScreenshot(this.driver, 'navegar a posts');

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

Then('I should not have page with title {string}', async function (title) {
  //navegamos a los posts
  let link = await this.driver.$('[href="#/pages/"]');
  const link_href=await link.getAttribute('href');
  await this.driver.url(url_base + "/" + link_href);

  //wait for 2 seconds
  await this.driver.pause(2000);
  await takeScreenshot(this.driver, 'navegar a pages');

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
  let link = await this.driver.$('[href="#/posts/"]');
  const link_href=await link.getAttribute('href');
  await this.driver.url(url_base + "/" + link_href);

  //wait for 2 seconds
  await this.driver.pause(2000);
  await takeScreenshot(this.driver, 'navegar a posts');

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

Then('I should have page with title {string}', async function (title) {
  //navegamos a las pages
  let link = await this.driver.$('[href="#/pages/"]');
  const link_href=await link.getAttribute('href');
  await this.driver.url(url_base + "/" + link_href);

  //wait for 2 seconds
  await this.driver.pause(2000);
  await takeScreenshot(this.driver, 'navegar a pages');

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
  await takeScreenshot(this.driver, 'ir al login');
});

When('I enter email {string}', async function (email) {
  let element = await this.driver.$('#identification');
  await element.setValue(email);
  await takeScreenshot(this.driver, 'agregar usuario');
});

When('I enter registered email', async function () {
  let element = await this.driver.$('#identification');
  await element.setValue(email_const);
  await takeScreenshot(this.driver, 'agregar usuario registrado');
});

When('I enter password {string}', async function (password) {
  let element = await this.driver.$('#password');
  await element.setValue(password);
  await takeScreenshot(this.driver, 'agregar contraseña');
});

When('I enter registered password', async function () {
  let element = await this.driver.$('#password');
  await element.setValue(password_const);
  await takeScreenshot(this.driver, 'agregar contrasena registrada');
});

When('I click login', async function () {
  let element = await this.driver.$('button[type="submit"]');
  await element.click();
  await takeScreenshot(this.driver, 'click en login');
});

When('I click forget', async function () {
  let element = await this.driver.$('#ember4');
  await element.click();
  await takeScreenshot(this.driver, 'click en forget');
});

Then('I should be on dashboard', async function () {
  // let element = await this.driver.$('.gh-canvas-title').isExisting();
  // expect(element).to.equal(true);
  const assert = require('assert');
  // Get the current URL
  const currentUrl = await this.driver.getUrl();
  // Expect the word 'dashboard' in the URL
  expect(currentUrl).to.include('dashboard');
  await takeScreenshot(this.driver, 'pagina dashboard');
});

Then('I should get an error {string}', async function(message) {
   let element = await this.driver.$('p.main-error');
   const errorText = await element.getText();
  //  console.log('Element text:', errorText);
   expect(errorText.trim()).to.equal(message);
   await takeScreenshot(this.driver, 'genera un error');
});

When('I click signout', async function () {
  let dropdown = await this.driver.$('.w3.mr1.fill-darkgrey');
  await dropdown.click();
  let signOutLink = await this.driver.$('.dropdown-item.user-menu-signout');
  await takeScreenshot(this.driver, 'buscar el boton de signout');
  await signOutLink.waitForClickable({
    timeout: 10000,
    timeoutMsg: 'Sign out link is not clickable after waiting.',
  });

  await signOutLink.click();
  await takeScreenshot(this.driver, 'click en signout');
});

Then('I should be in authentication page', async function () {
  let bodyElement = await this.driver.$('body');
  const classAttributeValue = await bodyElement.getAttribute('class');
  expect(classAttributeValue).to.include('ember-application unauthenticated-route');
  await takeScreenshot(this.driver, 'pagina de autenticacion');
});

// New post workflow

When('I create a new post called {string} with {string} information', async function(title, body) {
  let element1 = await this.driver.$('.ember-view.gh-secondary-action.gh-nav-new-post');
  await element1.click();
  await takeScreenshot(this.driver, 'click en nuevo post');

  element2 = await this.driver.$('.gh-editor-title.ember-text-area.gh-input.ember-view');
  await element2.setValue(title);

  element3 = await this.driver.$('[data-kg="editor"]');
  await element3.setValue(body);
  await takeScreenshot(this.driver, 'agregar titulo y body');

  let button = await this.driver.$('[class="gh-publishmenu ember-view"]');
  await button.click();
  await takeScreenshot(this.driver, 'click en publicar');

  //esperar 1 segundo
  await this.driver.pause(1000);
  
  let button2 = await this.driver.$('[class="gh-btn gh-btn-black gh-publishmenu-button gh-btn-icon ember-view"]');
  await button2.click();

  //esperar 1 segundo
  await this.driver.pause(1000);

  let button3 = await this.driver.$('[class="gh-btn gh-btn-black gh-btn-icon ember-view"]');
  await button3.click();


});

When('I schedule the post to {string}', async function(date) {
  let element1 = await this.driver.$('.gh-publish-setting.last');
  await element1.click();
  await takeScreenshot(this.driver, 'click en publicar');
  
  console.log("Click on the 'Schedule' button");
  await takeScreenshot(this.driver, 'click en programar');
  
  let element5 = await this.driver.$('.gh-publish-schedule');
  await element5.waitForExist();
  await element5.click();
  
  let dateInput = await this.driver.$('.gh-date-time-picker-date input');
  await dateInput.setValue(date);
  await takeScreenshot(this.driver, 'agregar una fecha');
});

When('I finish the publication of my scheduled post', async function() {
  let continue_review = await this.driver.$('[data-test-button="continue"]');
  await continue_review.click();
  await takeScreenshot(this.driver, 'continuar a revision');

  let confirm_publish = await this.driver.$('[data-test-button="confirm-publish"]');
  await confirm_publish.click();
  await takeScreenshot(this.driver, 'confirmar publicacion');

  let close_pubish_flow = await this.driver.$('[data-test-button="close-publish-flow"]');
  await close_pubish_flow.click();
  await takeScreenshot(this.driver, 'cerrar la publicacion');

  const postsLink = await this.driver.$('.ember-view.gh-btn-editor.gh-editor-back-button');
  await postsLink.click();
  await takeScreenshot(this.driver, 'ir a ediar');
  await this.driver.pause(2000);
  //vuelve a los posts
  // let link8 = await this.driver.$('[data-test-link="posts"]');
  // const link8_href=await link8.getAttribute('href');
  // await this.driver.url(url_base + "/" + link8_href); 
  // await takeScreenshot(this.driver, 'volver a los posts');
  //vuelve al dashboard
  let link9 = await this.driver.$('[data-test-nav="dashboard"]');
  const link9_href=await link9.getAttribute('href');
  await this.driver.url(url_base + "/" + link9_href);
  await takeScreenshot(this.driver, 'ir al dashboard');
});

When('I finish the publication of my post', async function() {
  let continue_review = await this.driver.$('[data-test-button="continue"]');
  await continue_review.click();
  await takeScreenshot(this.driver, 'continuar la publicacion');

  let confirm_publish = await this.driver.$('[data-test-button="confirm-publish"]');
  await confirm_publish.click();
  await takeScreenshot(this.driver, 'confirmar la publicacion');

  await this.driver.pause(2000);
  let boom_message = await this.driver.$('[data-test-publish-flow="complete"]').isExisting();
  expect(boom_message).to.equal(true);
  await takeScreenshot(this.driver, 'genera un mensaje');

  let back_to_editor = await this.driver.$('[data-test-button="back-to-editor"]');
  await back_to_editor.waitForDisplayed();
  await back_to_editor.click();
  await takeScreenshot(this.driver, 'volver al editor');
  
  //vuelve a los posts
  let link8 = await this.driver.$('[data-test-link="posts"]');
  const link8_href=await link8.getAttribute('href');
  await this.driver.url(url_base + "/" + link8_href);
  await takeScreenshot(this.driver, 'volver a los posts');
  
  //vuelve al dashboard
  let link9 = await this.driver.$('[data-test-nav="dashboard"]');
  const link9_href=await link9.getAttribute('href');
  await this.driver.url(url_base + "/" + link9_href);
  await takeScreenshot(this.driver, 'volver al dashboard');
});

When('I go to posts', async function() {
  //se da click en el boton de posts del menu de la izquierda
  let link = await this.driver.$('[href="#/posts/"]');
  const link_href=await link.getAttribute('href');
  await this.driver.url(url_base + "/" + link_href);
  await takeScreenshot(this.driver, 'ir a los posts');
});

When('I go to pages', async function() {
  let link = await this.driver.$('[data-test-nav="pages"]');
  const link_href=await link.getAttribute('href');
  await this.driver.url(url_base + "/" + link_href);
  await takeScreenshot(this.driver, 'ir a pages');
});

Then(
  "I should have at least {int} post with title {string}",
  async function (number,title) {
    //navegamos a los posts dando click en post en el menu de la izquierda
    let link = await this.driver.$('[href="#/posts/"]');
    const link_href=await link.getAttribute('href');
    await this.driver.url(url_base + "/" + link_href); 
    await takeScreenshot(this.driver, 'ver los posts');    
    
    // recorremos los h3 que contienen los titulos
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
  await this.driver.url(url_base + "/" + link_href);
  await takeScreenshot(this.driver, 'listar tags');
});

Then("I click in new tag", async function () {
  let element = await this.driver.$(".gh-btn-primary");
  await element.click();
  await takeScreenshot(this.driver, 'crear nuevo tag');
});

Then('I write the title {string} of the tag', async function(title) {
  let element = await this.driver.$("#tag-name");
  await element.setValue(title);
  await takeScreenshot(this.driver, 'escribir el titulo del tag');
});

Then("I write the body {string} of the tag", async function (body) {
  let element = await this.driver.$("#tag-description");
  await element.setValue(body);
  await takeScreenshot(this.driver, 'escribir el body del tag');
});

Then('I click in publish my tag', async function() {
  let button = await this.driver.$("button.ember-view");
  await button.click();
  await takeScreenshot(this.driver, 'publicar tag');
});

Then("I should have at least 1 tag with title {string}", async function (title) {

  let link = await this.driver.$('[data-test-nav="tags"]');
  const link_href = await link.getAttribute("href");
  this.driver.url(url_base + "/" + link_href);
  await takeScreenshot(this.driver, 'ver tags');

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
  await takeScreenshot(this.driver, 'ir a tags');

  let btnNewTag = await this.driver.$(".gh-btn-primary");
  await btnNewTag.click();
  await takeScreenshot(this.driver, 'crear un tag');

  let titleTag = await this.driver.$("#tag-name");
  await titleTag.setValue(title);

  let DescTag = await this.driver.$("#tag-description");
  await DescTag.setValue("Info del tag");
  await takeScreenshot(this.driver, 'agregar titulo y descripcion del tag');

  let publicarTag = await this.driver.$("button.ember-view");
  await publicarTag.click();
  await takeScreenshot(this.driver, 'publicar tag');

  let link9 = await this.driver.$('[data-test-nav="dashboard"]');
  const link9_href = await link9.getAttribute("href");
  await this.driver.url(url_base + "/" + link9_href);
  await takeScreenshot(this.driver, 'ir al dashboard');
});

// Tag metadata

Then("I click expand metadata", async function () {
  let element = await this.driver.$("button.gh-btn-expand");
  await element.click();
  await takeScreenshot(this.driver, 'expander metadata');
});

Then("I click expand xcard", async function () {
  let elements = await this.driver.$$("button.gh-btn-expand");
  let segundoBoton = elements[1];
  await segundoBoton.click();
  await takeScreenshot(this.driver, 'expander xcard');
});

Then("I click expand facebookcard", async function () {
  let elements = await this.driver.$$("button.gh-btn-expand");
  let segundoBoton = elements[2];
  await segundoBoton.click();
  await takeScreenshot(this.driver, 'expander facebookcard');
});

Then("I write the metatitle {string} of the tag", async function (metatitle) {
  let element = await this.driver.$("#meta-title");
  await element.setValue(metatitle);
  await takeScreenshot(this.driver, 'agregar meta-titulo al tag');
});

Then("I write the twitterTitle {string} of the tag", async function (twitterTitle) {
  let element = await this.driver.$("#twitter-title");
  await element.setValue(twitterTitle);
  await takeScreenshot(this.driver, 'agregar twitter-titulo al tag');
});

Then("I write the og-title {string} of the tag", async function (ogtitle) {
  let element = await this.driver.$("#og-title");
  await element.setValue(ogtitle);
  await takeScreenshot(this.driver, 'agregar og-titulo al tag');
});

Then("I write the metadrescription {string} of the tag", async function (metadescription) {
  let element = await this.driver.$("#meta-description");
  await element.setValue(metadescription);
  await takeScreenshot(this.driver, 'escribir la meta descripcion del tag');
});

Then("I write the twitterDescription {string} of the tag", async function (twitterDescription) {
  let element = await this.driver.$("#twitter-description");
  await element.setValue(twitterDescription);
  await takeScreenshot(this.driver, 'escribir la twiter descripcion del tag');
});

Then("I write the og-description {string} of the tag", async function (ogdescription) {
  let element = await this.driver.$("#og-description");
  await element.setValue(ogdescription);
  await takeScreenshot(this.driver, 'escribir la og descripcion del tag');
});

//Busqueda de un tag por titulo"
When('I edit tag with Title {string}', async function (title) {

  let link = await this.driver.$('[data-test-nav="tags"]');
  const link_href=await link.getAttribute('href');
  await this.driver.url(url_base + "/" + link_href);

  await this.driver.pause(2000);
  await takeScreenshot(this.driver, 'ir a los tags');
  const elements = await this.driver.$$(".gh-tag-list-name");
  let firstMatchingElement;

  for (const element of elements) {
    elementText = await element.getText();

    if (elementText === title) {
      firstMatchingElement = element;
      break; 
    }
  }
  await takeScreenshot(this.driver, 'seleccionar un tag');

  firstMatchingElement.click();
  await this.driver.pause(3000);
  await takeScreenshot(this.driver), 'click en el tag';

});

When("I delete tag with Title {string}", async function (title) {
  let link = await this.driver.$('[data-test-nav="tags"]');
  const link_href = await link.getAttribute("href");
  await this.driver.url(url_base + "/" + link_href);

  await this.driver.pause(2000);
  await takeScreenshot(this.driver, 'ir a los tags');

  const elements = await this.driver.$$(".gh-tag-list-name");
  let firstMatchingElement;

  for (const element of elements) {
    elementText = await element.getText();

    if (elementText === title) {
      firstMatchingElement = element;
      break;
    }
  }
  await takeScreenshot(this.driver, 'listar los tags');

  firstMatchingElement.click();
  await this.driver.pause(3000);
  await takeScreenshot(this.driver, 'seleccionar un tag');

  let btnBorrar = await this.driver.$('[data-test-button="delete-tag"]');
  await btnBorrar.click();
  await this.driver.pause(3000);
  await takeScreenshot(this.driver, 'borrar el tag');
  let btnconfirmar = await this.driver.$('[data-test-button="confirm"]');
  await btnconfirmar.click();
  await takeScreenshot(this.driver, 'confirmmar eliminacion del tag');
});


// pages
When("I create a random page from dashboard with Title {string}", async function (title) {
  //ir a las paginas haciendo click en el boton de la izquierda
  let link_pages1 = await this.driver.$('[href="#/pages/"]');
  const linkpages1_href = await link_pages1.getAttribute("href");
  await this.driver.url(url_base + "/" + linkpages1_href);

  await this.driver.pause(2000);
  await takeScreenshot(this.driver, 'ir a las paginas');

  //dar click en new page en la pagina de arriba
  let btnNewPage = await this.driver.$(".ember-view.gh-btn.gh-btn-primary.view-actions-top-row");
  await btnNewPage.click();
  await takeScreenshot(this.driver, 'crear una nueva pagina');

  //poner el titulo de la pagina
  let titlePage = await this.driver.$(".gh-editor-title.ember-text-area.gh-input.ember-view");
  await titlePage.setValue(title);

  //se escribe el body del page
  let element3 = await this.driver.$('[data-kg="editor"]');
  await element3.setValue("Contenido");
  await takeScreenshot(this.driver, 'agregarle titulo y body');
  
  //da click en publicar page
  let button4 = await this.driver.$('[class="gh-publishmenu ember-view"]');
  await button4.click();

  await this.driver.pause(2000);
  await takeScreenshot(this.driver, 'click en publicar la pagina');
  
  //da click en continuar en el final review 
  let button5 = await this.driver.$('[class="gh-btn gh-btn-black gh-publishmenu-button gh-btn-icon ember-view"]');
  await button5.click();
  await takeScreenshot(this.driver, 'continuar al review');
  
  //da click en confirmacion
  //let button6 = await this.driver.$('[data-test-button="confirm-publish"]');
  //await button6.click();
  await takeScreenshot(this.driver, 'confirmar la publicacion');
  
  await this.driver.pause(2000);
  //vuelve al editor
  //let button7 = await this.driver.$('[data-test-button="back-to-editor"]');
  //await button7.waitForDisplayed();
  //await button7.click();
  await takeScreenshot(this.driver, 'volver al editor');
  
    //vuelve a los pages
  let link8 = await this.driver.$('[href="#/pages/"]');
  const link8_href=await link8.getAttribute('href');
  await this.driver.url(url_base + "/" + link8_href);
  await takeScreenshot(this.driver, 'ir a las paginas');
  
    //vuelve al dashboard
  let link9 = await this.driver.$('[href="#/dashboard/"]');
  const link9_href=await link9.getAttribute('href');
  await this.driver.url(url_base + "/" + link9_href);
  await takeScreenshot(this.driver, 'ir al dashboard');
});



When('I edit page with Title {string} with the new title {string}', async function (title, content) {

  //navegamos a pages
  let link = await this.driver.$('[href="#/pages/"]');
  const link_href=await link.getAttribute('href');
  await this.driver.url(url_base + "/" + link_href);
  
  //wait for 2 seconds
  await this.driver.pause(2000);
  await takeScreenshot(this.driver, 'ir a las paginas');
  
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
  //wait for 2 seconds
  await this.driver.pause(2000);
  await takeScreenshot(this.driver, 'seleccionar una pagina');
  
  //editamos el contenido usamos identificador data-lexical-text="true"
  // Find a specific `p` element or any other parent element
  const element2 = await this.driver.$('[placeholder="Page title"]');
  element2.setValue(content);
  
  //wait for 3 seconds
  await this.driver.pause(3000);
  await takeScreenshot(this.driver, 'editar el contenido de la pagina');
  
  let element3 = await this.driver.$('[class="gh-publishmenu ember-view"]');
  await element3.click();
  await takeScreenshot(this.driver, 'publicar la pagina');

  //termina de dar click en publicar
  let element4 = await this.driver.$('[class="gh-btn gh-btn-black gh-publishmenu-button gh-btn-icon ember-view"]');
  await element4.click();
  

  


  //vuelve a las paginas
  let link8 = await this.driver.$('[href="#/pages/"]');
  const link8_href=await link8.getAttribute('href');
  await this.driver.url(url_base + "/" + link8_href);
  await takeScreenshot(this.driver, 'ir a los posts');

  //vuelve al dashboard
  let link9 = await this.driver.$('[href="#/dashboard/"]');
  const link9_href=await link9.getAttribute('href');
  await this.driver.url(url_base + "/" + link9_href);
  await takeScreenshot(this.driver, 'ir al dashboard');
  
  });  
  
  
  When('I delete page with Title {string}', async function (title) {
    //navegamos a posts
    let link = await this.driver.$('[href="#/pages/"]');
    const link_href=await link.getAttribute('href');
    await this.driver.url(url_base + "/" + link_href);
  
    //wait for 2 seconds
    await this.driver.pause(2000);
    await takeScreenshot(this.driver, 'ir a las paginas');
    
    //seleccionamos los elementos [class="gh-content-entry-title"] cuyo contenido sea igual Titulo y damos click al pirmero
    const elements = await this.driver.$$('[class="gh-content-entry-title"]');
  
    let firstMatchingElement;
  
    for (const element of elements) {
      elementText = await element.getText();
  
      if (elementText === title) {
        firstMatchingElement = element;
        break; 
      }
    }
  
    firstMatchingElement.click();
    //wait for 5 seconds
    await this.driver.pause(5000);
    await takeScreenshot(this.driver, 'seleccionar una pagina');
  
    //damos click en opciones del post .settings-menu-toggle > span'
    let element2 = await this.driver.$('[class="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]');
    element2.click();
    await takeScreenshot(this.driver, 'click en opciones del post');
  
    //damos click en borrar .settings-menu-delete-button > .gh-btn > span
    let element3 = await this.driver.$('[class="gh-btn gh-btn-hover-red gh-btn-icon settings-menu-delete-button"]');
    await element3.click();
    await takeScreenshot(this.driver, 'click en borrar');
  
    //confirmamos el borrado [class="gh-btn gh-btn-red gh-btn-icon ember-view"]
    let element4 = await this.driver.$('[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
    await element4.click();
    await takeScreenshot(this.driver, 'confirmar eliminacion');
  
  });


  Then(
    "I should have at least {int} pages with title {string}",
    async function (number,title) {
      //navegamos a los pages
      let link = await this.driver.$('[href="#/pages/"]');
      const link_href=await link.getAttribute('href');
      await this.driver.url(url_base + "/" + link_href); 
      
      //esperar 2 segundos
      await this.driver.pause(5000);
      await takeScreenshot(this.driver, 'listar paginas');

      let titulos = await this.driver.$$('[class="gh-content-entry-title"]');
      //let titulos = await this.driver.$$('h3');
      
      //print titulos to console
      console.log("titulos lenght " + titulos.length);

      // Create an array to store matching elements
      let matchingElements = [];
  
      // Iterate through the found h3 elements
      for (const titulo of titulos) {
        const text = await titulo.getText();
        if (text === title) {
          matchingElements.push(titulo);
        }
      }
      // assert
      expect(matchingElements.length).to.be.greaterThanOrEqual(number);
    }
    
  );