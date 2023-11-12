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
    loginPage.fillEmail("da.gamez97@gmail.com");
    loginPage.fillPassword("pPb8c@Jw0c4RyK1i");
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