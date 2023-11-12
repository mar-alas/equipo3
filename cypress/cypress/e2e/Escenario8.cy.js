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
    loginPage.fillEmail("da.gamez97@gmail.com");
    loginPage.fillPassword("pPb8c@Jw0c4RyK1i");
    loginPage.submitLoginForm();
	
	//Given I create post #1
	crearPost.crearPost("PostPruebaEsc8_1");
	
	//Given I create post #2
	crearPost.crearPost("PostPruebaEsc8_223112331412534");

  //Given I delete post #2
	crearPost.eliminarPost("PostPruebaEsc8_223112331412534");

	//Then the post #2 should not exist and post#1 should exist
  cy.wait(2000); 
  crearPost.noExistePost("PostPruebaEsc8_223112331412534");
  crearPost.existePost("PostPruebaEsc8_1");
	  

    
  });
});