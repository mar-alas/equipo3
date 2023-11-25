import crearTags from './tag';
import useAprioriTag from './tag_helper';

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Login con éxito, Crear tag, Eliminar, Validar eliminar - A-priori", () => {
        cy.useAprioriTag().then(newTag => {
            crearTags.crearTag(newTag.name+' uno', newTag.body)
            crearTags.crearTag(newTag.name+' dos', newTag.body)
            crearTags.eliminarTag(newTag.name+' uno')
            crearTags.validarEliminar(newTag.name+' uno')
        });
    });    
});
