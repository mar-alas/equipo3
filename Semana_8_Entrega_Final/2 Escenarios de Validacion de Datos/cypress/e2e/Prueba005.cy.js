const { faker } = require('@faker-js/faker');

context("Actions", () => {
    beforeEach(() => {
      // Given I log in in ghost
      cy.login();
    });

    it("No se valida caracteres especiales en email de nuevo miembro", () => {
        const faker_name = faker.lorem.words();
        let faker_email = faker.internet.email()
        faker_email = faker_email.substring(0, 2) + '?%&$' + faker_email.substring(2);

        cy.get(".gh-nav-top").contains("Members").click();
        cy.wait(1000);
        cy.get("[data-test-new-member-button='true']").click();
        cy.get('[data-test-input="member-name"]').type(faker_name);
        cy.get('[data-test-input="member-email"]').type(faker_email);
        cy.wait(1000);
        cy.get("[data-test-button='save']").contains("Save").click();
        cy.get("[data-test-button='save']").should("contain", "Saved");


    });    
});