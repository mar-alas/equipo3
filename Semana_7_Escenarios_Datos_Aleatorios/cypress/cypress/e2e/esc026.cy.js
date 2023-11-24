import loginPage from './authentication';
import crearPost from './post';
import crearTags from './tag';
import useAleatorioCrearPost from './posts_helper'
import useAleatorioTag from './tag_helper'

const NOMBRE_ESCENARIO = 'Escenario 26 -- Paso ';
const TWO_SECONDS = 2000;

describe('Escenario 26', () => {
  beforeEach(() => {
    loginPage.visit();
   //cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it(' Hacer login , crear post, crear tag,  validar post, validar tag', () => {
    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
   //cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword(Cypress.env("password"));
   //cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
   //cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');
    
    cy.url().should('include', '/dashboard');
   //cy.screenshot(NOMBRE_ESCENARIO + '4_shouldIncludeDashboard');

  //When I create a new post using "a-priori"
  cy.useAleatorioCrearPost().then((formattedPost) => {
    crearPost.crearPost(formattedPost.title, formattedPost.body);
    cy.wait(TWO_SECONDS);
    //cy.screenshot(NOMBRE_ESCENARIO + '5_crearPost');

    //Then I should have the three post correcly
    crearPost.existePost(formattedPost.title);
    cy.wait(TWO_SECONDS);
    //cy.screenshot(NOMBRE_ESCENARIO + '6_existePost');
  });

  cy.useAleatorioTag().then((formattedTag) => {
    crearTags.crearTag(formattedTag.name, formattedTag.body)
   //cy.screenshot(NOMBRE_ESCENARIO + '7_crearTag');

    crearTags.validarTag(formattedTag.name)
   //cy.screenshot(NOMBRE_ESCENARIO + '8_validarTag');
  });

    // When I signout
    loginPage.signout();
   //cy.screenshot(NOMBRE_ESCENARIO + '9_Signout');

    // Then I should be on the signin page
    cy.url().should('include', '/signin');
   //cy.screenshot(NOMBRE_ESCENARIO + '10_shouldIncludeSignin');
  });
});