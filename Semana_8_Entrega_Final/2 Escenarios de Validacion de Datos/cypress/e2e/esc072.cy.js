import crearTags from './tag';
import crearPost from './post';
import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'
import tag from './tagData';

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Login con éxito, Crea tag, Edita slug con límite fuera de fronteras, Valida mensaje de error", () => {
        cy.usePoliDinamicoTag().then(newTag => {
            let originalString = newTag.name;
            let repeatedString = originalString.repeat(100);
            // When I create a new tag with name newTag.name
            crearTags.crearTag(newTag.name, '', true);
            crearTags.validarTag(newTag.name);
            crearTags.editarSlugTag(newTag.name, repeatedString, false);
            cy.get('#tag-slug').blur();
            // Then there should be validation message
            cy.getFormErrorMessage('.response').then(errorMessage => {
                expect(errorMessage).to.contain('URL cannot be longer than 191 characters.');
            });
        });
    });    
});
