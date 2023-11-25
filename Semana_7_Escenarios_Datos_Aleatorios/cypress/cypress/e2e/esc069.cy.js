import crearTags from './tag';
import crearPost from './post';
import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'
import tag from './tagData';

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Login con éxito, Crear tag, Verificar, Editar y agregar descripción dentro de las fronteras, Validar, Signout - Aleatorio", () => {
        tag.name.limitMin = 50;
        tag.name.limitMax = 50;
        cy.useAleatorioTagNew(tag).then(newTag => {
            crearTags.crearTag(newTag.name, newTag.description)
            crearTags.editarName('', newTag.nameEmoji, true)
            crearTags.validarTag(newTag.nameEmoji)
            cy.signOut();
        });
    });    
});
