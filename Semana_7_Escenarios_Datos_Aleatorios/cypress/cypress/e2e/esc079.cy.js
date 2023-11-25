import crearTags from './tag';
import usePoliDinamicoTag from './tag_helper';

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Login con éxito, Crear tag con descripción, sin titulo, validación de error - PoolDinamico", () => {
        cy.usePoliDinamicoTag().then(newTag => {
            crearTags.crearTag(' ', newTag.body, false)
            cy.getFormErrorMessage('.response').then(errorMessage => {
                expect(errorMessage).to.contain('You must specify a name for the tag.');
            });
        });
    });    
});