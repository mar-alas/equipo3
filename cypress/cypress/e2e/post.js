const crearPost = {

    crearPost: (Titulo) => {
      
	  //click en nuevo post
	  cy.get('.ember-view.gh-secondary-action.gh-nav-new-post').click();
	  
	  //se inserta titulo del post
	  cy.get('.gh-editor-title.ember-text-area.gh-input.ember-view').type(Titulo);

	  
	  //se inserta contenido del post
	  cy.get('.koenig-editor__editor').type("Contenido 1");
	  
	  //se da publicar
	  cy.get('[data-test-button="publish-flow"]').click();
	  
	  //da click en continuar en el final review 
	  cy.get('[data-test-button="continue"]').click();
	  
	  //da click en confirmacion
	  cy.get('[data-test-button="confirm-publish"]').click();
	  
	  //vuelve al editor
	  cy.get('[data-test-button="back-to-editor"]').click();
	  
	  //vuelve a los posts
	  cy.get('[data-test-link="posts"]').click();
	  
	  //vuelve al dashboard
	  cy.get('[data-test-nav="dashboard"]').click();
	  
    },

	
	existePost: (Titulo) => {
		
      //Navegamos a posts
	  cy.get('[data-test-nav="posts"]').click();
	  

	  // seleccionamos los elementos [class="gh-content-entry-title"] cuyo contenido sea igual Titulo
	  cy.get('[class="gh-content-entry-title"]').contains(Titulo).invoke('text').should('not.be.empty');

	  
    },
	noExistePost: (Titulo) => {
		
		//there should not be any text in the html containing the string "Titulo 2"
		//cy.contains('html', 'Titulo 2').should('not.exist');
		cy.contains(Titulo).should('not.exist');
  
		// seleccionamos los elementos [class="gh-content-entry-title"] cuyo contenido sea igual Titulo
		//cy.get('[class="gh-content-entry-title"]').contains(Titulo).invoke('text').should('be.empty');
  
		
	  },

	
	eliminarPost: (Titulo) => {
		
      //Navegamos a posts
	  cy.get('[data-test-nav="posts"]').click();
	  

	  // seleccionamos los elementos [class="gh-content-entry-title"] cuyo contenido sea igual Titulo y damos click
	  cy.get('[class="gh-content-entry-title"]').contains(Titulo).click();

	  //damos click en opciones del post
	  cy.get('.settings-menu-toggle > span').click();
	  
	  // damos click en borrar
	  cy.get('.settings-menu-delete-button > .gh-btn > span').click();	

	  //confirmamos el borrado
	  cy.get('[class="gh-btn gh-btn-red gh-btn-icon ember-view"]').click();
    },
	
  };
  
  export default crearPost;
  