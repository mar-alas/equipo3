import loginPage from './authentication';
import crearPost from './post';
import randomText from './suppFunctions';

const NOMBRE_ESCENARIO = 'Escenario 10 -- Paso ';

describe('Escenario 10', () => {
  beforeEach(() => {
    loginPage.visit();
    cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it('Crear 5 posts repetidos  y validar creacion 5 posts repetidos', () => {

    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    cy.screenshot(NOMBRE_ESCENARIO + '1_visit');

    loginPage.fillPassword(Cypress.env("password"));
    cy.screenshot(NOMBRE_ESCENARIO + '2_visit');

    loginPage.submitLoginForm();
    cy.screenshot(NOMBRE_ESCENARIO + '3_visit');
	
	//Given I create 5 equal posts
  const post1 = randomText(10,12);
	crearPost.crearPost(post1);
  cy.wait(1000);
  cy.screenshot(NOMBRE_ESCENARIO + '4_visit');

	crearPost.crearPost(post1);
  cy.wait(1000);
  cy.screenshot(NOMBRE_ESCENARIO + '5_visit');

  crearPost.crearPost(post1);
  cy.wait(1000);
  cy.screenshot(NOMBRE_ESCENARIO + '6_visit');

  crearPost.crearPost(post1);
  cy.wait(1000);
  cy.screenshot(NOMBRE_ESCENARIO + '7_visit');

  crearPost.crearPost(post1);
	cy.screenshot(NOMBRE_ESCENARIO + '8_visit');
	
	//Then I should have at least 5 posts of same title
  cy.wait(1000);
  crearPost.existenPostRepetidos(post1,5);
  cy.screenshot(NOMBRE_ESCENARIO + '9_visit');
    
  });
});