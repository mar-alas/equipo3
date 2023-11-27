const loginPage = {
    visit: () => {
      cy.visit(Cypress.env("host"));
    },
    
    fillEmail: (email) => {
      cy.get('#identification').clear().type(email);
    },
    
    fillPassword: (password) => {
      cy.get('#password').clear().type(password);
    },
    
    submitLoginForm: () => {
      cy.get('button[type="submit"]').click();
    },

    signout: () => {
        cy.get('.w3.mr1.fill-darkgrey').click();
        cy.get('.dropdown-item.user-menu-signout').click();
    },

    error: (message) => {
      cy.get('p.main-error').should(($errorElement) => {
        const errorText = $errorElement.text().trim();
        expect(errorText).to.match(message);
      });
    },

    forgot: () => {
      cy.get('#ember4').click();
    },
  };
  
  export default loginPage;
  