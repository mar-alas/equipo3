import loginPage from './authentication';
import crearPost from './post';

const NOMBRE_ESCENARIO = 'Escenario 1 -- Paso ';
const TWO_SECONDS = 20000;

describe('Escenario 1', () => {
  loginPage.setStrategy('pool');
  
  beforeEach(() => {
    loginPage.visit();
    cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it('Login con exito, creacion y validacion de un post, signout', () => {
    // Given I log in in ghost
    loginPage.fillEmail();
    cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword();
    cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    cy.wait(TWO_SECONDS);
    cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');

    cy.url().should('include', '/dashboard');
    cy.screenshot(NOMBRE_ESCENARIO + '4_includeDashboard');

    //When I create a new post called "hola" 
	  crearPost.crearPost("hola");
    cy.wait(TWO_SECONDS);
    cy.screenshot(NOMBRE_ESCENARIO + '5_crearPost');

    //Then I should have the three post correcly
    crearPost.existePost("hola");
    cy.wait(TWO_SECONDS);
    cy.screenshot(NOMBRE_ESCENARIO + '6_existePost');

    // When I signout
    loginPage.signout();
    cy.wait(TWO_SECONDS);
    cy.screenshot(NOMBRE_ESCENARIO + '7_signout');
    
    // Then I should be on the signin page
    cy.url().should('include', '/signin');
    cy.screenshot(NOMBRE_ESCENARIO + '8_includeSignin');
  });
});