import loginPage from './authentication';
import crearPost from './post';
import useAprioriCrearPost from './posts_helper'

const NOMBRE_ESCENARIO = 'Escenario 102 -- Paso ';
const TWO_SECONDS = 2000;

describe('Escenario 102', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      // we expect a 3rd party library error with message 'list not defined'
      // and don't want to fail the test so we return false
      if (err.message.includes("Cannot read properties of null (reading 'firstChild')")) {
        return false
      }
      // we still want to ensure there are no other unexpected
      // errors, so we let them fail the test
    })
    loginPage.visit();
    //cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it('Login con exito, creacion y validacion de un post con contenido HTML, signout', () => {
    loginPage.fillEmail(Cypress.env("username"));
    //cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword(Cypress.env("password"));
    //cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    cy.wait(TWO_SECONDS);
    //cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');

    cy.url().should('include', '/dashboard');
    //cy.screenshot(NOMBRE_ESCENARIO + '4_includeDashboard');

    // Retrieve video data within the Cypress command chain
    cy.readFile('./cypress/data/youtube_videos.json').then((videosData) => {
      const randomIndex = Math.floor(Math.random() * videosData.length);
      const randomVideo = videosData[randomIndex];

      const link_prueba = randomVideo.url;

      cy.useAprioriCrearPost().then((formattedPost) => {
        crearPost.crearPostContenidoYoutube(formattedPost.title, link_prueba, formattedPost.body,5);
        cy.wait(TWO_SECONDS);
        // Other test steps within the .then() block for proper chaining

        // Assertions related to post creation or validations
        crearPost.existePost(formattedPost.title);
        // Other assertions or test steps within this chain

        loginPage.signout();
        cy.wait(TWO_SECONDS);
        cy.url().should('include', '/signin');
      });
    });
  });
});
