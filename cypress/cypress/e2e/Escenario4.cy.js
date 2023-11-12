import loginPage from './authentication';
import crearPost from './post';
import crearTags from './tag';

describe('Escenario 4', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it(' Hacer login , crear post, crear tag,  validar post, validar tag', () => {
    // Given I log in in ghost
    loginPage.fillEmail("user@example.com");
    loginPage.fillPassword("dzLY3PdWLWj:");
    loginPage.submitLoginForm();
    cy.url().should('include', '/dashboard');

    //When I create a new post called "hola" 
	  crearPost.crearPost("Posts & Tags");

    //Then I should have the three post correcly
    crearPost.existePost("Posts & Tag");

    crearTags.crearTag('post&Tag', 'Post & Tag')
    crearTags.validarTag('post&Tag')

    // When I signout
    loginPage.signout();
    // Then I should be on the signin page
    cy.url().should('include', '/signin');
  });
});