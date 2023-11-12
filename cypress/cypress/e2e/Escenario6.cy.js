import loginPage from './authentication';
import crearPost from './post';
import randomText from './suppFunctions';


describe('Funcionalidad de autenticacion', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('Login con exito', () => {

    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    loginPage.fillPassword(Cypress.env("password"));
    loginPage.submitLoginForm();
	
	//Given I create 3 different posts
  const post1 = randomText(10,12);
	crearPost.crearPost(post1);
	
  const post2 = randomText(10,12);
	crearPost.crearPost(post2);
	
  const post3 = randomText(10,12);
	crearPost.crearPost(post3);
	
	//Then I should have the three post correcly
  crearPost.existePost(post1);
  crearPost.existePost(post2);
  crearPost.existePost(post3);

    
  });
});