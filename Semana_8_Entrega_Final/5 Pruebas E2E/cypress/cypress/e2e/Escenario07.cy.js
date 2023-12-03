import loginPage from './authentication';
import crearPost from './post';
import randomText from './suppFunctions';

describe('Escenario 7', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('Crear post , eliminarlo y validar eliminacion', () => {

    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    loginPage.fillPassword(Cypress.env("password"));
    loginPage.submitLoginForm();
	
	//Given I create 1 post
  const post1 = randomText(10,12);
	crearPost.crearPost(post1);
	
	//Given I delete the post
	crearPost.eliminarPost(post1);

	//Then the post should not exist
  cy.wait(2000); 
	crearPost.noExistePost(post1);
	  

    
  });
});