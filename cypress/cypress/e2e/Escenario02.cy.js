import loginPage from './authentication';

describe('Escenario 2', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('Login sin datos, login con email no registrado, login con exito', () => {
    // Given empty email and empty password
    loginPage.submitLoginForm();
    // Then I should get an error 'Please fill out the form to sign in.'
    loginPage.error("Please fill out the form to sign in.")

    // When I enter email "invalid_email@uniandes.edu.co" 
    // & I enter password "invalid_pass"
    loginPage.fillEmail("invalid_email@uniandes.edu.co");
    loginPage.fillPassword("invalid_pass");
    loginPage.submitLoginForm();

    // Then I should get an error 'There is no user with that email address.'
    loginPage.error("There is no user with that email address.")

    //When I enter correct credentials
    loginPage.fillEmail(Cypress.env("username"));
    loginPage.fillPassword(Cypress.env("password"));
    loginPage.submitLoginForm();
    // Then I should be on dashboard
    cy.url().should('include', '/dashboard');

    // And I logout
    loginPage.signout();

    // Then I should be on the signin page
    cy.url().should('include', '/signin');
  });
});