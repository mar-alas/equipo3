import loginPage from './authentication';
import useAleatorioCrearCorreo from './login_helper'

const NOMBRE_ESCENARIO = 'Escenario 23 -- Paso ';
const TWO_SECONDS = 2000;

describe('Escenario 23', () => {
  beforeEach(() => {
    loginPage.visit();
    //cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it('Login 1 veces con contrasena y correo incorrecto, olvidar contrasena, login correcto usando a-priori', () => {
    
    cy.useAleatorioCrearCorreo().then((formattedEmail) => {
      // When I enter invalid email and password
      loginPage.fillEmail(formattedEmail.email);
      //cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

      loginPage.fillPassword(formattedEmail.password);
      //cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

      loginPage.submitLoginForm();
      cy.wait(TWO_SECONDS);
      //cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');

      // Then I should get an error 'There is no user with that email address.'
      loginPage.error(/There is no user with that email address\.|Too many login attempts(.*)|Too many attempts(.*)/)
      //cy.screenshot(NOMBRE_ESCENARIO + '4_error');
    });

    // cy.useAleatorioCrearCorreo().then((formattedEmail) => {
    //   // When I enter invalid email and password
    //   loginPage.fillEmail(formattedEmail.email);
    //   //cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    //   loginPage.fillPassword(formattedEmail.password);
    //   //cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    //   loginPage.submitLoginForm();
    //   cy.wait(TWO_SECONDS);
    //   //cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');

    //   // Then I should get an error 'There is no user with that email address.'
    //   loginPage.error(/There is no user with that email address\.|Too many login attempts(.*)|Too many attempts(.*)/)
    //   //cy.screenshot(NOMBRE_ESCENARIO + '4_error');
    // });
  
    // cy.useAleatorioCrearCorreo().then((formattedEmail) => {
    //   // When I enter invalid email and password
    //   loginPage.fillEmail(formattedEmail.email);
    //   //cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    //   loginPage.fillPassword(formattedEmail.password);
    //   //cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    //   loginPage.submitLoginForm();
    //   cy.wait(TWO_SECONDS);
    //   //cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');

    //   // Then I should get an error 'There is no user with that email address.'
    //   loginPage.error(/There is no user with that email address\.|Too many login attempts(.*)|Too many attempts(.*)/)
    //   //cy.screenshot(NOMBRE_ESCENARIO + '4_error');
    // });

    //When I click in forgot
    loginPage.forgot()
    cy.wait(TWO_SECONDS);
    //cy.screenshot(NOMBRE_ESCENARIO + '13_forgot');

    //Then I get an error 
    loginPage.error(/User not found.|Too many attempts(.*)/)
    //cy.screenshot(NOMBRE_ESCENARIO + '14_error');

    //When I enter correct email
    loginPage.fillEmail(Cypress.env("username"));
    //cy.screenshot(NOMBRE_ESCENARIO + '15_fillEmail');

    // Then I add the correct password
    loginPage.fillPassword(Cypress.env("password"));
    //cy.screenshot(NOMBRE_ESCENARIO + '17_fillPassword');

    loginPage.submitLoginForm();
    cy.wait(TWO_SECONDS);
    //cy.screenshot(NOMBRE_ESCENARIO + '18_submitLoginForm');

    // Then I should be on dashboard
    cy.url().should('include', '/dashboard');
    //cy.screenshot(NOMBRE_ESCENARIO + '19_shouldIncludeDashboard');

    // And I logout
    loginPage.signout();
    cy.wait(TWO_SECONDS);
    //cy.screenshot(NOMBRE_ESCENARIO + '20_visitSignout');

    // Then I should be on the signin page
    cy.url().should('include', '/signin');
    //cy.screenshot(NOMBRE_ESCENARIO + '21_shouldIncludeSignin');
  });
});