import crearTags from './tag';
import useAleatorioTag from './tag_helper';
import tag from './tagData';

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Login con éxito, Crear de tag, agregar meta X card con límite de caracteres dentro de la frontera - Aleatorio", () => {
    
        cy.useAleatorioTagNew(tag).then(newTag => {
            
            crearTags.crearTag(newTag.name, newTag.description)
            crearTags.validarTag(newTag.name)
            crearTags.editarXcardTag(newTag.name, newTag.xCardTitle, newTag.xCardDescription, true)
            cy.signOut();
        });
    });    
});