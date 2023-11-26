import crearTags from './tag';
import crearPost from './post';
import crearPagina from './pagina';

import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Login con éxito, Crear page, Crear tag desde menú contextual, signout - A-priori", () => {
        cy.useAprioriCrearPost().then((formattedPost) => {
            crearPagina.navegarAPages();
            // When I create a new page
            crearPagina.crearPagina(formattedPost.title, formattedPost.body);
            cy.wait(2000);
            crearPagina.navegarAPages();
            crearTags.crearTagDesdeMenuContextual(formattedPost.title, formattedPost.title+'-tag');
            cy.wait(2000);
            // Then there should be a tag with a title formattedPost.title+'-tag'
            crearTags.validarTag(formattedPost.title+'-tag');
            cy.signOut();
        });
        
    });    
});
