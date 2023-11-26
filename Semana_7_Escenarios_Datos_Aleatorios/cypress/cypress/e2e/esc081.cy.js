import crearTags from './tag';
import crearPost from './post';
import crearPagina from './pagina';

import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Login con éxito, Crear page, Crear tag desde menú contextual, signout - A-priori", () => {
        cy.useAprioriCrearPost().then((formattedPost) => {
            crearPagina.navegarAPages();
            crearPagina.crearPagina(formattedPost.title, formattedPost.body);
            cy.wait(2000);
            crearPagina.navegarAPages();
            crearTags.crearTagDesdeMenuContextual(formattedPost.title, formattedPost.title+'-tag');
            cy.wait(2000);
            crearTags.validarTag(formattedPost.title+'-tag');
            cy.signOut();
        });
        
    });    
});
