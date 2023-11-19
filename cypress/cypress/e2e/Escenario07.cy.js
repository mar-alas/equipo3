import loginPage from './authentication';
import crearPost from './post';
import randomText from './suppFunctions';

const NOMBRE_ESCENARIO = 'Escenario 7 -- Paso ';

describe('Escenario 7', () => {
  beforeEach(() => {
    loginPage.visit();
    cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it('Crear post , eliminarlo y validar eliminacion', () => {

    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');
    
    loginPage.fillPassword(Cypress.env("password"));
    cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');
	
	//Given I create 1 post
  const post1 = randomText(10,12);
	crearPost.crearPost(post1);
  cy.screenshot(NOMBRE_ESCENARIO + '4_crearPost');
	
	//Given I delete the post
	crearPost.eliminarPost(post1);
  cy.screenshot(NOMBRE_ESCENARIO + '5_eliminarPost');

	//Then the post should not exist
  cy.wait(2000); 
	crearPost.noExistePost(post1);
  cy.screenshot(NOMBRE_ESCENARIO + '6_noExistePost');
    
  });
});