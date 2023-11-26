import crearTags from './tag';
import crearPost from './post';
import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Login con éxito, Crear dos tags, Validacion de slug de segundo tag que contenga un 2 ", () => {
        cy.useAleatorioTag().then(newTag => {
          // When I create a new tag with name newTag.name
          crearTags.crearTag(newTag.name, newTag.body)
          crearTags.crearTag(newTag.name, newTag.body)
          crearTags.validarTag(newTag.name)
          // Then there should be a slug with the number 2.
          crearTags.validarSlugContains2(newTag.name)
        });
    });    
});
