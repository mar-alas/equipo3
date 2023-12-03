import loginPage from './authentication';
import crearPost from './post';
import crearTags from './tag';
const TWO_SECONDS = 2000;
describe('Escenario 4', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it(' Hacer login , crear post, crear tag,  validar post, validar tag', () => {
    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    loginPage.fillPassword(Cypress.env("password"));
    loginPage.submitLoginForm();
    cy.wait(TWO_SECONDS);
    cy.url().should('include', '/dashboard');

    //When I create a new post called "hola" 
	  crearPost.crearPost("Posts & Tags");

    //Then I should have the three post correcly
    crearPost.existePost("Posts & Tag");

    crearTags.crearTag('post&Tag', 'Post & Tag')
    cy.wait(TWO_SECONDS);
    crearTags.validarTag('post&Tag')

    // When I signout
    loginPage.signout();
    // Then I should be on the signin page
    cy.url().should('include', '/signin');
  });
});