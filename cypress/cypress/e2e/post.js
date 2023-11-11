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
  };
  
  export default crearPost;
  