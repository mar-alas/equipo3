import loginPage from "./authentication";
import crearTag from "./tag"; 

describe("Crear Tag Ghost", () => {
  beforeEach(() => {
    loginPage.visit(); 
  });

  it("Login y creación de un tag", () => {
    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    loginPage.fillPassword(Cypress.env("password"));
    loginPage.submitLoginForm();
    cy.url().should("include", "/dashboard");

    //When I create a new tag
    crearTag.navegarATags();
    crearTag.crearTag("NombreDelTag", "DescripcionTag");
    // Then I should have at least 1 tag of same title
    crearTag.validarTag("NombreDelTag");
  });
});
