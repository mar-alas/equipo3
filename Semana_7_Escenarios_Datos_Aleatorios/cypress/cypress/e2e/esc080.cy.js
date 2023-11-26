import crearTags from './tag';
import useAleatorioTag from './tag_helper';

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Creación de tag con datos numericos, validación signout - Aleatorio", () => {
        cy.useAleatorioTag().then(newTag => {
            let title = newTag.bigNumber*80;
            let body = newTag.bigNumber*100;
            crearTags.crearTag(title, body)
            cy.wait(2000);
            crearTags.validarTag(title.toString())
            cy.signOut();
        });
    });    
});