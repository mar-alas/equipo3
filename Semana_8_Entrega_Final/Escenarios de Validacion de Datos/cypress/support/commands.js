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


/** 
 * Obtener html tags desde API.
*/
Cypress.Commands.add('getHtmlTagAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/html_tags.json",
        headers: {
            'X-API-Key': "ce8f67e0",
        },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');

        return { 
            html_tag: response.body.html_tag,
        };
    });
});


/** 
 * Obtener images desde API.
*/
Cypress.Commands.add('getImagesAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/images.json",
        headers: {
            'X-API-Key': "ce8f67e0",
        },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');

        return { 
            image: response.body.image,
        };
    });
});



/** 
 * Obtener emojis desde API.
*/
Cypress.Commands.add('getEmojisAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/emojis.json",
        headers: {
            'X-API-Key': "ce8f67e0",
        },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');

        return { 
            emoji: response.body.emoji,
        };
    });
});

/** 
 * Obtener UUID desde API.
*/
Cypress.Commands.add('getUuidAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/uuid.json",
        headers: {
            'X-API-Key': "ce8f67e0",
        },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');

        return { 
            uuid: response.body.uuid,
        };
    });
});



/** 
 * Obtener Special Characters desde API.
*/
Cypress.Commands.add('getSpecialCharacteresAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/special_characteres.json",
        headers: {
            'X-API-Key': "ce8f67e0",
        },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');

        return { 
            character: response.body.character,
        };
    });
});


/** 
 * Obtener colors in Hexadecimal desde API.
*/
Cypress.Commands.add('getColorsInShortHexadecimalAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/colors_hexadecimal.json",
        headers: { 'X-API-Key': "ce8f67e0" },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');
        return { 
            color: response.body.color,
        };
    });
});

/** 
 * Obtener user agents desde API.
*/
Cypress.Commands.add('getUserAgentAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/user_agent.json",
        headers: { 'X-API-Key': "ce8f67e0" },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');
        return { 
            user_agent: response.body.user_agent,
        };
    });
});





/** 
 * Obtener MD5 desde API.
*/
Cypress.Commands.add('getMD5API', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/md5.json",
        headers: { 'X-API-Key': "ce8f67e0" },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');
        return { 
            md5: response.body.md5,
        };
    });
});

/** 
 * Obtener coordenadas desde API.
*/
Cypress.Commands.add('getCoordenadasAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/coordenadas.json",
        headers: { 'X-API-Key': "ce8f67e0" },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');
        return { 
            coordenadas: response.body.coordenadas,
        };
    });
});




/** 
 * Obtener Direccion desde API.
*/
Cypress.Commands.add('getDireccionAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/direcciones.json",
        headers: { 'X-API-Key': "ce8f67e0" },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');
        return { 
            direccion: response.body.direccion,
        };
    });
});

/** 
 * Obtener SQL expression desde API.
*/
Cypress.Commands.add('getSqlAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/sql.json",
        headers: { 'X-API-Key': "ce8f67e0" },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');
        return { 
            sql: response.body.sql,
        };
    });
});


/** 
 * Obtener XML tag desde API.
*/
Cypress.Commands.add('getXmlAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/xml.json",
        headers: { 'X-API-Key': "ce8f67e0" },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');
        return { 
            xml: response.body.xml,
        };
    });
});

/** 
 * Obtener Credit Cards Numbers desde API.
*/
Cypress.Commands.add('getCreditCardAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/credit_card.json",
        headers: { 'X-API-Key': "ce8f67e0" },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');
        return { 
            credit_card: response.body.credit_card,
        };
    });
});


/** 
 * Obtener bitcoin address desde API.
*/
Cypress.Commands.add('getBitcoinAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/bitcoin.json",
        headers: { 'X-API-Key': "ce8f67e0" },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');
        return { 
            bitcoin: response.body.bitcoin,
        };
    });
});


/** 
 * Obtener ethereum desde API.
*/
Cypress.Commands.add('getEthereumAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/ethereum.json",
        headers: { 'X-API-Key': "ce8f67e0" },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');
        return { 
            ethereum: response.body.ethereum,
        };
    });
});

/** 
 * Obtener id_seguridad_social desde API.
*/
Cypress.Commands.add('getIdSeguridadSocialAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/id_seguridad_social.json",
        headers: { 'X-API-Key': "ce8f67e0" },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');
        return { 
            id_seguridad_social: response.body.id_seguridad_social,
        };
    });
});

/** 
 * Obtener mac address desde API.
*/
Cypress.Commands.add('getMacAddressAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/mac.json",
        headers: { 'X-API-Key': "ce8f67e0" },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');
        return { 
            mac: response.body.mac,
        };
    });
});

/** 
 * Obtener phone numbers desde API.
*/
Cypress.Commands.add('getPhoneAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/phone.json",
        headers: { 'X-API-Key': "ce8f67e0" },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');
        return { 
            phone: response.body.phone,
        };
    });
});

/** 
 * Obtener credenciales desde API.
*/
Cypress.Commands.add('getCredencialesAPI', () => {
    return cy.request({
        method: 'GET',
        url: "https://my.api.mockaroo.com/credenciales.json",
        headers: { 'X-API-Key': "ce8f67e0" },
    }).then(response => {
        if (response.status !== 200)
            throw new Error('Non-200 status code');
        return { 
            email: response.body.email,
            password: response.body.password,
        };
    });
});

Cypress.Commands.add('borrarDatosGhost', () => {
    cy.visit(host + "#/settings/labs");
    cy.wait(2000);
    cy.get('[data-testid="labs"]').find('button.rounded').click();
    cy.wait(1000);
    cy.get('div[data-testid="labs"]').find('button.bg-red').click();
    cy.wait(1000);
    cy.get('[data-testid="confirmation-modal"]').find('button.bg-red').click();
    cy.visit(host);
});

Cypress.Commands.add('borrarDatosGhostV2', () => {
    
    cy.wait(1000);
    cy.get('[href="#/settings/"]').click();
    cy.wait(1000);

    cy.get('.z-10 > .cursor-pointer > span').click();
    cy.wait(1000);
    cy.get('div[data-testid="labs"]').find('button.bg-red').click();
    cy.wait(1000);
    cy.get('[data-testid="confirmation-modal"]').find('button.bg-red').click();
    cy.visit(host);
});