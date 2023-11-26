import crearTags from './tag';
import crearPost from './post';
import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Login con éxito, Crea un tag, Validar, Editar tag, Asigna color", () => {
        cy.usePoliDinamicoTag().then(newTag => {
          // When I create a new tag with name newTag.name
          crearTags.crearTag(newTag.name, '', true);
          crearTags.validarTag(newTag.name);
          // Then there should be a save button with the assigned color.
          crearTags.editarColorTag(newTag.name, newTag.color, true);
        });
    });    
});
