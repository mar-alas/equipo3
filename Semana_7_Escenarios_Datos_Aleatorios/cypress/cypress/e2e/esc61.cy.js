import crearTags from './tag';
import useAprioriTag from './tag_helper'

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Tags-61 - Creación de tag y validación a-priori", () => {
        cy.useAprioriTag().then(newTag => {
            crearTags.crearTag(newTag.name, newTag.body)
            crearTags.validarTag(newTag.name)
        });
    });    

});