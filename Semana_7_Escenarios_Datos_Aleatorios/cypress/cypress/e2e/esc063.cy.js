import crearTags from './tag';
import usePoliDinamicoTag from './tag_helper';

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Tags-63 - Creación de tag, validación signout - PoolDinamico", () => {
        cy.usePoliDinamicoTag().then(newTag => {
            crearTags.crearTag(newTag.name, newTag.body)
            crearTags.validarTag(newTag.name)
            cy.signOut();
        });
    });    
});