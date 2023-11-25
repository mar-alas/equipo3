import crearTags from './tag';
import crearPost from './post';
import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'

context("Actions", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Login con éxito, Crear tag, (Aleatorio) Crear post (A-priori), Asignar tag a post, Eliminar tag asociado a post", () => {
        cy.useAleatorioTag().then(newTag => {
            crearTags.crearTag(newTag.name, newTag.body)

            cy.useAprioriCrearPost().then((formattedPost) => {
                crearPost.crearPost(formattedPost.title, formattedPost.body);
                cy.wait(2000);
                crearPost.existePost(formattedPost.title);
                cy.wait(2000);
                crearPost.asignarTagPost(formattedPost.title, newTag.name);
            });
        });
    });    
});
