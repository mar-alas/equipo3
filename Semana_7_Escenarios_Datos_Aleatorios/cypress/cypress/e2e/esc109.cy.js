//correr manualmente con: npx cypress run --spec "cypress/cypress/e2e/esc93.cy.js"

import loginPage from './authentication';
import crearPost from './post';
import usePoliDinamicoCrearPost from './posts_helper'

const NOMBRE_ESCENARIO = 'Escenario 109 -- Paso ';
const TWO_SECONDS = 2000;

describe('Escenario 109', () => {
  beforeEach(() => {
    loginPage.visit();
    //cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it('Login con exito, creacion y validacion de un post con Sound Cloud con url invalida', () => {
    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    //cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword(Cypress.env("password"));
    //cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    cy.wait(TWO_SECONDS);
    //cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');

    cy.url().should('include', '/dashboard');
    //cy.screenshot(NOMBRE_ESCENARIO + '4_includeDashboard');

    //When I create a new post using "poliDinamico"
    cy.usePoliDinamicoCrearPost().then((formattedPost) => {
      crearPost.crearPostContenidoSoundCloud(formattedPost.title, formattedPost.title, formattedPost.body,5);
      cy.wait(TWO_SECONDS);
      
      //se debe generar un error dado que es un post incorrecto
      cy.get('[data-testid="embed-url-error-message"]').should('exist');
    });

  });
});