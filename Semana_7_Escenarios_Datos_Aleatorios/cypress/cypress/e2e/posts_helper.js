const fs = require('fs');
const { faker } = require('@faker-js/faker');
const fetch = require('node-fetch'); 

// ________________________esto es usando a priori_____________________________
Cypress.Commands.add('useAprioriCrearPost', () => {
    cy.readFile('./cypress/data/post_data.json').then((postsData) => {
        // Function to get a random item from the data
        const randomIndex = Math.floor(Math.random() * postsData.length);
        const randomPost = postsData[randomIndex];
    
        // Using the a-priori strategy to create a post
        const formattedPost = {
          title: randomPost.title,
          body: randomPost.content,
          date: randomPost.date,
        };
    
        // Return the formatted post
        return formattedPost;
      });

});
// ________________________esto es usando a faker_____________________________

Cypress.Commands.add('useAleatorioCrearPost', () => {
        const faker_title = faker.lorem.words();
        const faker_body = faker.lorem.paragraphs();
        const faker_date = faker.date.future();
        const year = faker_date.getFullYear();
        const month = String(faker_date.getMonth() + 1).padStart(2, '0');
        const day = String(faker_date.getDate()).padStart(2, '0');
        const faker_formatted_date = `${year}-${month}-${day}`;

        const formattedPost = {
            title: faker_title,
            body: faker_body,
            date: faker_formatted_date,
        };
        return formattedPost;
});

// // _______________________usando poli dinamico ________________

Cypress.Commands.add('usePoliDinamicoCrearPost', () => {
    const apiKey = 'b560e3a0';
    const apiUrl = 'https://my.api.mockaroo.com/crear_post.json';

    return cy.request({
        method: 'GET',
        url: apiUrl,
        headers: {
            'X-API-Key': apiKey,
        },
    }).then(response => {
        // Log the entire response to see its structure
        console.log('API Response:', response);

        if (response.status !== 200) {
            // Log any non-200 status code
            console.error('Non-200 status code:', response.status);
            throw new Error('Non-200 status code');
        }

        // Assuming your data structure has properties named 'title' and 'date'
        const data_title = response.body.title;
        const data_date = response.body.date;
        const data_content = response.body.content

        // Return the formatted data
        return { title: data_title, content: data_content, date: data_date };
    });
});

