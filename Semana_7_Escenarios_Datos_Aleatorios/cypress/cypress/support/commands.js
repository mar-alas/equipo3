const signin = Cypress.env("signin");
const host = Cypress.env("host");
const fs = require('fs');

// ############################# LOGIN #############################
Cypress.Commands.add("login", () => {
    cy.visit(host + "#/signin");
    cy.get(signin.selectors.email).type(signin.user.email);
    cy.get(signin.selectors.password).type(signin.user.password);
    cy.get(signin.selectors.submit).click();
});

// ############################# LOGOUT #############################
Cypress.Commands.add('signOut', () => {
    cy.visit(host + '#/signout/');
    cy.url().should('include', '/ghost/#/signin');
});

// ############################# GET ERROR #############################
Cypress.Commands.add('getFormErrorMessage', (selector) => {
    return cy.get(selector).invoke('text');
});


/**
    Obtener data a priori de una pagina basica.
    Una pagina basica solo contiene titulo y contenido como texto.
*/
Cypress.Commands.add('getAprioriDataBasicPage', () => {
    cy.readFile('./cypress/data/basic_pages_data.json').then((data) => {
        const selectedPage = data[Math.floor(Math.random() * data.length)];
    
        return {
          title: selectedPage.title,
          body: selectedPage.content
        };

    });
});

/**
    Obtener data a priori de etiquetas de html.
*/
Cypress.Commands.add('getAprioriDataHTMLtags', () => {
    cy.readFile('./cypress/data/html_tags_data.json').then((data) => {
        const selected = data[Math.floor(Math.random() * data.length)];
    
        return {
            title: selected.title,
            body: selected.etiqueta_html
        };

    });
});

/**
    Obtener data a priori de etiquetas Markdown
*/
Cypress.Commands.add('getAprioriDataMarkdown', () => {
    cy.readFile('./cypress/data/Markdown_tags_data.json').then((data) => {
        const selected = data[Math.floor(Math.random() * data.length)];
    
        return {
            title: selected.title,
            body: selected.markdown
        };

    });
});

/**
    Obtener data a priori de urls de imagenes.
*/
Cypress.Commands.add('getAprioriDataImagesUrl', () => {
    cy.readFile('./cypress/data/images_url_data.json').then((data) => {
        const selected = data[Math.floor(Math.random() * data.length)];
    
        return {
            title: selected.title,
            body: selected.image_url
        };

    });
});

/**
    Obtener data a priori de EMOJIS con palabras aleatorias.
*/
Cypress.Commands.add('getAprioriEmojisWithText', () => {
    cy.readFile('./cypress/data/emojis_and_random_text.json').then((data) => {
        const selected = data[Math.floor(Math.random() * data.length)];
    
        return {
            text: selected.text,
            emoji: selected.emoji
        };

    });
});

/**
 * Obtener data a priori de caracteres extraños y simbolos de poco uso.
 */
Cypress.Commands.add('getAprioriSpecialCharacteres', () => {
    cy.readFile('./cypress/data/random_string.json').then((data) => {
        const selected = data[Math.floor(Math.random() * data.length)];
    
        return {
            text: selected.datos
        };

    });
});

/**
 * Obtener data a priori de numeros largos.
 */
Cypress.Commands.add('getAprioriLargeNumbers', () => {
    cy.readFile('./cypress/data/numeros_largos.json').then((data) => {
        const selected = data[Math.floor(Math.random() * data.length)];
    
        return {
            text: selected.n
        };

    });
});


/** 
 * Obtener una pagina desde API con titulo y texto simple.
*/
Cypress.Commands.add('getBasicDataPageWithSimpleTextAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/basic_page_content.json",
        headers: {
            'X-API-Key': "ce8f67e0",
        },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');

        return { 
            title: response.body.title, 
            text: response.body.text
        };
    });
});
