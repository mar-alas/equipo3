import crearTags from './tag';
import crearPost from './post';

import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Login con éxito, Crear page, Editar page, Crear tag desde page, signout - A-priori", () => {
        cy.useAprioriCrearPost().then((formattedPost) => {
            crearPost.crearPost(formattedPost.title, formattedPost.body);
            cy.wait(2000);
            crearPost.existePost(formattedPost.title);
            cy.wait(2000);
            crearTags.crearTagDesdePost(formattedPost.title, formattedPost.title);
            cy.signOut();
        });
        
    });    
});
