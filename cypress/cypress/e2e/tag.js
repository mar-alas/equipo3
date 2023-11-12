const url_base = "http://localhost:2368/ghost"
const crearTags = {

    crearTag: (Titulo, body) => {

        cy.get('[data-test-nav="tags"]').then((link) => {
        const link_href = link.attr("href");
        cy.visit(url_base + "/" + link_href);
        });

        cy.get(".gh-btn-primary").click();
  
        cy.get("#tag-name").type(Titulo);
  
        cy.get("#tag-description").type(body);

        cy.get("button.ember-view").click();
  },
  
  validarTag: (Titulo) => {
    cy.get('[data-test-link="tags-back"]').click();
    cy.get(".gh-tag-list-name").should('exist').then(($titles) => {
      $titles.each((index, element) => {
        const textContent = Cypress.$(element).text();
        console.log(`Element ${index + 1}: ${textContent}`);
      });
  
      const matchingElements = $titles.filter((index, element) => {
        return Cypress.$(element).text() === Titulo;
      });
      const total_match = matchingElements.length;

      expect(total_match > 0)
    });
  },  

  navegarATags: () => {
    cy.get('[data-test-nav="tags"]').click();
  },
  clicTag: (Titulo) => {
    cy.get('[class="gh-tag-list-name"]').contains(Titulo).should('be.visible').first().click();
	},
  clickExpandMetadata: () =>  {
    cy.get('button.gh-btn-expand').first().click();
  },
  writeMetaTitleOfTag: (metatitle) => {
    cy.get('#meta-title').type(metatitle);
  },
  writeMetaDescriptionOfTag: (metadescription) => {
    cy.get('#meta-description').type(metadescription);
  },
  saveTag: () => {
    cy.get("button.ember-view").click();
  }

  
  
};

export default crearTags;
  