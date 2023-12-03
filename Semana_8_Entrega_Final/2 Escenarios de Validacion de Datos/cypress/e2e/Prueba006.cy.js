const { faker } = require('@faker-js/faker');

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("Permite la creación de un nuevo miembro con el campo nombre vacío", () => {
        const faker_note = faker.lorem.words(20);
        const faker_email = faker.internet.email();

        cy.get(".gh-nav-top").contains("Members").click();
        cy.wait(1000);
        cy.get("[data-test-new-member-button='true']").click();

        cy.get('[data-test-input="member-email"]').type(faker_email);
        cy.get('[data-test-input="member-note"]').type(faker_note);
        cy.wait(1000);
        cy.get("[data-test-button='save']").contains("Save").click();
        cy.get("[data-test-button='save']").should("contain", "Saved");


    });    
});