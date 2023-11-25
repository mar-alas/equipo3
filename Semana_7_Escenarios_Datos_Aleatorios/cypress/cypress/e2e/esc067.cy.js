import crearTags from './tag';
import crearPost from './post';
import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Login con éxito, Crear Tag, Verificar, Cambiar slug de navegación - Aleatorio", () => {
        cy.useAleatorioTag().then(newTag => {
            crearTags.crearTag(newTag.name, newTag.body)
            crearTags.validarTag(newTag.name)
            // Editar tag, cambiar slug de navegación, valida cambio
            crearTags.editarSlugTag(newTag.name, newTag.slugSymbol, true)
        });
    });    
});
