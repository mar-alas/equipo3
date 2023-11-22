const { promisify } = require('util');
const { Given, When, Then} = require('@cucumber/cucumber');
const expect = require('chai').expect;
const fs = require("fs");
// const { format } = require('date-fns');
const path = require('path');
const { fail } = require('assert');
const writeFile = promisify(fs.writeFile);

//  importar de posts_helper
const { use_apriori_crear_post, use_aleatorio_crear_post, use_polidinamico_crear_post } = require('./posts_helper.js');

//  importar de login_helper
const { use_apriori_correo, use_aleatorio_correo, use_polidinamico_email_pass } = require('./login_helper.js');

//  importar de tags_helper
const { use_apriori_crear_tag, use_aleatorio_crear_tag, use_polidinamico_crear_tag } = require('./tags_helper.js');


let credentials = JSON.parse(fs.readFileSync("./properties.json", "utf8"));
const email_const = credentials.USERNAME;
const password_const = credentials.PASSWORD;
const url_base = credentials.URLBASE;
numero_paso = 1
habilitar_screenshots = false

// vairable global para cuando se crean posts, una lista con los posts que se crearon
// este es el formato esperado
//posts = [{title:"titulo", body:"body"}];
let posts = [];
let login_info = [];
let tags = [];

// dicts para ver cual estrategia llamar
const estrategias_crear_post = {
    'a-priori': use_apriori_crear_post,
    'aleatorio': use_aleatorio_crear_post,
    'poli-dinamico': use_polidinamico_crear_post,
};

const estrategias_login = {
    'a-priori': use_apriori_correo,
    'aleatorio': use_aleatorio_correo,
    'poli-dinamico': use_polidinamico_email_pass,
};

const estrategias_tags = {
    'a-priori': use_apriori_crear_tag,
    'aleatorio': use_aleatorio_crear_tag,
    'poli-dinamico': use_polidinamico_crear_tag,
};


// Funcion para tomar el screenshot
async function takeScreenshot(driver, description) {
    if (habilitar_screenshots){
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
}

Given('I navigate to ghost', async function () {
    await this.driver.url(url_base);
    await takeScreenshot(this.driver, 'navegar a ghost');
});

//when i delete content
Given('I delete all content from ghost', async function () {

    //hacemos login
    let element2 = await this.driver.$('#identification');
    await element2.setValue(email_const);
    
    let element3 = await this.driver.$('#password');
    await element3.setValue(password_const);
    
    let element4 = await this.driver.$('#ember5');
    await element4.click();
    await this.driver.pause(3000);
    
    // navegamos al dashboard
    let link = await this.driver.$('[href="#/dashboard/"]');
    const link_href=await link.getAttribute('href');
    await this.driver.url(url_base + "/" + link_href); 

    //vamos a settings
    await this.driver.$('[href="#/settings/"]').click();
    await this.driver.pause(1000);

    //vamos a labs
    await this.driver.$('button=Open').click();
    await this.driver.pause(1000);

    //damos click en borrar
    await this.driver.$('button=Delete').click();
    await this.driver.pause(2000);

    //damos click en borrar en la ventana emergente
    // await this.driver.$('button=Delete').click();
    // await this.driver.pause(10000);
    const deleteButton = await this.driver.$('div.p-8 div:nth-child(2) button.bg-red');
    await deleteButton.click();
    await this.driver.pause(1000);

    //navegamos al dashboard
    await this.driver.url(url_base + "/" + link_href); 

    //hacemos logout
    let dropdown = await this.driver.$('.w3.mr1.fill-darkgrey');
    await dropdown.click();
    let signOutLink = await this.driver.$('.dropdown-item.user-menu-signout');
    await signOutLink.waitForClickable({
        timeout: 10000,
        timeoutMsg: 'Sign out link is not clickable after waiting.',
    });
    
    await signOutLink.click();
    });

When('I login to ghost', async function () {

    let element2 = await this.driver.$('#identification');
    await element2.setValue(email_const);
    
    let element3 = await this.driver.$('#password');
    await element3.setValue(password_const);
    
    let element4 = await this.driver.$('#ember5');
    await takeScreenshot(this.driver, 'escribir credenciales');
    return await element4.click();
    
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
    let link = await this.driver.$('[data-test-nav="posts"]');
    const link_href=await link.getAttribute('href');
    await this.driver.url(url_base + "/" + link_href);
    await takeScreenshot(this.driver, 'ir a los posts');
    });

When('I create a new post using {string}', async function(estrategia) {
    let element1 = await this.driver.$('.ember-view.gh-secondary-action.gh-nav-new-post');
    await element1.click();
    await takeScreenshot(this.driver, 'click en nuevo post');
    
    // llamar a la funcion dependiendo de la estrategia
    console.log("estrategia " + estrategia);
    formattedPost = await estrategias_crear_post[estrategia](posts);
    console.log("estrategia -> es " + formattedPost);
    console.log("titulo -> es " + formattedPost.title);

    element2 = await this.driver.$('.gh-editor-title.ember-text-area.gh-input.ember-view');
    await element2.setValue(formattedPost.title);
    
    element3 = await this.driver.$('.kg-prose');
    await element3.setValue(formattedPost.body);
    await takeScreenshot(this.driver, 'agregar titulo y body');
    
    let button = await this.driver.$('[data-test-button="publish-flow"]');
    await button.click();
    await takeScreenshot(this.driver, 'click en publicar');
});

Then("I should have the post number {int} with the created title",
    async function (number) {
      // title
      let title = posts[number-1]["title"]

      //navegamos a los posts
      let link = await this.driver.$('[data-test-nav="posts"]');
      const link_href=await link.getAttribute('href');
      await this.driver.url(url_base + "/" + link_href); 
      await takeScreenshot(this.driver, 'ver los posts');    
      
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

When('I schedule the {int} post for the future', async function(number) {
    let element1 = await this.driver.$('.gh-publish-setting.last');
    await element1.click();
    await takeScreenshot(this.driver, 'click en publicar');
    
    console.log("Click on the 'Schedule' button");
    await takeScreenshot(this.driver, 'click en programar');
    
    let element5 = await this.driver.$('.gh-publish-schedule');
    await element5.waitForExist();
    await element5.click();
    date = posts[number-1]["date"]
    date = date.replace(/\//g, '-');
    let dateInput = await this.driver.$('.gh-date-time-picker-date input');
    await dateInput.setValue(date);
    await takeScreenshot(this.driver, 'agregar una fecha');
  });

  When('I finish the publication of my scheduled post', async function() {
    let continue_review = await this.driver.$('[data-test-button="continue"]');
    await continue_review.click();
    await takeScreenshot(this.driver, 'continuar a revision');
    await this.driver.pause(1000);

    let confirm_publish = await this.driver.$('[data-test-button="confirm-publish"]');
    await confirm_publish.click();
    await takeScreenshot(this.driver, 'confirmar publicacion');
    await this.driver.pause(2000);
  
    let close_pubish_flow = await this.driver.$('[data-test-button="close-publish-flow"]');
    await close_pubish_flow.click();
    await takeScreenshot(this.driver, 'cerrar la publicacion');
    await this.driver.pause(2000);
  
    const postsLink = await this.driver.$('.ember-view.gh-btn-editor.gh-editor-back-button');
    await postsLink.click();
    await takeScreenshot(this.driver, 'ir a ediar');
    await this.driver.pause(3000);

    let link9 = await this.driver.$('[data-test-nav="dashboard"]');
    const link9_href=await link9.getAttribute('href');
    await this.driver.url(url_base + "/" + link9_href);
    await takeScreenshot(this.driver, 'ir al dashboard');
  });
  

When('I click login', async function () {
    let element = await this.driver.$('button[type="submit"]');
    await element.click();
    await takeScreenshot(this.driver, 'click en login');
  });

When('I enter email using {string}', async function (estrategia) {
    formattedLogin = await estrategias_login[estrategia](login_info);
    email = formattedLogin.email
    console.log("email " + email)
    let element = await this.driver.$('#identification');
    await element.setValue(email);
    await takeScreenshot(this.driver, 'agregar usuario');
});

When('I enter registered email', async function () {
    let element = await this.driver.$('#identification');
    await element.setValue(email_const);
    await takeScreenshot(this.driver, 'agregar usuario registrado');
  });

When('I enter a password for my {int} email', async function (number) {
    password = login_info[number-1].password
    console.log("password a entrar es " + password)
    let element = await this.driver.$('#password');
    await element.setValue(password);
    await takeScreenshot(this.driver, 'agregar contraseña');
});

When('I enter registered password', async function () {
    let element = await this.driver.$('#password');
    await element.setValue(password_const);
    await takeScreenshot(this.driver, 'agregar contrasena registrada');
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

// TAGS
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


Then('I write the title of the tag using {string}', async function(estrategia) {
    formattedTag = await estrategias_tags[estrategia](tags);
    let element = await this.driver.$("#tag-name");
    await element.setValue(formattedTag.name);
    await takeScreenshot(this.driver, 'escribir el titulo del tag');
  });
  
Then("I write the body of my {int} tag", async function (number) {
    let body = tags[number-1]["body"]
    let element = await this.driver.$("#tag-description");
    await element.setValue(body);
    await takeScreenshot(this.driver, 'escribir el body del tag');
  });
  
Then('I click in publish my tag', async function() {
    let button = await this.driver.$("button.ember-view");
    await button.click();
    await takeScreenshot(this.driver, 'publicar tag');
  });
  
Then("I should have {int} tag with title created", async function (number) {
    title = tags[number-1]["name"]
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
  