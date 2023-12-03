import loginPage from "./authentication";
import crearTag from "./tag"; 

describe("Crear 3 Tags con validación", () => {
  beforeEach(() => {
    loginPage.visit(); 
  });

  it("Login y creación de 3 tags", () => {
    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    loginPage.fillPassword(Cypress.env("password"));
    loginPage.submitLoginForm();
    cy.url().should("include", "/dashboard");

    //When I create 3 new tags
    crearTag.navegarATags();
    crearTag.crearTag("NombreDelTag1", "DescripcionTag1");
    cy.wait(1000);
    // Then I should have at least 1 tag of same title
    crearTag.validarTag("NombreDelTag1");
    crearTag.crearTag("NombreDelTag2", "DescripcionTag2");
    cy.wait(1000);
    // Then I should have at least 1 tag of same title
    crearTag.validarTag("NombreDelTag2");
    crearTag.crearTag("NombreDelTag3", "DescripcionTag3");
    cy.wait(1000);
    // Then I should have at least 1 tag of same title
    crearTag.validarTag("NombreDelTag3");
  });
});
