import crearTags from './tag';
import useAprioriTag from './tag_helper';

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Login con éxito, Crear tag, Eliminar, Validar eliminar - A-priori", () => {
        cy.useAprioriTag().then(newTag => {
          // When I create two tags
          crearTags.crearTag(newTag.name+' uno', newTag.body)
          crearTags.crearTag(newTag.name+' dos', newTag.body)
          crearTags.eliminarTag(newTag.name+' uno')
          // Then there should be only one tag created
          crearTags.validarEliminar(newTag.name+' uno')
        });
    });    
});
