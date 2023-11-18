import loginPage from './authentication';
import crearPost from './post';
import randomText from './suppFunctions';

const NOMBRE_ESCENARIO = 'Escenario 8 -- Paso ';

describe('Escenario 8', () => {
  beforeEach(() => {
    loginPage.visit();
    cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it('Crear post 1, crear post 2,eliminar post 2 y validar elminacion post 2', () => {

    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword(Cypress.env("password"));
    cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');
	
	//Given I create post #1
  const post1 = randomText(10,12);
	crearPost.crearPost(post1);
  cy.screenshot(NOMBRE_ESCENARIO + '4_crearPost');
	
	//Given I create post #2
  const post2 = randomText(10,12);
	crearPost.crearPost(post2);
  cy.screenshot(NOMBRE_ESCENARIO + '5_crearPost');

  //Given I delete post #2
	crearPost.eliminarPost(post2);
  cy.screenshot(NOMBRE_ESCENARIO + '6_eliminarPost');

	//Then the post #2 should not exist and post#1 should exist
  cy.wait(2000); 
  crearPost.noExistePost(post2);
  cy.screenshot(NOMBRE_ESCENARIO + '7_noExistePost');

  crearPost.existePost(post1);
	cy.screenshot(NOMBRE_ESCENARIO + '8_existePost');  
    
  });
});