const signin = Cypress.env("signin");
const host = Cypress.env("host");

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

