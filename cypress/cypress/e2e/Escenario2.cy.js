import loginPage from './authentication';
//import properties

//const config= require('./config.json');
//import loginPage from './config.json';

//const EMAIL= "da.gamez97@gmail.com";
//const PASSWORD= "pPb8c@Jw0c4RyK1i";

describe('Funcionalidad de autenticacion', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('Login con exito', () => {
    // Given my email and my password
    loginPage.fillEmail("user@example.com");
    loginPage.fillPassword("dzLY3PdWLWj:");
    
    // When I click in login
    loginPage.submitLoginForm();

    // Then I should be on dashboard
    cy.url().should('include', '/dashboard');

    // And I logout
    loginPage.signout();

    // Then I should be on the signin page
    cy.url().should('include', '/signin');
  });
});