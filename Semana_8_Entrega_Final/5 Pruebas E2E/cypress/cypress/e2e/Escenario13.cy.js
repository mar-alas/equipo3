import loginPage from "./authentication";
import crearTag from "./tag"; 

describe("Crear Tag con metadatos", () => {
  beforeEach(() => {
    loginPage.visit(); 
  });

  it("Login, creación de tag con metadatos", () => {
    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    loginPage.fillPassword(Cypress.env("password"));
    loginPage.submitLoginForm();
    cy.url().should("include", "/dashboard");

    crearTag.navegarATags();
    //When I create 1 new tag
    crearTag.crearTag("50NombreDelTag", "50DescripcionTag");
    crearTag.navegarATags();
    cy.wait(10000);
    crearTag.clicTag("50NombreDelTag");
    cy.wait(10000);
    crearTag.clickExpandMetadata();
    cy.wait(5000);
    crearTag.writeMetaTitleOfTag("Ejemplo Meta Título");
    cy.wait(1000);
    crearTag.writeMetaDescriptionOfTag("Ejemplo Meta Descripción");
    cy.wait(1000);
    // Then i it should save 1 tag with metadata
    crearTag.saveTag();
  });
});
