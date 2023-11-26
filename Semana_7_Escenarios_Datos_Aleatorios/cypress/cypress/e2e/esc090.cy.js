import crearTags from './tag';
import useAleatorioTag from './tag_helper';
import tag from './tagData';

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Login con éxito, Crear de tag, agregar facebook caracteres fuera de la frontera - Aleatorio", () => {
        tag.facCard.oggTitle.limitMin = 310;
        tag.facCard.oggTitle.limitMax = 600;
        tag.facCard.oggTitle.limitMin = 500;
        tag.facCard.oggDescription.limitMax = 600;
        cy.useAleatorioTagNew(tag).then(newTag => {
            crearTags.crearTag(newTag.name, newTag.description)
            crearTags.validarTag(newTag.name)
            crearTags.editarMetaFacebookTag(newTag.name, newTag.facOggTitle, newTag.facOggDescription, false)
            cy.get('.gh-canvas-title').click( {force: true} );
            cy.get(".gh-canvas-header-content").contains("Save").click();
            cy.wait(2000)
            cy.getFormErrorMessage('.gh-alert-content').then(errorMessage => {
                expect(errorMessage).to.contain('Validation error, cannot edit tag');
            });
        });
    });    
});