import loginPage from "./authentication";
import crearTag from "./tag"; 

describe("Crear Tag con xcard", () => {
  beforeEach(() => {
    loginPage.visit(); 
  });

  it("Login, creación de tag con xcard", () => {
    loginPage.fillEmail(Cypress.env("username")); 
    loginPage.fillPassword(Cypress.env("password"));
    loginPage.submitLoginForm();
    cy.url().should("include", "/dashboard");

    crearTag.navegarATags();
    crearTag.crearTag("X-NombreDelTag", "X-DescripcionTag");
    crearTag.navegarATags();
    cy.wait(10000);
    crearTag.clicTag('X-NombreDelTag');
    cy.wait(10000);
    crearTag.clickExpandXcard();
    cy.wait(5000);
    crearTag.writeXcardTitleOfTag('Ejemplo Meta Título');
    cy.wait(1000);
    crearTag.writeXcardDescriptionOfTag('Ejemplo Meta Descripción');
    cy.wait(1000);
    crearTag.saveTag();
  });
});
