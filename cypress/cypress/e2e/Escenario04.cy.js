import loginPage from './authentication';
import crearPost from './post';
import crearTags from './tag';

const NOMBRE_ESCENARIO = 'Escenario 4 -- Paso ';

describe('Escenario 4', () => {
  beforeEach(() => {
    loginPage.visit();
    cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it(' Hacer login , crear post, crear tag,  validar post, validar tag', () => {
    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword(Cypress.env("password"));
    cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');
    
    cy.url().should('include', '/dashboard');
    cy.screenshot(NOMBRE_ESCENARIO + '4_shouldIncludeDashboard');

    //When I create a new post called "hola" 
	  crearPost.crearPost("Posts & Tags");
    cy.screenshot(NOMBRE_ESCENARIO + '5_crearPost');

    //Then I should have the three post correcly
    crearPost.existePost("Posts & Tag");
    cy.screenshot(NOMBRE_ESCENARIO + '6_existePost');

    crearTags.crearTag('post&Tag', 'Post & Tag')
    cy.screenshot(NOMBRE_ESCENARIO + '7_crearTag');

    crearTags.validarTag('post&Tag')
    cy.screenshot(NOMBRE_ESCENARIO + '8_validarTag');

    // When I signout
    loginPage.signout();
    cy.screenshot(NOMBRE_ESCENARIO + '9_Signout');

    // Then I should be on the signin page
    cy.url().should('include', '/signin');
    cy.screenshot(NOMBRE_ESCENARIO + '10_shouldIncludeSignin');
  });
});