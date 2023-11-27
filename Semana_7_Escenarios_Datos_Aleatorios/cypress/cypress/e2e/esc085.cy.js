import crearTags from './tag';
import useAleatorioTag from './tag_helper';
import tag from './tagData';

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Login con éxito, Crear tag,  agregar Code injection Tag header - Aleatorio", () => {
        cy.useAprioriTag().then(newTag => {
          // When I create a new tag
          crearTags.crearTag(newTag.name, newTag.body)
          // Then there should be a save confirmation button.
          cy.useAprioriRandStringTag().then(newString => {
              crearTags.agregarCodeInjectionTagHeader(newTag.name, newString.string, true)
          });
          cy.signOut();
        });
    });    
});