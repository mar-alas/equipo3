import crearTags from './tag';
import usePoliDinamicoTag from './tag_helper';

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Login con éxito, Crear tag con descripción, sin titulo, validación de error - PoolDinamico", () => {
        cy.usePoliDinamicoTag().then(newTag => {
          // When I create a new tag without name
            crearTags.crearTag(' ', newTag.body, false)
            // Then there should be a validation message
            cy.getFormErrorMessage('.response').then(errorMessage => {
                expect(errorMessage).to.contain('You must specify a name for the tag.');
            });
        });
    });    
});