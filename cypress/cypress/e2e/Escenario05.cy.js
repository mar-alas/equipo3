import loginPage from './authentication';
import crearPost from './post';

describe('Escenario 5', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('Creacion post programado, validar creacion programada, signout', () => {
    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    loginPage.fillPassword(Cypress.env("password"));
    loginPage.submitLoginForm();
    cy.url().should('include', '/dashboard');

    //When I create a new post called "hola" 
	  crearPost.crearPostProgramado("Post Programado", '2023-11-20');

    //Then I should have the three post correcly
    crearPost.existePost("Post Programado");

    // When I signout
    loginPage.signout();
    // Then I should be on the signin page
    cy.url().should('include', '/signin');
  });
});