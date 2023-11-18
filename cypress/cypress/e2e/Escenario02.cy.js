import loginPage from './authentication';

const NOMBRE_ESCENARIO = 'Escenario 2 -- Paso ';

describe('Escenario 2', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('Login sin datos, login con email no registrado, login con exito', () => {
    // Given empty email and empty password
    loginPage.submitLoginForm();
    cy.screenshot(NOMBRE_ESCENARIO + '1_submitLoginForm');

    // Then I should get an error 'Please fill out the form to sign in.'
    loginPage.error("Please fill out the form to sign in.")
    cy.screenshot(NOMBRE_ESCENARIO + '2_error');

    // When I enter email "invalid_email@uniandes.edu.co" 
    // & I enter password "invalid_pass"
    loginPage.fillEmail("invalid_email@uniandes.edu.co");
    cy.screenshot(NOMBRE_ESCENARIO + '3_fillEmail');

    loginPage.fillPassword("invalid_pass");
    cy.screenshot(NOMBRE_ESCENARIO + '4_fillPassword');

    loginPage.submitLoginForm();
    cy.screenshot(NOMBRE_ESCENARIO + '5_submitLoginForm');

    // Then I should get an error 'There is no user with that email address.'
    loginPage.error("There is no user with that email address.")
    cy.screenshot(NOMBRE_ESCENARIO + '6_error');

    //When I enter correct credentials
    loginPage.fillEmail(Cypress.env("username"));
    cy.screenshot(NOMBRE_ESCENARIO + '7_fillEmail');

    loginPage.fillPassword(Cypress.env("password"));
    cy.screenshot(NOMBRE_ESCENARIO + '8_fillPassword');

    loginPage.submitLoginForm();
    cy.screenshot(NOMBRE_ESCENARIO + '9_submitLoginForm');
    // Then I should be on dashboard
    cy.url().should('include', '/dashboard');
    cy.screenshot(NOMBRE_ESCENARIO + '10_shouldIncludeDashboard');

    // And I logout
    loginPage.signout();
    cy.screenshot(NOMBRE_ESCENARIO + '11_signout');

    // Then I should be on the signin page
    cy.url().should('include', '/signin');
    cy.screenshot(NOMBRE_ESCENARIO + '12_shouldIncludeSignin');
  });
});