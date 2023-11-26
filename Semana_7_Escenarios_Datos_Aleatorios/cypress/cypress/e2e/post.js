import randomText from "./suppFunctions.js";

const crearPost = {
  crearPost: (Titulo, Body) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    cy.get("p").type(Body);

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

  publicarPost: () => {
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

  crearPostContenidoMarkdown: (Titulo, Body) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    //se da click en el cuepo
    cy.get("p").click();

    //se da click en el mas de la parte izqueirda para mas opciones
    cy.get('[aria-label="Add a card"]').click();

    //se da click en markdown
    cy.get('[data-kg-card-menu-item="Markdown"]').click();

    //se llena la seccion de markdown
    cy.get('[class="CodeMirror-scroll"]').type(Body);

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

  crearPostContenidoHTML: (Titulo, Body) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    //se da click en el cuepo
    cy.get("p").click();

    //se da click en el mas de la parte izqueirda para mas opciones
    cy.get('[aria-label="Add a card"]').click();

    //se da click en HTML
    cy.get('[data-kg-card-menu-item="HTML"]').click();

    //se llena la seccion de markdown
    cy.get('[data-kg="editor"]').type(Body);

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
  crearPostContenidoYoutube: (Titulo, enlace,Body,segundosEspera) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    //se da click en el cuepo
    cy.get("p").click();

    //se da click en el mas de la parte izqueirda para mas opciones
    cy.get('[aria-label="Add a card"]').click();

    //se da click en Youtube
    cy.get('[data-kg-card-menu-item="YouTube"]').click();

    //se llena la seccion de url youtube
    cy.get('[data-testid="embed-url"]').type(enlace + '{enter}');

    //wait 5 seconds
    cy.wait(segundosEspera*1000);



  },
  crearPostContenidoXTwiter: (Titulo, enlace,Body,segundosEspera) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    //se da click en el cuepo
    cy.get("p").click();

    //se da click en el mas de la parte izqueirda para mas opciones
    cy.get('[aria-label="Add a card"]').click();

    //se da click en Twiter
    cy.get('[data-kg-card-menu-item="X (formerly Twitter)"]').click();

    //se llena la seccion de url youtube
    cy.get('[data-testid="embed-url"]').type(enlace + '{enter}');

    //wait 5 seconds
    cy.wait(segundosEspera*1000);



  },
  crearPostContenidoVimeo: (Titulo, enlace,Body,segundosEspera) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    //se da click en el cuepo
    cy.get("p").click();

    //se da click en el mas de la parte izqueirda para mas opciones
    cy.get('[aria-label="Add a card"]').click();

    //se da click en Vimeo
    cy.get('[data-kg-card-menu-item="Vimeo"]').click();

    //se llena la seccion de url youtube
    cy.get('[data-testid="embed-url"]').type(enlace + '{enter}');

    //wait 5 seconds
    cy.wait(segundosEspera*1000);



  },
  crearPostContenidoCodePen: (Titulo, enlace,Body,segundosEspera) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    //se da click en el cuepo
    cy.get("p").click();

    //se da click en el mas de la parte izqueirda para mas opciones
    cy.get('[aria-label="Add a card"]').click();

    //se da click en CodePen
    cy.get('[data-kg-card-menu-item="CodePen"]').click();

    //se llena la seccion de url youtube
    cy.get('[data-testid="embed-url"]').type(enlace + '{enter}');

    //wait 5 seconds
    cy.wait(segundosEspera*1000);



  },
  crearPostContenidoSpotify: (Titulo, enlace,Body,segundosEspera) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    //se da click en el cuepo
    cy.get("p").click();

    //se da click en el mas de la parte izqueirda para mas opciones
    cy.get('[aria-label="Add a card"]').click();

    //se da click en Spotify
    cy.get('[data-kg-card-menu-item="Spotify"]').click();

    //se llena la seccion de url
    cy.get('[data-testid="embed-url"]').type(enlace + '{enter}');

    //wait 5 seconds
    cy.wait(segundosEspera*1000);



  },
  crearPostContenidoSoundCloud: (Titulo, enlace,Body,segundosEspera) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    //se da click en el cuepo
    cy.get("p").click();

    //se da click en el mas de la parte izqueirda para mas opciones
    cy.get('[aria-label="Add a card"]').click();

    //se da click en Sound Cloud
    cy.get('[data-kg-card-menu-item="SoundCloud"]').click();

    //se llena la seccion de url
    cy.get('[data-testid="embed-url"]').type(enlace + '{enter}');

    //wait 5 seconds
    cy.wait(segundosEspera*1000);



  },
  crearPostContenidoOtherUrl: (Titulo, enlace,Body,segundosEspera) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    //se da click en el cuepo
    cy.get("p").click();

    //se da click en el mas de la parte izqueirda para mas opciones
    cy.get('[aria-label="Add a card"]').click();

    //se da click en other url
    cy.get('[data-kg-card-menu-item="Other..."]').click();

    //se llena la seccion de url
    cy.get('[data-testid="embed-url"]').type(enlace + '{enter}');

    //wait 5 seconds
    cy.wait(segundosEspera*1000);



  },
  crearPostContenidoBookmark: (Titulo, Body) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    //se da click en el cuepo
    cy.get("p").click();

    //se da click en el mas de la parte izqueirda para mas opciones
    cy.get('[aria-label="Add a card"]').click();

    //se da click en Bookmark
    cy.get('[data-kg-card-menu-item="Bookmark"]').click();

    //se llena la seccion de markdown
    cy.get('[data-kg-card="bookmark"]').type(Body);

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

  crearPostContenidoEmailContent: (Titulo, Body) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    //se da click en el cuepo
    cy.get("p").click();

    //se da click en el mas de la parte izqueirda para mas opciones
    cy.get('[aria-label="Add a card"]').click();

    //se da click en Email content
    cy.get('[data-kg-card-menu-item="Email content"]').click();

    //se llena la seccion de Email Content
    cy.get('.w-full > .koenig-lexical > [data-kg="editor"] > .kg-prose > p').type(Body);

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

  crearPostContenidoEmailCallToAction: (Titulo, Body) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    //se da click en el cuepo
    cy.get("p").click();

    //se da click en el mas de la parte izqueirda para mas opciones
    cy.get('[aria-label="Add a card"]').click();

    //se da click en Email call to action
    cy.get('[data-kg-card-menu-item="Email call to action"]').click();

    //se llena la seccion de Email Call to action
    cy.get('.w-full > .koenig-lexical > [data-kg="editor"] > .kg-prose > p').type(Body);

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

  crearPostContenidoCallOut: (Titulo, Body) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    //se da click en el cuepo
    cy.get("p").click();

    //se da click en el mas de la parte izqueirda para mas opciones
    cy.get('[aria-label="Add a card"]').click();

    //se da click en public call out
    cy.get('[data-kg-card-menu-item="Callout"]').click();

    //se llena la seccion de Email Call to action
    cy.get('[data-testid="callout-bg-blue"] > .koenig-lexical > [data-kg="editor"] > .kg-prose > p').type(Body);

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

  crearPostContenidoToggle: (Titulo, Body) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    //se da click en el cuepo
    cy.get("p").click();

    //se da click en el mas de la parte izqueirda para mas opciones
    cy.get('[aria-label="Add a card"]').click();

    //se da click en public Toggle
    cy.get('[data-kg-card-menu-item="Toggle"]').click();

    //se llena la seccion Toggle
    cy.get('.mr-2 > .koenig-lexical > [data-kg="editor"] > .kg-prose > p').type(Body);

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

  crearPostContenidoHeader: (Titulo, Body) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    //se da click en el cuepo
    cy.get("p").click();

    //se da click en el mas de la parte izqueirda para mas opciones
    cy.get('[aria-label="Add a card"]').click();

    //se da click en Header
    cy.get('[data-kg-card-menu-item="Header"]').click();

    //se llena la seccion de titulodel headr
    cy.get('[data-testid="header-heading-editor"] > [data-kg="editor"] > .kg-prose > p').type(Titulo);

    //TODO: llenar la seccion de subheader
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


  editarPost: (Titulo, Contenido) => {
    //Navegamos a posts
    cy.get('[data-test-nav="posts"]').click();

    // entramos al post que queremos editar
    cy.get('[class="gh-content-entry-title"]').contains(Titulo).click();

    //cambiamos el contenido del post al nuevo contenido
    cy.get("p").clear().type(Contenido);

    //damos click en actualizar data-test-button="publish-save"
    cy.get('[data-test-button="publish-save"]').click();

    //nos devolvemos a posts
    cy.get('[data-test-link="posts"]').click();
  },
  revisarContenidoPost: (Titulo, Contenido) => {
    //Navegamos a posts
    cy.get('[data-test-nav="posts"]').click();

    // entramos al post que queremos revisar
    cy.get('[class="gh-content-entry-title"]').contains(Titulo).click();

    //revisamos que el contenido en p sea igual a Contenido
    cy.get("p").should("have.text", Contenido);

    //nos devolvemos a posts
    cy.get('[data-test-link="posts"]').click();
  },

  revisarContenidoPostConVideo: (Titulo) => {
    //Navegamos a posts
    cy.get('[data-test-nav="posts"]').click();

    // entramos al post que queremos revisar
    cy.get('[class="gh-content-entry-title"]').contains(Titulo).click();

    //revisamos que el contenido iframe debe existir
    cy.get('[data-testid="embed-iframe"]').should("exist");
    
  },

  existePost: (Titulo) => {
    //Navegamos a posts
    cy.get('[data-test-nav="posts"]').click();

    // seleccionamos los elementos [class="gh-content-entry-title"] cuyo contenido sea igual Titulo
    cy.get('[class="gh-content-entry-title"]')
      .contains(Titulo)
      .invoke("text")
      .should("not.be.empty");
  },
  noExistePost: (Titulo) => {
    //there should not be any text in the html containing the string "Titulo 2"
    //cy.contains('html', 'Titulo 2').should('not.exist');
    cy.contains(Titulo).should("not.exist");

    // seleccionamos los elementos [class="gh-content-entry-title"] cuyo contenido sea igual Titulo
    //cy.get('[class="gh-content-entry-title"]').contains(Titulo).invoke('text').should('be.empty');
  },

  existenPostRepetidos: (Titulo, numero) => {
    // Navegamos a posts
    cy.get('[data-test-nav="posts"]').click();

    cy.get('[class="gh-content-entry-title"]')
      .contains(Titulo)
      .invoke("text")
      .should("not.be.empty");

    var rep = 0;
    cy.get('[class="gh-content-entry-title"]')
      .each(($el, index, $list) => {
        const text = $el.text();
        if (text.includes(Titulo)) {
          //cy.wrap($el).click()
          cy.log(text);
          rep = rep + 1;
        }
      })
      .then(() => {
        // assert that the number of elements found is greater than numero
        expect(rep).to.be.greaterThan(numero - 1);
      });

    // Seleccionamos los elementos [class="gh-content-entry-title"] cuyo contenido sea igual a Titulo
    //cy.get('html').contains(Titulo).should(($elements) => {
    //	// Use the callback function to access the matched elements
    //	expect($elements).to.have.length.greaterThan(numero - 1);
    //});

    //verify how many of the class="gh-content-entry-title" have the text "Titulo Igual 1"
    //cy.get('.gh-canvas').contains(Titulo).should(($elements) => {
    // Use the callback function to access the matched elements
    //	expect($elements).to.have.length.greaterThan(numero - 1);
    //}
    //);
  },

  eliminarPost: (Titulo) => {
    //Navegamos a posts
    cy.get('[data-test-nav="posts"]').click();

    // seleccionamos los elementos [class="gh-content-entry-title"] cuyo contenido sea igual Titulo y damos click
    cy.get('[class="gh-content-entry-title"]').contains(Titulo).click();

    //damos click en opciones del post
    cy.get(".settings-menu-toggle > span").click();

    // damos click en borrar
    cy.get(".settings-menu-delete-button > .gh-btn > span").click();

    //confirmamos el borrado
    cy.get('[class="gh-btn gh-btn-red gh-btn-icon ember-view"]').click();
  },

  crearPostProgramado: (Titulo, body, fecha) => {
    //click en nuevo post
    cy.get(".ember-view.gh-secondary-action.gh-nav-new-post").click();

    //se inserta titulo del post
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view").type(Titulo);

    //se inserta contenido del post
    cy.get("p").type(body);

    //se da publicar
    cy.get('[data-test-button="publish-flow"]').click();

    // Click en publish setting
    cy.get(".gh-publish-setting.last").click();

    // Click en schedule
    cy.get(".gh-publish-schedule").should("exist").click();

    // Agregar la fecha
    cy.get(".gh-date-time-picker-date input").type(fecha);

    //da click en continuar en el final review
    cy.get('[data-test-button="continue"]').click();

    //da click en confirmacion
    cy.get('[data-test-button="confirm-publish"]').click();

    //cierra el publish flow
    cy.get('[data-test-button="close-publish-flow"]').click();

    // vuelve al editar
    cy.get(".ember-view.gh-btn-editor.gh-editor-back-button").click();

    //vuelve al dashboard
    cy.get('[data-test-nav="dashboard"]').click();
  },

  asignarTagPost: (Titulo, Tag) => {
    cy.get('[data-test-nav="posts"]').click();
    cy.get('[class="gh-content-entry-title"]').contains(Titulo).click();
    cy.wait(1000);
    cy.get('.settings-menu-toggle').click();
    cy.get('#tag-input input').type(Tag);
    cy.wait(1000);
    cy.get(".ember-power-select-option").contains(Tag).click();
    cy.wait(1000);
    cy.get('.settings-menu-toggle').click();
    cy.wait(1000);
    cy.get('[data-test-button="publish-save"]').click();
    cy.get('[data-test-button="publish-save"]').should("contain", "Update");
  },
};

export default crearPost;
