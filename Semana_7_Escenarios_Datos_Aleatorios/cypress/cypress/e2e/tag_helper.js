const fs = require('fs');
const { faker } = require('@faker-js/faker');
const fetch = require('node-fetch'); 

// ____________________ A-Priori _____________________________
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
// _____________________ Faker _______________________________

Cypress.Commands.add('useAleatorioTag', () => {
    let paragraphs;
    do {
        paragraphs = faker.lorem.paragraphs();
    } while (paragraphs.length >= 500);

    const faker_name = faker.lorem.words();
    const faker_body = paragraphs;
    const faker_slug_symbol = faker.string.symbol(15);
    const faker_name_emoji = faker.internet.emoji({ types: ['food', 'nature'] });
    const faker_bignumber = faker.number.int({ min: 999999999999999});

    const formattedTag = {
        name: faker_name,
        body: faker_body,
        slugSymbol: faker_slug_symbol,
        nameEmoji: faker_name_emoji,
        bigNumber: faker_bignumber
      };
      return formattedTag;
});
// _____________________ Pooli dinamico ______________________

Cypress.Commands.add('usePoliDinamicoTag', () => {
    // const apiKey = 'b560e3a0';
    // const apiUrl = 'https://my.api.mockaroo.com/crear_tag.json';
    const apiKey = 'a0a07e50';
    const apiUrl = 'https://my.api.mockaroo.com/tag.json';

    return cy.request({
        method: 'GET',
        url: apiUrl,
        headers: {
            'X-API-Key': apiKey,
        },
    }).then(response => {
        if (response.status !== 200) {
            console.error('Non-200 status code:', response.status);
            throw new Error('Non-200 status code');
        }

        const tag_name = response.body.name;
        const tag_body = response.body.description;
        const tag_color = response.body.color.slice(1);
        const tag_image = response.body.image;

        return { name: tag_name, body: tag_body, color: tag_color, image: tag_image };
    });
});

Cypress.Commands.add('useAleatorioTagNew', (tag = {}) => {

    let paragraphs;
    do {
        paragraphs = faker.lorem.paragraphs();
    } while (paragraphs.length <= tag.description.limitMax);

    const faker_description = faker.string.sample({ min: tag.description.limitMin, max: tag.description.limitMax }) 

    const length = faker.number.int({ min:tag.name.limitMin, max: tag.name.limitMax });
    const faker_name = faker.string.hexadecimal({ length: length })

    const faker_body = paragraphs;
    const faker_slug_symbol = faker.string.symbol(15);
    const faker_animal_name = faker.animal.type();

    const faker_meta_title = faker.string.sample({ min: tag.metaData.metaTitle.limitMin, max: tag.metaData.metaTitle.limitMax }) 
    const faker_meta_description = faker.string.sample({ min: tag.metaData.metaDescription.limitMin, max: tag.metaData.metaDescription.limitMax })

    const fakeer_xcard_title = faker.string.sample({ min: tag.xCard.title.limitMin, max: tag.xCard.title.limitMax })
    const fakeer_xcard_description = faker.string.sample({ min: tag.xCard.description.limitMin, max: tag.xCard.description.limitMax })

    const faker_fac_ogg_title = faker.string.sample({ min: tag.facCard.oggTitle.limitMin, max: tag.facCard.oggTitle.limitMax })
    const faker_fac_ogg_description = faker.string.sample({ min: tag.facCard.oggDescription.limitMin, max: tag.facCard.oggDescription.limitMax })

    let faker_name_emoji = '🚨';
    for (let i = 0; i < length; i++) {
        faker_name_emoji += faker.internet.emoji();
    }

    const formattedTag = {
        name: faker_name,
        body: faker_body,
        description: faker_description,
        slugSymbol: faker_slug_symbol,
        nameEmoji: faker_name_emoji,
        animalName: faker_animal_name,
        metaTitle: faker_meta_title,
        metaDescription: faker_meta_description,
        xCardTitle: fakeer_xcard_title,
        xCardDescription: fakeer_xcard_description,
        facOggTitle: faker_fac_ogg_title,
        facOggDescription: faker_fac_ogg_description,
    };
    return formattedTag;
});

// ____________________ A-Priori numeros___________
Cypress.Commands.add('useAprioriCaracteresTag', () => {
    cy.readFile('./cypress/data/numeros_largos.json').then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const random = data[randomIndex];
        const randomString = {
            string: random.n,
          };
        return randomString;
      });

});

// ____________________ A-Priori caracteres especiales___________
Cypress.Commands.add('useAprioriRandStringTag', () => {
    cy.readFile('./cypress/data/random_string.json').then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const random = data[randomIndex];
        const randomString = {
            string: random.datos,
          };
        return randomString;
      });
});

