import crearTags from './tag';
import useAleatorioTag from './tag_helper';
import tag from './tagData';

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Login con éxito, Crear de tag, agregar meta Facebook con límite de caracteres dentro de la frontera - Aleatorio", () => {
    
        cy.useAleatorioTagNew(tag).then(newTag => {
            // When I create a new tag
            crearTags.crearTag(newTag.name, newTag.description)
            crearTags.validarTag(newTag.name)
            // Then there should be a save confirmation button.
            crearTags.editarMetaFacebookTag(newTag.name, newTag.facOggTitle, newTag.facOggDescription, true)
            cy.signOut();
        });
    });    
});