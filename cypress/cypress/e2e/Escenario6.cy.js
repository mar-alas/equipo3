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
	
	//Given I create 3 different posts
	crearPost.crearPost("Titulo 1");
	
	crearPost.crearPost("Titulo 2");
	
	crearPost.crearPost("Titulo 3");
	
	//Then I should have the three post correcly
  crearPost.existePost("Titulo 1");
  crearPost.existePost("Titulo 2");
  crearPost.existePost("Titulo 3");

    
  });
});