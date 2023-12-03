import loginPage from './authentication';
import crearPost from './post';
import usePoliDinamicoCrearPost from './posts_helper'

const NOMBRE_ESCENARIO = 'Escenario 30 -- Paso ';
const TWO_SECONDS = 2000;

describe('Escenario 30', () => {
  beforeEach(() => {
    loginPage.visit();
    //cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it('Creacion post programado, validar creacion programada, signout', () => {
    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    //cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword(Cypress.env("password"));
    //cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    //cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');

    cy.url().should('include', '/dashboard');
    //cy.screenshot(NOMBRE_ESCENARIO + '4_shouldIncludeDashboard');

    //When I create a new post using aleatorio
    cy.usePoliDinamicoCrearPost().then((formattedPost) => {
      //When I create a new post called
      crearPost.crearPostProgramado(formattedPost.title, formattedPost.body,
        formattedPost.date);
      //cy.screenshot(NOMBRE_ESCENARIO + '5_crearPostProgramado');

      //Then I should have the three post correcly
      crearPost.existePost(formattedPost.title);
      //cy.screenshot(NOMBRE_ESCENARIO + '6_existePost');
    });

    // When I signout
    loginPage.signout();
    //cy.screenshot(NOMBRE_ESCENARIO + '7_signout');

    // Then I should be on the signin page
    cy.url().should('include', '/signin');
    //cy.screenshot(NOMBRE_ESCENARIO + '8_shouldIncludeSignin');
  });
});