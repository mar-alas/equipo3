import crearTags from './tag';
import useAprioriTag from './tag_helper';

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Creación de tag y validación de creación - Pool a-priori", () => {
        cy.useAprioriTag().then(newTag => {
          // When I create a new tag using "a-priori"
          crearTags.crearTag(newTag.name, newTag.body)
          // Then there should be a tag with a title newTag.name
          crearTags.validarTag(newTag.name)
        });
    });    

});