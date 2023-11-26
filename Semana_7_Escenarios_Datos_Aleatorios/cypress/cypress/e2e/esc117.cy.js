//corrrer localmente: npx cypress run --spec "cypress/e2e/esc113.cy.js"
import loginPage from './authentication';
import crearPost from './post';
import useAprioriCrearPost from './posts_helper'

const NOMBRE_ESCENARIO = 'Escenario 117 -- Paso ';
const TWO_SECONDS = 2000;

describe('Escenario 117', () => {
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

  it('Login con exito, creacion y validacion de un post con contenido spotify esperando 5 seg antes publicar', () => {
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
    cy.readFile('./cypress/data/spotify_urls.json').then((Data) => {
      const randomIndex = Math.floor(Math.random() * Data.length);
      const randomData = Data[randomIndex];

      const link_prueba = randomData.url;

      
      cy.useAprioriCrearPost().then((formattedPost) => {
        //se publica el video esperando 5 segundos
        crearPost.crearPostContenidoSpotify(formattedPost.title, link_prueba, formattedPost.body,5);
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
