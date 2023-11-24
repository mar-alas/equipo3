import crearTags from './tag';
import useAleatorioTagLimit from './tag_helper';
import tag from './tagData';

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Creación de tag nombre con límite de caracteres dentro de las fronteras, validación, signout - Aleatorio", () => {
        tag.name.limit = 190;
        cy.useAleatorioTagNew(tag).then(newTag => {
            crearTags.crearTag(newTag.name, newTag.body)
            crearTags.validarTag(newTag.name)
            cy.signOut();
        });
    });    
});
