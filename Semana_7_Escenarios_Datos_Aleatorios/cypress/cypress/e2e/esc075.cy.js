import crearTags from './tag';
import crearPost from './post';
import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Login con éxito, Crear Post, Editar post, Crear tag desde Post, signout - A-priori", () => {
        cy.useAprioriCrearPost().then((formattedPost) => {
          // When I create a new post with name formattedPost.title
            crearPost.crearPost(formattedPost.title, formattedPost.body);
            cy.wait(2000);
            crearPost.existePost(formattedPost.title);
            cy.wait(2000);
            // Then there should be a successful save button.
            crearTags.crearTagDesdePost(formattedPost.title, formattedPost.title);
            cy.signOut();
        });
        
    });    
});
