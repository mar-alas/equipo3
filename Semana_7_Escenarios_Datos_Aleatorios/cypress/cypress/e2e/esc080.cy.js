import crearTags from './tag';
import useAleatorioTag from './tag_helper';

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Creación de tag con datos numericos, validación signout - Aleatorio", () => {
        cy.useAleatorioTag().then(newTag => {
            let title = newTag.bigNumber*80;
            let body = newTag.bigNumber*100;
            // When I create a new tag with large number and large description
            crearTags.crearTag(title, body)
            cy.wait(2000);
            // Then there should be a tag with a long numeric title.
            crearTags.validarTag(title.toString())
            cy.signOut();
        });
    });    
});