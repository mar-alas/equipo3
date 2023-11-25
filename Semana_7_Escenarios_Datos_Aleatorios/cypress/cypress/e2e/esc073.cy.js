import crearTags from './tag';
import crearPost from './post';
import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Login con éxito, Crea un tag, Validar, Editar tag, Asigna color", () => {
        cy.usePoliDinamicoTag().then(newTag => {
            crearTags.crearTag(newTag.name, '', true);
            crearTags.validarTag(newTag.name);
            crearTags.editarColorTag(newTag.name, newTag.color, true);
        });
    });    
});
