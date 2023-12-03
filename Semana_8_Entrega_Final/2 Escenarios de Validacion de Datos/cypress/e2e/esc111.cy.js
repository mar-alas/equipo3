import loginPage from './authentication';
import crearPost from './post';
import useAprioriCrearPost from './posts_helper'

const NOMBRE_ESCENARIO = 'Escenario 111 -- Paso ';
const TWO_SECONDS = 2000;

describe('Escenario 111', () => {
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

  it('Login con exito, creacion y validacion de un post con contenido X/Twitter', () => {
    loginPage.fillEmail(Cypress.env("username"));
    //cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword(Cypress.env("password"));
    //cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    cy.wait(TWO_SECONDS);
    //cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');

    //borrar datos ghost
    cy.borrarDatosGhostV2()
    cy.wait(TWO_SECONDS);
    
    cy.url().should('include', '/dashboard');
    //cy.screenshot(NOMBRE_ESCENARIO + '4_includeDashboard');

    // Retrieve video data within the Cypress command chain
    cy.readFile('./cypress/data/x_urls.json').then((Data) => {
      const randomIndex = Math.floor(Math.random() * Data.length);
      const randomData = Data[randomIndex];

      const link_prueba = randomData.url;

      
      cy.useAprioriCrearPost().then((formattedPost) => {
        //se publica el video esperando 5 segundos
        crearPost.crearPostContenidoXTwiter(formattedPost.title, link_prueba, formattedPost.body,5);
        crearPost.publicarPost();
        cy.wait(TWO_SECONDS);
        // Other test steps within the .then() block for proper chaining

        // Assertions related to post creation or validations
        crearPost.existePost(formattedPost.title);
        // Other assertions or test steps within this chain
        crearPost.revisarContenidoPostConVideo(formattedPost.title)
        
      });
    });
  });
});
