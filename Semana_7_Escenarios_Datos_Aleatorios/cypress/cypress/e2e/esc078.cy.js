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

    it("Login con éxito, Crear page, Editar page, Crear tag desde page, signout - A-priori", () => {
        cy.useAprioriCrearPost().then((formattedPost) => {
            crearPagina.navegarAPages();
            // When I create a new page with name formattedPost.title
            crearPagina.crearPagina(formattedPost.title, formattedPost.body);
            cy.wait(2000);
            crearPagina.navegarAPages();
            // Then there should be a button with the confirmation text when saving the tag on the page
            crearTags.crearTagDesdePagina(formattedPost.title, formattedPost.title+'-tag');
            cy.signOut();
        });
        
    });    
});
