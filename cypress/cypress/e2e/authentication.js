import randomText from "./suppFunctions";


class LoginEntity {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

const loginPage = {

  strategy: '',
  loginEntity: undefined,

  visit: () => {
    cy.visit(Cypress.env("host"));
  },
  
  fillEmail: () => {
    cy.get('#identification').clear().type(loginPage.loginEntity.email);
  },
  
  fillPassword: () => {
    cy.get('#password').clear().type(loginPage.loginEntity.password);
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
      expect(errorText).to.equal(message);
    });
  },

  forgot: () => {
    cy.get('#ember4').click();
  },

  setStrategy: (strategy) => {
    switch (strategy) {
      case 'pool':
          // Leer archivo con users y claves
          const email = "equipo3@uniandes.edu.co";
          const password = "Equipo3123#";
          loginPage.loginEntity = new LoginEntity(email, password);
          break;
      case 'dynamic':
          // Llamar a API de Mockaroo
          loginPage.loginEntity = new LoginEntity("", "");
          break;
      case 'random':
          // llamar a Faker
          loginPage.loginEntity = new LoginEntity("", "");
          break;
      default:
          throw new Error(`Invalid strategy type: ${newStrategy}`);
  }
  },
};

export default loginPage;