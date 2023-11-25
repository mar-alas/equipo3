const crearPagina = {

    generarNumeroAleatorio: () =>  {
        return Math.floor(Math.random() * 900000) + 100000;
    },

    navegarAPages: () => {
        cy.get('[data-test-nav="pages"]').click();
    },

    crearPagina: (Titulo) => {
      
	  //click en nueva pagina
	  cy.get('.ember-view.gh-btn.gh-btn-primary.view-actions-top-row').click();
	  
	  //se inserta titulo de la pagina  
	  cy.get('.gh-editor-title.ember-text-area.gh-input.ember-view').type(Titulo);

	  
	  //se inserta contenido del post
	  cy.get('p').type("Contenido de pagina");
	  
	  //se da publicar
	  cy.get('[data-test-button="publish-flow"]').click();
	  
	  //da click en continuar en el final review 
	  cy.get('[data-test-button="continue"]').click();
	  
	  //da click en confirmacion
	  cy.get('[data-test-button="confirm-publish"]').click();
	  
	  //vuelve al editor
	  cy.get('[data-test-button="back-to-editor"]').click();
	  
	  //vuelve a las paginas
	  cy.get('[data-test-link="pages"]').click();
	  
	  //vuelve al dashboard
	  cy.get('[data-test-nav="dashboard"]').click();
	  
    },
	
	crearPaginaConTituloYContenido: (Titulo, Contenido) => {
      
		//click en nueva pagina
		cy.get('.ember-view.gh-btn.gh-btn-primary.view-actions-top-row').click();
		
		//se inserta titulo de la pagina  
		cy.get('.gh-editor-title.ember-text-area.gh-input.ember-view').type(Titulo);
  
		//se inserta contenido del post
		cy.get('p').type(Contenido);
		
		//se da publicar
		cy.get('[data-test-button="publish-flow"]').click();
		
		//da click en continuar en el final review 
		cy.get('[data-test-button="continue"]').click();
		
		//da click en confirmacion
		cy.get('[data-test-button="confirm-publish"]').click();
		
		//vuelve al editor
		cy.get('[data-test-button="back-to-editor"]').click();
		
		//vuelve a las paginas
		cy.get('[data-test-link="pages"]').click();
		
		//vuelve al dashboard
		cy.get('[data-test-nav="dashboard"]').click();
		
	  },

	editarPagina: (Titulo,Contenido) => {
		
		//Navegamos a pages
		// cy.get('[data-test-nav="pages"]').click();
  
		// entramos al detalle de pagina a editar
		cy.get('[class="gh-content-entry-title"]').contains(Titulo).click();

		//cambiamos el contenido del post al nuevo contenido
		cy.get('p').clear().type(Contenido);

		//damos click en actualizar data-test-button="publish-save"
		cy.get('[data-test-button="publish-save"]').click();

		//nos devolvemos a pages
		cy.get('[data-test-link="pages"]').click();

	  }
	,
	revisarContenidoPagina: (Titulo,Contenido) => {
		
		//Navegamos a pages
		cy.get('[data-test-nav="pages"]').click();
  
		// entramos al page que queremos revisar
		cy.get('[class="gh-content-entry-title"]').contains(Titulo).click();

		//revisamos que el contenido en p sea igual a Contenido
		cy.get('p').should('have.text', Contenido);
		
		//nos devolvemos a pages
		cy.get('[data-test-link="pages"]').click();

	  },

	  revisarContenidoPaginaConMarkdown: (Titulo,Contenido) => {
		
		//Navegamos a pages
		cy.get('[data-test-nav="pages"]').click();
  
		// entramos al page que queremos revisar
		cy.get('[class="gh-content-entry-title"]').contains(Titulo).click();

		//nos devolvemos a pages
		cy.get('[data-test-link="pages"]').click();

	  },
	
	existePage: (Titulo) => {
		
      //Navegamos a page
	  cy.get('[data-test-nav="pages"]').click();

	  // seleccionamos los elementos [class="gh-content-entry-title"] cuyo contenido sea igual Titulo
	  cy.get('[class="gh-content-entry-title"]').contains(Titulo).invoke('text').should('not.be.empty');

	  
    },

	noExistePage: (Titulo) => {
        //Navegamos a pages
	    cy.get('[data-test-nav="pages"]').click();

		cy.contains(Titulo).should('not.exist');
		
	  },

	existenPagesRepetidas: (Titulo,numero) => {
      // Navegamos a pages
      cy.get('[data-test-nav="pages"]').click();

      cy.get('[class="gh-content-entry-title"]')
        .contains(Titulo)
        .invoke("text")
        .should("not.be.empty");

      var rep = 0;
      cy.get('[class="gh-content-entry-title"]')
        .each(($el, index, $list) => {
          const text = $el.text();
          if (text.includes(Titulo)) {
            rep = rep + 1;
          }
        })
        .then(() => {
		  expect(rep).to.be.greaterThan(numero - 1);
        });
    },

    noExistenPagesRepetidas: (Titulo,numero) => {
        // Navegamos a pages
        cy.get('[data-test-nav="pages"]').click();
  
        cy.get('[class="gh-content-entry-title"]')
          .contains(Titulo)
          .invoke("text")
          .should("not.be.empty");
  
        var rep = 0;
        cy.get('[class="gh-content-entry-title"]')
          .each(($el, index, $list) => {
            const text = $el.text();
            if (text.includes(Titulo)) {
              rep = rep + 1;
            }
          })
          .then(() => {
            expect(rep).to.be.equal(1);
          });
      },
  
	
	eliminarPage: (Titulo) => {
              //Navegamos a posts
	  cy.get('[data-test-nav="pages"]').click();
	  

	  // seleccionamos los elementos [class="gh-content-entry-title"] cuyo contenido sea igual Titulo y damos click
	  cy.get('.gh-content-entry-title').contains(Titulo).click();

	  //damos click en opciones del post
	  cy.get('.settings-menu-toggle > span').click();
	  
	  // damos click en borrar
	  cy.get('.settings-menu-delete-button > .gh-btn > span').click();	

	  //confirmamos el borrado
	  cy.get('.gh-btn.gh-btn-red.gh-btn-icon.ember-view').click();
    },
	
  
	crearPageProgramado: (Titulo, fecha) => {
		
		//click en nuevo page
		cy.get('.ember-view.gh-secondary-action.gh-nav-new-post').click();
		
		//se inserta titulo de l pagina
		cy.get('.gh-editor-title.ember-text-area.gh-input.ember-view').type(Titulo);

		
		//se inserta contenido del page
		cy.get('p').type("Contenido page programada");
		
		//se da publicar
		cy.get('[data-test-button="publish-flow"]').click();
		
		// Click en publish setting
		cy.get('.gh-publish-setting.last').click();

		// Click en schedule
		cy.get('.gh-publish-schedule').should('exist').click();

		// Agregar la fecha
		cy.get('.gh-date-time-picker-date input').type(fecha);

		//da click en continuar en el final review 
		cy.get('[data-test-button="continue"]').click();
		
		//da click en confirmacion
		cy.get('[data-test-button="confirm-publish"]').click();
		
		//cierra el publish flow
		cy.get('[data-test-button="close-publish-flow"]').click();
		
		// vuelve al editar
		cy.get('.ember-view.gh-btn-editor.gh-editor-back-button').click();

		//vuelve al dashboard
		cy.get('[data-test-nav="dashboard"]').click();
	}
	
  };
  

  export default crearPagina;
  