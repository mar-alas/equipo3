import crearTags from './tag';
import crearPost from './post';
import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Login con éxito, Crear Tag, Verificar, Cambiar slug de navegación - Aleatorio", () => {
        cy.useAleatorioTag().then(newTag => {
          // When I create a new tag with name newTag.name
          crearTags.crearTag(newTag.name, newTag.body)
          crearTags.validarTag(newTag.name)
          // Then there should be a save confirmation button with the new slug
          crearTags.editarSlugTag(newTag.name, newTag.slugSymbol, true)
        });
    });    
});
