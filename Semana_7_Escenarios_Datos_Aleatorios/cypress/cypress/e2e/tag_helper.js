
const fs = require('fs');
const { faker } = require('@faker-js/faker');
const fetch = require('node-fetch'); 

// ________________________esto es usando a priori_____________________________
Cypress.Commands.add('useAprioriTag', () => {
    cy.readFile('./cypress/data/tag_data.json').then((data) => {
        // Function to get a random item from the data
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomTag = data[randomIndex];
    
        // Using the a-priori strategy to create a tag
        const formattedTag = {
            name: randomTag.tag_name,
            body: randomTag.tag_body,
          };
    
        // Return the formatted email
        return formattedTag;
      });

});
// ________________________esto es usando a faker_____________________________

Cypress.Commands.add('useAleatorioTag', () => {
    let paragraphs;
    do {
        paragraphs = faker.lorem.paragraphs();
    } while (paragraphs.length >= 500);

    const faker_name = faker.lorem.words();
    const faker_body = paragraphs;

    const formattedTag = {
        name: faker_name,
        body: faker_body,
      };
      return formattedTag;
});
// _______________________usando poli dinamico ________________

Cypress.Commands.add('usePoliDinamicoTag', () => {
    const apiKey = 'b560e3a0';
    const apiUrl = 'https://my.api.mockaroo.com/crear_tag.json';

    return cy.request({
        method: 'GET',
        url: apiUrl,
        headers: {
            'X-API-Key': apiKey,
        },
    }).then(response => {
        if (response.status !== 200) {
            // Log any non-200 status code
            console.error('Non-200 status code:', response.status);
            throw new Error('Non-200 status code');
        }

        const tag_name = response.body.tag_name;
        const tag_body = response.body.tag_body;

        return { name: tag_name, body: tag_body };
    });
});