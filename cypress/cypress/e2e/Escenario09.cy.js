import loginPage from './authentication';
import crearPost from './post';
import randomText from './suppFunctions';

const NOMBRE_ESCENARIO = 'Escenario 9 -- Paso ';

describe('Escenario 9', () => {
  beforeEach(() => {
    loginPage.visit();
    cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it('Crear post 1, crear post 2, editar post 2, validar edicion ', () => {

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

  //Given I edit post #2
	crearPost.editarPost(post2,"ContenidoEditado");
  cy.screenshot(NOMBRE_ESCENARIO + '6_editarPost');

	//Then the post #1 and #2 should exist and post#2 should have the new content
  cy.wait(2000); 
  crearPost.existePost(post1);
  cy.screenshot(NOMBRE_ESCENARIO + '7_existePost');

  crearPost.existePost(post2);
  cy.screenshot(NOMBRE_ESCENARIO + '8_existePost');

  crearPost.revisarContenidoPost(post2,"ContenidoEditado")  
  cy.screenshot(NOMBRE_ESCENARIO + '9_revisarContenidoPost');
    
  });
});