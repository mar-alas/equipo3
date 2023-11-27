//manual run: npx cypress run --spec "cypress/cypress/e2e/esc91.cy.js"
import loginPage from './authentication';
import crearPost from './post';
import useAprioriCrearPost from './posts_helper'
import useAleatorioCrearCorreo from './login_helper'


const NOMBRE_ESCENARIO = 'Escenario 91 -- Paso ';
const TWO_SECONDS = 2000;

describe('Escenario 91', () => {
  beforeEach(() => {
    loginPage.visit();
    //cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it('Login usuario incorrecto, login credenciales correctas, creacion y validacion de un post, signout', () => {
    
    //Given I try to login with incorrect username but correct password
    //log cy.useAleatorioCrearCorreo().email
    cy.useAleatorioCrearCorreo().then((formattedEmail) => {
      // When I enter email using aleatorio
      // & I enter password using aleatorio
      loginPage.fillEmail(formattedEmail.email);
      //cy.screenshot(NOMBRE_ESCENARIO + '3_fillEmail');

      loginPage.fillPassword(Cypress.env("password"));
      //cy.screenshot(NOMBRE_ESCENARIO + '4_fillPassword');

      loginPage.submitLoginForm();
      cy.wait(TWO_SECONDS);

      

      //cy.screenshot(NOMBRE_ESCENARIO + '5_submitLoginForm');

      // Then I should get an error 'There is no user with that email address.'
      loginPage.error(/There is no user with that email address\.|Too many login attempts(.*)|Too many attempts(.*)/)
      //cy.screenshot(NOMBRE_ESCENARIO + '6_error');
    });


    //cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');
    
    // Given I log in in ghost with correct credentiales
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

    //When I create a new post using "a-priori"
    cy.useAprioriCrearPost().then((formattedPost) => {
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