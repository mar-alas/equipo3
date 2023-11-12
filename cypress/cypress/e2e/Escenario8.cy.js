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

  it('Login con exito', () => {

    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    loginPage.fillPassword(Cypress.env("password"));
    loginPage.submitLoginForm();
	
	//Given I create post #1
  const post1 = randomText(10,12);
	crearPost.crearPost(post1);
	
	//Given I create post #2
  const post2 = randomText(10,12);
	crearPost.crearPost(post2);

  //Given I delete post #2
	crearPost.eliminarPost(post2);

	//Then the post #2 should not exist and post#1 should exist
  cy.wait(2000); 
  crearPost.noExistePost(post2);
  crearPost.existePost(post1);
	  

    
  });
});