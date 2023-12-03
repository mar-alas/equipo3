import loginPage from './authentication';
import crearPost from './post';
import randomText from './suppFunctions';

const NOMBRE_ESCENARIO = 'Escenario 6 -- Paso ';

describe('Escenario 6', () => {
  beforeEach(() => {
    loginPage.visit();
    cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it('Crear tres posts y validar su correcta creacion', () => {

    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword(Cypress.env("password"));
    cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');
	
	//Given I create 3 different posts
  const post1 = randomText(10,12);
	crearPost.crearPost(post1);
  cy.screenshot(NOMBRE_ESCENARIO + '4_crearPost');
	
  const post2 = randomText(10,12);
	crearPost.crearPost(post2);
  cy.screenshot(NOMBRE_ESCENARIO + '5_crearPost');
	
  const post3 = randomText(10,12);
	crearPost.crearPost(post3);
  cy.screenshot(NOMBRE_ESCENARIO + '6_crearPost');
	
	//Then I should have the three post correcly
  crearPost.existePost(post1);
  cy.screenshot(NOMBRE_ESCENARIO + '7_existePost');

  crearPost.existePost(post2);
  cy.screenshot(NOMBRE_ESCENARIO + '8_existePost');

  crearPost.existePost(post3);
  cy.screenshot(NOMBRE_ESCENARIO + '9_existePost');
    
  });
});