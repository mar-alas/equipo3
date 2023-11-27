import crearTags from './tag';
import useAleatorioTagLimit from './tag_helper';
import tag from './tagData';

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Creación de tag nombre con límite de caracteres dentro de las fronteras, validación, signout - Aleatorio", () => {
        tag.name.limitMin = 187;
        tag.name.limitMax = 189;
        cy.useAleatorioTagNew(tag).then(newTag => {
          // When I create a new tag using "Aleatorio"
          crearTags.crearTag(newTag.name, '', true)
          // Then there should be a tag with a title newTag.name
          crearTags.validarTag(newTag.name)
          cy.signOut();
        });
    });    
});
