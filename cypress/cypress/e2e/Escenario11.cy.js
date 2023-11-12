import loginPage from "./authentication";
import crearTag from "./tag"; 

describe("Crear Tag Ghost", () => {
  beforeEach(() => {
    loginPage.visit(); 
  });

  it("Login y creación de un tag", () => {
    loginPage.fillEmail(Cypress.env("username")); 
    loginPage.fillPassword(Cypress.env("password"));
    loginPage.submitLoginForm();
    cy.url().should("include", "/dashboard");

    crearTag.navegarATags();
    crearTag.crearTag("NombreDelTag", "DescripcionTag");
    crearTag.validarTag("NombreDelTag");
  });
});
