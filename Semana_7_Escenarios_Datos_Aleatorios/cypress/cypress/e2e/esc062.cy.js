import crearTags from './tag';
import useAleatorioTag from './tag_helper';

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Creación de tag, validación signout - Aleatorio", () => {
        cy.useAleatorioTag().then(newTag => {
          // When I create a new tag using "Aleatorio"
          crearTags.crearTag(newTag.name, newTag.body)
          // Then there should be a tag with a title newTag.name
          crearTags.validarTag(newTag.name)
          cy.signOut();
        });
    });    
});