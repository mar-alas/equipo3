import crearTags from './tag';
import crearPost from './post';
import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Login con éxito, Crear dos tags, Validacion de slug de segundo tag que contenga un 2 ", () => {
        cy.useAleatorioTag().then(newTag => {
            crearTags.crearTag(newTag.name, newTag.body)
            crearTags.crearTag(newTag.name, newTag.body)
            crearTags.validarTag(newTag.name)
            crearTags.validarSlugContains2(newTag.name)
        });
    });    
});
