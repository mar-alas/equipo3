import crearTags from './tag';
import crearPost from './post';
import usePoliDinamicoTag from './tag_helper';
import useAprioriCrearPost from './posts_helper'
import tag from './tagData';

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Login con éxito, Crear tag, Editar tag, Unsplash cadena de caracteres larga  - Aleatorio", () => {
        cy.useAprioriTag().then(newTag => {
          // When I create a new tag with name newTag.name
            crearTags.crearTag(newTag.name, newTag.description)
            crearTags.validarTag(newTag.name)

            cy.useAprioriCaracteresTag().then(caracteres => {
                const mensajesPosibles = [
                    'No photos found for',
                    'Trouble reaching the'
                ];
               
                crearTags.editarImagenTag(newTag.name, caracteres.string.repeat(10), false)
                cy.wait(7000);
                // Then there should be a images not found message
                cy.getFormErrorMessage('h4').then(errorMessage => {
                    const contieneAlgunMensaje = mensajesPosibles.some(mensaje => errorMessage.includes(mensaje));
                    expect(contieneAlgunMensaje).to.be.true;
                });
            })
            
        });
        
    });    
});
