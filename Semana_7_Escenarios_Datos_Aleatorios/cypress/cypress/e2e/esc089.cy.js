import crearTags from './tag';
import useAleatorioTag from './tag_helper';
import tag from './tagData';

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Login con éxito, Crear de tag, agregar x-card title caracteres fuera de la frontera - Aleatorio", () => {
        tag.xCard.title.limitMin = 310;
        tag.xCard.title.limitMax = 600;
        tag.xCard.description.limitMin = 500;
        tag.xCard.description.limitMax = 600;
        cy.useAleatorioTagNew(tag).then(newTag => {
            crearTags.crearTag(newTag.name, newTag.description)
            crearTags.validarTag(newTag.name)
            crearTags.editarXcardTag(newTag.name, newTag.xCardTitle, newTag.xCardDescription, false)
            cy.get('.gh-canvas-title').click( {force: true} );
            cy.get(".gh-canvas-header-content").contains("Save").click();
            cy.wait(2000)
            cy.getFormErrorMessage('.gh-alert-content').then(errorMessage => {
                expect(errorMessage).to.contain('Validation error, cannot edit tag');
            });
        });
    });    
});