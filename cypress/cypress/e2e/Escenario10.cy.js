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
	
	//Given I create 5 equal posts
  const post1 = randomText(10,12);
	crearPost.crearPost(post1);
  cy.wait(1000);
	crearPost.crearPost(post1);
  cy.wait(1000);
  crearPost.crearPost(post1);
  cy.wait(1000);
  crearPost.crearPost(post1);
  cy.wait(1000);
  crearPost.crearPost(post1);
	
	
	//Then I should have at least 5 posts of same title
  cy.wait(1000);
  crearPost.existenPostRepetidos(post1,5);
 

    
  });
});