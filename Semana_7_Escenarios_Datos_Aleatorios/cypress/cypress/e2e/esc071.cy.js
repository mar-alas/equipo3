import crearTags from './tag';
import crearPost from './post';
import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'

context("Actions", () => {
    beforeEach(() => {
        // Given I log in in ghost
      cy.login();
    });

    it("Login con éxito, Crear tag, (Aleatorio) Crear post (A-priori), Asignar tag a post, Eliminar tag asociado a post", () => {
        cy.useAleatorioTag().then(newTag => {
            // When I create a new tag with name newTag.name
            crearTags.crearTag(newTag.name, newTag.body)

            cy.useAprioriCrearPost().then((formattedPost) => {
              crearPost.crearPost(formattedPost.title, formattedPost.body);
              cy.wait(2000);
              crearPost.existePost(formattedPost.title);
              cy.wait(2000);
              // Then there should be a successful save button.
              crearPost.asignarTagPost(formattedPost.title, newTag.name);
            });
        });
    });    
});
