import loginPage from './authentication';
import crearPost from './post';

//import properties

//const config= require('./config.json');
//import loginPage from './config.json';

//const EMAIL= "da.gamez97@gmail.com";
//const PASSWORD= "pPb8c@Jw0c4RyK1i";

describe('Funcionalidad de autenticacion', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('Login con exito', () => {

    // Given I log in in ghost
    loginPage.fillEmail("user@example.com");
    loginPage.fillPassword("dzLY3PdWLWj:");
    loginPage.submitLoginForm();
	
	//Given I create 1 post
	crearPost.crearPost("Post Prueba Eliminacion");
	
	//Given I delete the post
	crearPost.eliminarPost("Post Prueba Eliminacion");

	//Then the post should not exist
  cy.wait(2000); 
	crearPost.noExistePost("Post Prueba Eliminacion");
	  

    
  });
});