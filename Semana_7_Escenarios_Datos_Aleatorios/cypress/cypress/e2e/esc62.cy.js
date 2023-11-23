import crearTags from './tag';
import useAleatorioTag from './tag_helper';

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Tags-62 - Creación de tag, validación signout - Aleatorio", () => {
        cy.useAleatorioTag().then(newTag => {
            crearTags.crearTag(newTag.name, newTag.body)
            crearTags.validarTag(newTag.name)
            cy.signOut();
        });
    });    
});