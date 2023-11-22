
const fs = require('fs');
const { faker } = require('@faker-js/faker');
const fetch = require('node-fetch'); 

// ________________________esto es usando a priori_____________________________
Cypress.Commands.add('useAprioriCorreo', () => {
    cy.readFile('./cypress/data/email_data.json').then((email_data) => {
        // Function to get a random item from the data
        const randomIndex = Math.floor(Math.random() * email_data.length);
        const randomPost = email_data[randomIndex];
    
        // Using the a-priori strategy to create a email
        const formattedEmail = {
            email: randomPost.email,
            password: randomPost.password,
          };
    
        // Return the formatted email
        return formattedEmail;
      });

});

// ________________________esto es usando a faker_____________________________

Cypress.Commands.add('useAleatorioCrearCorreo', () => {
    const faker_email = faker.internet.email();
    const faker_password = faker.internet.password();


    const formattedEmail = {
        email: faker_email,
        password: faker_password,
    };
    return formattedEmail;
});

// _______________________usando poli dinamico ________________

Cypress.Commands.add('usePoliDinamicoCrearEmail', () => {
    const apiKey = 'b560e3a0';
    const apiUrl = 'https://my.api.mockaroo.com/email_pass.json';

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

        const data_email = response.body.email;
        const data_password = response.body.date;

        return { email: data_email, password: data_password };
    });
});