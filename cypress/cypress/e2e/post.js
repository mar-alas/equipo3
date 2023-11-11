const crearPost = {
    crearPost: () => {
      
	  //click en nuevo post
	  cy.get('#ember20').click();
	  
	  //se inserta titulo del post
	  cy.get('#ember51').type("Titulo1");
	  
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
  };
  
  export default crearPost;
  