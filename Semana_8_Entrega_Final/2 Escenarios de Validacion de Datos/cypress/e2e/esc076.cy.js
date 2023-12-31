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

    it("Login con éxito, Crear tag, Editar tag, asignar imagen de Unsplash - Aleatorio", () => {
        tag.name.limitMin = 3;
        tag.name.limitMax = 8;
        tag.description.limitMin = 10;
        tag.description.limitMax = 15;
        cy.useAleatorioTagNew(tag).then(newTag => {
          // When I create a new tag with name newTag.name
            crearTags.crearTag(newTag.name, newTag.description)
            crearTags.validarTag(newTag.name)
            // Then there should be a successful save button.
            crearTags.editarImagenTag(newTag.name, newTag.animalName)
        });
        
    });    
});
