import crearTags from './tag';
import useAleatorioTagLimit from './tag_helper';
import tag from './tagData';

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Tags-64 - Creación de tag con límite de caracteres validación signout - Aleatorio", () => {
        tag.name.limit = 190;
        cy.useAleatorioTagNew(tag).then(newTag => {
            crearTags.crearTag(newTag.name, newTag.body)
            crearTags.validarTag(newTag.name)
            cy.signOut();
        });
    });    
});
