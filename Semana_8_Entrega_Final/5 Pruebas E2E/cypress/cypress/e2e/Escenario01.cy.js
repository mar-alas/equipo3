import loginPage from './authentication';
import crearPost from './post';
const TWO_SECONDS = 2000;
describe('Escenario 1', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('Login con exito, creacion y validacion de un post, signout', () => {
    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    loginPage.fillPassword(Cypress.env("password"));
    loginPage.submitLoginForm();
    cy.url().should('include', '/dashboard');

    //When I create a new post called "hola" 
	  crearPost.crearPost("hola");
    cy.wait(TWO_SECONDS);

    //Then I should have the three post correcly
    crearPost.existePost("hola");
    cy.wait(TWO_SECONDS);

    // When I signout
    loginPage.signout();
    // Then I should be on the signin page
    cy.url().should('include', '/signin');
  });
});