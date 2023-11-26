import crearTags from './tag';
import crearPost from './post';
import crearPagina from './pagina';

import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Login con éxito, Crear page, Editar page, Crear tag desde page, signout - A-priori", () => {
        cy.useAprioriCrearPost().then((formattedPost) => {
            crearPagina.navegarAPages();
            crearPagina.crearPagina(formattedPost.title, formattedPost.body);
            cy.wait(2000);
            crearPagina.navegarAPages();
            crearTags.crearTagDesdePagina(formattedPost.title, formattedPost.title+'-tag');
            cy.signOut();
        });
        
    });    
});
