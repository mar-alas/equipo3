const loginPage = {
    visit: () => {
      cy.visit('http://44.200.235.109/ghost');
    },
    
    fillEmail: (email) => {
      cy.get('#identification').type(email);
    },
    
    fillPassword: (password) => {
      cy.get('#password').type(password);
    },
    
    submitLoginForm: () => {
      cy.get('button[type="submit"]').click();
    },

    signout: () => {
        cy.get('#ember33').click();
        cy.get('.dropdown-item.user-menu-signout').click();
    },
  };
  
  export default loginPage;
  