import crearTags from './tag';
import crearPost from './post';
import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'
import tag from './tagData';

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Login con éxito, Crear tag, Verificar, Editar y agregar titulo dentro de las fronteras, Validar, Signout - Aleatorio", () => {
        tag.name.limitMin = 50;
        tag.name.limitMax = 50;
        cy.useAleatorioTagNew(tag).then(newTag => {
          // When I create a new tag with name newTag.name
          crearTags.crearTag(newTag.name, newTag.description)
          crearTags.editarName('', newTag.nameEmoji, true)
          // Then there should be a save confirmation button with the new information
          crearTags.validarTag(newTag.nameEmoji)
          cy.signOut();
        });
    });    
});
