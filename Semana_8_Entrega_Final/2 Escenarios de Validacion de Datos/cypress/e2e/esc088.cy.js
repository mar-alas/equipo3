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

    it("Login con éxito, Crear tag, Editar tag, asignar imagen de Unsplash Facebook - Aleatorio", () => {
        tag.name.limitMin = 3;
        tag.name.limitMax = 8;
        tag.description.limitMin = 10;
        tag.description.limitMax = 15;
        cy.useAleatorioTagNew(tag).then(newTag => {
          // When I create a new tag
          crearTags.crearTag(newTag.name, newTag.description)
          crearTags.validarTag(newTag.name)
          // Then there should be a save confirmation button with new image
          crearTags.editarImagenFacebookTag(newTag.name, newTag.animalName, true)
        });
        
    });    
});
