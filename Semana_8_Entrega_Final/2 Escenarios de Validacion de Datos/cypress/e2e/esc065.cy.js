import crearTags from './tag';
import useAleatorioTagLimit from './tag_helper';
import tag from './tagData';

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Creación de tag nombre con límite de caracteres fuera de las fronteras, validación de error - Aleatorio", () => {
        tag.name.limitMin = 200;
        tag.name.limitMax = 250;
        cy.useAleatorioTagNew(tag).then(newTag => {
          // When I create a new tag width name outside the borders
          crearTags.crearTag(newTag.name, '', false);
          cy.get('#tag-name').blur();
          cy.getFormErrorMessage('.error').then(errorMessage => {
            // Then there should be a validation message
            expect(errorMessage).to.contain('Tag names cannot be longer than 191 characters.');
          });
        });
    });
       
});
