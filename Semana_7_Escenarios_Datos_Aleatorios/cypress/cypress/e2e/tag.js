const crearTags = {

  crearTag: (name, description, save=true) => {

    cy.get(".gh-nav-top").contains("Tags").click();
		cy.wait(1000);
		cy.url().should('include', '#/tags');
		cy.get(".gh-canvas-header-content").contains("New tag").click();
		cy.wait(1000);
    cy.get(".gh-main-section-content")
			.contains("Name")
			.click()
			.type(name, { parseSpecialCharSequences: false });
    cy.get(".gh-main-section-content")
			.contains("Description")
			.click()
			.type(description, { parseSpecialCharSequences: false });
    if (save) {
      cy.get(".gh-canvas-header-content").contains("Save").click();
		  cy.get(".gh-canvas-header-content").should("contain", "Saved");
    }
		
		cy.wait(1000);

  },
  
  validarTag: (name) => {
    cy.get('[data-test-link="tags-back"]').click();
    cy.get('.gh-tag-list-name').then(tagList => {
        const exists = Array.from(tagList).some(tag => tag.innerText === name);
        expect(exists).to.be.true;
    });
  },  

  navegarATags: () => {
    cy.get('[data-test-nav="tags"]').click();
  },
  clicTag: (Titulo) => {
    cy.get('[class="gh-tag-list-name"]').contains(Titulo).first().click();
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
  // X
  clickExpandXcard: () =>  {
    cy.get('button.gh-btn-expand').eq(1).click();
  },
  writeXcardTitleOfTag: (xtitle) => {
    cy.get('#twitter-title').type(xtitle);
  },
  writeXcardDescriptionOfTag: (xdescription) => {
    cy.get('#twitter-description').type(xdescription);
  },
  // Facebook
  clickExpandFacCard: () =>  {
    cy.get('button.gh-btn-expand').eq(2).click();
  },
  writeFacCardTitleOfTag: (xtitle) => {
    cy.get('#og-title').type(xtitle);
  },
  writeFacCardDescriptionOfTag: (xdescription) => {
    cy.get('#og-description').type(xdescription);
  },
  saveTag: () => {
    cy.get("button.ember-view").click();
  },
  deleteTag:() => {
    cy.get('[data-test-button="delete-tag"]').click();
    cy.wait(3000); 
    cy.get('[data-test-button="confirm"]').click();
  },
  editarSlug: (name, slug, save=true) => {
    cy.get(".gh-nav-top").contains("Tags").click();
    cy.get('[class="gh-tag-list-name"]').contains(name).click();
    cy.get('[data-test-input="tag-slug"]').clear();
    cy.get('[data-test-input="tag-slug"]').type(slug);
    if (save) {
      cy.get(".gh-canvas-header-content").contains("Save").click();
		  cy.get(".gh-canvas-header-content").should("contain", "Saved");
    }
  },
  editarDescripcion: (name, description, save=true) => {
    cy.get(".gh-nav-top").contains("Tags").click();
    cy.get('[class="gh-tag-list-name"]').contains(name).click();
    cy.get('[data-test-input="tag-description"]').clear();
    cy.get('[data-test-input="tag-description"]').type(description);
    if (save) {
      cy.get(".gh-canvas-header-content").contains("Save").click();
      cy.get(".gh-canvas-header-content").should("contain", "Saved");
    }
  }

};

export default crearTags;
  