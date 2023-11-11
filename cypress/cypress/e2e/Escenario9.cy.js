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

  it('Escenario 9 con exito', () => {

    // Given I log in in ghost
    loginPage.fillEmail("da.gamez97@gmail.com");
    loginPage.fillPassword("pPb8c@Jw0c4RyK1i");
    loginPage.submitLoginForm();
	
	//Given I create post #1
	crearPost.crearPost("PostPruebaEsc8_11");
	
	//Given I create post #2
	crearPost.crearPost("PostPruebaEsc8_22");

  //Given I edit post #2
	crearPost.editarPost("PostPruebaEsc8_22","ContenidoEditado");

	//Then the post #1 and #2 should exist and post#2 should have the new content
  cy.wait(2000); 
  crearPost.existePost("PostPruebaEsc8_11");
  crearPost.existePost("PostPruebaEsc8_22");
  crearPost.revisarContenidoPost("PostPruebaEsc8_22","ContenidoEditado")  

    
  });
});