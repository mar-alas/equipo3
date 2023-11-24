import crearTags from './tag';
import useAprioriTag from './tag_helper';

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Creación de tag y validación de creación - Pool a-priori", () => {
        cy.useAprioriTag().then(newTag => {
            crearTags.crearTag(newTag.name, newTag.body)
            crearTags.validarTag(newTag.name)
        });
    });    

});