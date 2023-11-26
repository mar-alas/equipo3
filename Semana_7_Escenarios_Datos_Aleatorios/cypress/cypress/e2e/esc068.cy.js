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

    it("Login con éxito, Crear tag, Verificar, Editar y agregar descripción dentro de las fronteras, Validar, Signout - Aleatorio", () => {
        tag.description.limitMin = 498;
        tag.description.limitMax = 499;
        cy.useAleatorioTagNew(tag).then(newTag => {
          // When I create a new tag with name newTag.name
          crearTags.crearTag(newTag.name, newTag.description)
          // Then there should be a save confirmation button with the new description
          crearTags.validarTag(newTag.name)
          cy.signOut();
        });
    });    
});
