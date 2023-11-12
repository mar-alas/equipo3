import loginPage from './authentication';

describe('Escenario 3', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('Login 3 veces con contrasena y correo incorrecto, olvidar contrasena, login correcto', () => {
    // When I enter invalid email and password
    loginPage.fillEmail("invalid_email1@uniandes.edu.co");
    loginPage.fillPassword("invalid_pass1");
    loginPage.submitLoginForm();

    // Then I should get an error 'There is no user with that email address.'
    loginPage.error("There is no user with that email address.")

    //  When I enter invalid email and password again
    loginPage.fillEmail("invalid_email2@uniandes.edu.co");
    loginPage.fillPassword("invalid_pass1");
    loginPage.submitLoginForm();

    // Then I should get an error 'There is no user with that email address.'
    loginPage.error("There is no user with that email address.")

    //  When I enter invalid email and password again
    loginPage.fillEmail("invalid_email1@uniandes.edu.co");
    loginPage.fillPassword("invalid_pass1");
    loginPage.submitLoginForm();

    // Then I should get an error 'There is no user with that email address.'
    loginPage.error("There is no user with that email address.")

    //When I click in fotgot
    loginPage.forgot()

    //Then I get an error 
    loginPage.error("User not found.")

    //When I enter correct email
    loginPage.fillEmail("user@example.com");
    //And I click in forgot
    loginPage.forgot()
    // Here there is an issue and the forgot doesnt work

    // Then I add the correct password
    loginPage.fillPassword("dzLY3PdWLWj:");
    loginPage.submitLoginForm();
    // Then I should be on dashboard
    cy.url().should('include', '/dashboard');

    // And I logout
    loginPage.signout();

    // Then I should be on the signin page
    cy.url().should('include', '/signin');
  });
});