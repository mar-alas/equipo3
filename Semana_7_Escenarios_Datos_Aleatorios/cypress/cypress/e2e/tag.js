const crearTags = {

  crearTag: (name, description='', save=true) => {

    cy.get(".gh-nav-top").contains("Tags").click();
		cy.wait(1000);
		cy.url().should('include', '#/tags');
		cy.get(".gh-canvas-header-content").contains("New tag").click();
		cy.wait(1000);
    cy.get(".gh-main-section-content")
			.contains("Name")
			.click()
			.type(name, { parseSpecialCharSequences: false });
    if (description != '') {
      cy.get(".gh-main-section-content")
			.contains("Description")
			.click()
			.type(description, { parseSpecialCharSequences: false });
    }
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
  editarSlugTag: (name, slug, save=true) => {
    cy.get(".gh-nav-top").contains("Tags").click();
    cy.wait(1000);
    cy.get('[class="gh-tag-list-name"]').contains(name).click({force: true});
    cy.get('[data-test-input="tag-slug"]').clear();
    cy.get('[data-test-input="tag-slug"]').type(slug, { parseSpecialCharSequences: false });
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
  },
  editarName: (name='', newName, save=true) => {
    cy.get(".gh-nav-top").contains("Tags").click();
    cy.wait(1000);
    if (name == '') {
      cy.get('.gh-tag-list-title').first().click();
      cy.wait(1000);
    } else {
      cy.get('.gh-tag-list-title').contains(name).click();
      cy.wait(1000);
    }

    cy.get('[data-test-input="tag-name"]').clear();
    cy.get('[data-test-input="tag-name"]').type(newName);
    if (save) {
      cy.get(".gh-canvas-header-content").contains("Save").click();
      cy.get(".gh-canvas-header-content").should("contain", "Saved");
    }
  },
  eliminarTag: (name) => {
    cy.get(".gh-nav-top").contains("Tags").click();
    cy.get('.gh-tag-list-title').contains(name).click();
    cy.on('uncaught:exception', () => false)
    cy.get('[data-test-button="delete-tag"]').click();
    cy.get('[data-test-button="confirm"]').click();
  },
  validarEliminar: (name) => {
    cy.get(".gh-nav-top").contains("Tags").click();
    cy.wait(2000);
    cy.get('.gh-tag-list-name').contains(name).should('not.exist');
  },
  editarColorTag: (name, color, save=true) => {
    cy.get(".gh-nav-top").contains("Tags").click();
    cy.wait(1000);
    cy.get('[class="gh-tag-list-name"]').contains(name).click({force: true});
    cy.get('[data-test-input="accentColor"]').clear();
    cy.get('[data-test-input="accentColor"]').type(color, { parseSpecialCharSequences: false });
    if (save) {
      cy.get(".gh-canvas-header-content").contains("Save").click();
      cy.get(".gh-canvas-header-content").should("contain", "Saved");
    }
  },
  validarSlugContains2: (name) => {
    cy.get(".gh-nav-top").contains("Tags").click();
    cy.wait(1000);
    let ultimoElementoQueContieneName;
    cy.get('[class="gh-tag-list-name"]').each(($el, index, $list) => {
        if ($el.text().includes(name)) {
            ultimoElementoQueContieneName = $el;
        }
    }).then(() => {
        if (ultimoElementoQueContieneName) {
            cy.wrap(ultimoElementoQueContieneName).click({ force: true });
        }
    });
    cy.get('[data-test-input="tag-slug"]').invoke('val').should('match', /2$/);
  },
  crearTagDesdePost: (Titulo, name) => {
    cy.get('[class="gh-content-entry-title"]').contains(Titulo).click();
    cy.wait(1000);
    cy.get('.settings-menu-toggle').click();
    cy.wait(1000);
    cy.get('#tag-input input').type(name);
    cy.wait(1000);
    cy.get(".ember-power-select-options").click();
    cy.get('.settings-menu-toggle').click();
    cy.get('[data-test-button="publish-save"]').click();
    cy.get('[data-test-button="publish-save"]').should("contain", "Update");
  },
  editarImagenTag: (name, imageText, save=true) => {
    cy.get(".gh-nav-top").contains("Tags").click();
    cy.wait(1000);
    cy.get('[class="gh-tag-list-name"]').contains(name).click({force: true});
    cy.get('.gh-image-uploader-unsplash').click();
    cy.wait(3000);
    cy.get('.gh-unsplash-search').type(imageText);
    cy.wait(3000);
    if (save) {
      cy.get('.gh-unsplash-photo-container').first().trigger('mouseover');
      cy.wait(3000);
      cy.get('.gh-unsplash-photo-footer .gh-unsplash-button').first().contains('Insert image').click();
      cy.wait(1000);
      cy.get(".gh-canvas-header-content").contains("Save").click();
      cy.get(".gh-canvas-header-content").should("contain", "Saved");
    }
  },
  

};

export default crearTags;
  