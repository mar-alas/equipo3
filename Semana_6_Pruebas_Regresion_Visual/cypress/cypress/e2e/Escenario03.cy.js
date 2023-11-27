import loginPage from './authentication';

const NOMBRE_ESCENARIO = 'Escenario 3 -- Paso ';
const TWO_SECONDS = 2000;

describe('Escenario 3', () => {
  beforeEach(() => {
    loginPage.visit();
    cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it('Login 3 veces con contrasena y correo incorrecto, olvidar contrasena, login correcto', () => {
    // When I enter invalid email and password
    loginPage.fillEmail("invalid_email1@uniandes.edu.co");
    cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword("invalid_pass1");
    cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    cy.wait(TWO_SECONDS);
    cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');

    // Then I should get an error 'There is no user with that email address.'
    loginPage.error("There is no user with that email address.")
    cy.screenshot(NOMBRE_ESCENARIO + '4_error');

    //  When I enter invalid email and password again
    loginPage.fillEmail("invalid_email2@uniandes.edu.co");
    cy.screenshot(NOMBRE_ESCENARIO + '5_fillEmail');

    loginPage.fillPassword("invalid_pass1");
    cy.screenshot(NOMBRE_ESCENARIO + '6_fillPassword');

    loginPage.submitLoginForm();
    cy.wait(TWO_SECONDS);
    cy.screenshot(NOMBRE_ESCENARIO + '7_submitLoginForm');

    // Then I should get an error 'There is no user with that email address.'
    loginPage.error("There is no user with that email address.")
    cy.screenshot(NOMBRE_ESCENARIO + '8_error');

    //  When I enter invalid email and password again
    loginPage.fillEmail("invalid_email1@uniandes.edu.co");
    cy.screenshot(NOMBRE_ESCENARIO + '9_fillEmail');

    loginPage.fillPassword("invalid_pass1");
    cy.screenshot(NOMBRE_ESCENARIO + '10_fillPassword');

    loginPage.submitLoginForm();
    cy.wait(TWO_SECONDS);
    cy.screenshot(NOMBRE_ESCENARIO + '11_submitLoginForm');

    // Then I should get an error 'There is no user with that email address.'
    loginPage.error("There is no user with that email address.")
    cy.screenshot(NOMBRE_ESCENARIO + '12_error');

    //When I click in forgot
    loginPage.forgot()
    cy.wait(TWO_SECONDS);
    cy.screenshot(NOMBRE_ESCENARIO + '13_forgot');

    //Then I get an error 
    loginPage.error("User not found.")
    cy.screenshot(NOMBRE_ESCENARIO + '14_error');

    //When I enter correct email
    loginPage.fillEmail(Cypress.env("username"));
    cy.screenshot(NOMBRE_ESCENARIO + '15_fillEmail');

    //And I click in forgot
    loginPage.forgot()
    cy.wait(TWO_SECONDS);
    cy.screenshot(NOMBRE_ESCENARIO + '16_forgot');

    // Here there is an issue and the forgot doesnt work

    // Then I add the correct password
    loginPage.fillPassword(Cypress.env("password"));
    cy.screenshot(NOMBRE_ESCENARIO + '17_fillPassword');

    loginPage.submitLoginForm();
    cy.wait(TWO_SECONDS);
    cy.screenshot(NOMBRE_ESCENARIO + '18_submitLoginForm');

    // Then I should be on dashboard
    cy.url().should('include', '/dashboard');
    cy.screenshot(NOMBRE_ESCENARIO + '19_shouldIncludeDashboard');

    // And I logout
    loginPage.signout();
    cy.wait(TWO_SECONDS);
    cy.screenshot(NOMBRE_ESCENARIO + '20_visitSignout');

    // Then I should be on the signin page
    cy.url().should('include', '/signin');
    cy.screenshot(NOMBRE_ESCENARIO + '21_shouldIncludeSignin');
  });
});