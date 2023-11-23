//manual run: npx cypress run --spec "cypress/cypress/e2e/esc92.cy.js"

import loginPage from './authentication';
import crearPost from './post';
import useAprioriCrearPost from './posts_helper'
import useAleatorioCrearCorreo from './login_helper'


const NOMBRE_ESCENARIO = 'Escenario 92 -- Paso ';
const TWO_SECONDS = 2000;

describe('Escenario 92', () => {
  beforeEach(() => {
    loginPage.visit();
    //cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it('Login correcto, creacion y validacion de un post valido, creacion y validacion de un post invalido', () => {
    
    
    // Given I log in in ghost with correct credentiales
    loginPage.fillEmail(Cypress.env("username"));
    //cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword(Cypress.env("password"));
    //cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    cy.wait(TWO_SECONDS);
    //cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');

    cy.url().should('include', '/dashboard');
    //cy.screenshot(NOMBRE_ESCENARIO + '4_includeDashboard');

    //When I create a new post using aleatorio with a large title
    cy.useAleatorioCrearPostLongitudN(100).then((formattedPost) => {
      crearPost.crearPost(formattedPost.title, formattedPost.body);
      cy.wait(TWO_SECONDS);
      //cy.screenshot(NOMBRE_ESCENARIO + '5_crearPost');

      //Then I should have the three post correcly
      crearPost.existePost(formattedPost.title);
      cy.wait(TWO_SECONDS);
      //cy.screenshot(NOMBRE_ESCENARIO + '6_existePost');
    });

    // When I signout
    loginPage.signout();
    cy.wait(TWO_SECONDS);
    //cy.screenshot(NOMBRE_ESCENARIO + '7_signout');
    
    // Then I should be on the signin page
    cy.url().should('include', '/signin');
    //cy.screenshot(NOMBRE_ESCENARIO + '8_includeSignin');
  });
});