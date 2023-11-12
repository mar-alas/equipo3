import loginPage from './authentication';
import crearPost from './post';
import randomText from './suppFunctions';

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
  const post1 = randomText(10,12);
	crearPost.crearPost(post1);
	
	//Given I create post #2
  const post2 = randomText(10,12);
	crearPost.crearPost(post2);

  //Given I edit post #2
	crearPost.editarPost(post2,"ContenidoEditado");

	//Then the post #1 and #2 should exist and post#2 should have the new content
  cy.wait(2000); 
  crearPost.existePost(post1);
  crearPost.existePost(post2);
  crearPost.revisarContenidoPost(post2,"ContenidoEditado")  

    
  });
});