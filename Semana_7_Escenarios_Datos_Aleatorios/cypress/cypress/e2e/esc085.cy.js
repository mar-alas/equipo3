import crearTags from './tag';
import useAleatorioTag from './tag_helper';
import tag from './tagData';

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Login con éxito, Crear tag,  agregar Code injection Tag header - Aleatorio", () => {
        cy.useAprioriTag().then(newTag => {
            crearTags.crearTag(newTag.name, newTag.body)
            cy.useAprioriRandStringTag().then(newString => {
                crearTags.agregarCodeInjectionTagHeader(newTag.name, newString.string, true)
            });
            cy.signOut();
        });
    });    
});