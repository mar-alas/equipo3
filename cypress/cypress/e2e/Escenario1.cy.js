import loginPage from './authentication';
import crearPost from './post';

describe('Escenario 1', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('Login con exito, creacion y validacion de un post, signout', () => {
    // Given I log in in ghost
    loginPage.fillEmail("user@example.com");
    loginPage.fillPassword("dzLY3PdWLWj:");
    loginPage.submitLoginForm();
    cy.url().should('include', '/dashboard');

    //When I create a new post called "hola" 
	  crearPost.crearPost("hola");

    //Then I should have the three post correcly
    crearPost.existePost("hola");

    // When I signout
    loginPage.signout();
    // Then I should be on the signin page
    cy.url().should('include', '/signin');
  });
});