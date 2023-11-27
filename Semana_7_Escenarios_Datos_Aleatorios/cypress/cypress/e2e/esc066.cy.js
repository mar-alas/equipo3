import crearTags from './tag';
import crearPost from './post';
import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Login con éxito, Crear tag, Validar,  Crear Post, Asociar post, signout - PoolDinamico", () => {
        cy.usePoliDinamicoTag().then(newTag => {
          // When I create a new tag with name newTag.name
          crearTags.crearTag(newTag.name, newTag.body)
          crearTags.validarTag(newTag.name)

          cy.useAprioriCrearPost().then((formattedPost) => {
            crearPost.crearPost(formattedPost.title, formattedPost.body);
            cy.wait(2000);
            crearPost.existePost(formattedPost.title);
            cy.wait(2000);
            // Then there should be a save confirmation button with tag assigned
            crearPost.asignarTagPost(formattedPost.title, newTag.name);
          });

        });
        

    });    
});
