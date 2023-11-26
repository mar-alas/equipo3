import crearTags from './tag';
import usePoliDinamicoTag from './tag_helper';

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Creación de tag, validación signout - PoolDinamico", () => {
        cy.usePoliDinamicoTag().then(newTag => {
          // When I create a new tag using "PoolDinamico"
          crearTags.crearTag(newTag.name, newTag.body)
          // Then there should be a page with a title newTag.name
          crearTags.validarTag(newTag.name)
          cy.signOut();
        });
    });    
});