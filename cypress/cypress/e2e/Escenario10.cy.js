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
	
	//Given I create 5 equal posts
	crearPost.crearPost("Titulo Igual 4");
  cy.wait(1000);
	crearPost.crearPost("Titulo Igual 4");
  cy.wait(1000);
  crearPost.crearPost("Titulo Igual 4");
  cy.wait(1000);
  crearPost.crearPost("Titulo Igual 4");
  cy.wait(1000);
  crearPost.crearPost("Titulo Igual 4");
	
	
	//Then I should have at least 5 posts of same title
  cy.wait(1000);
  crearPost.existenPostRepetidos("Titulo Igual 4",5);
 

    
  });
});