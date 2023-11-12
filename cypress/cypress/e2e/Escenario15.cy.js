import loginPage from "./authentication";
import crearTag from "./tag"; 

describe("Crear Tag con facebook card y eliminación", () => {
  beforeEach(() => {
    loginPage.visit(); 
  });

  it("Login, creación de tag con facebook card y eliminación", () => {
    loginPage.fillEmail(Cypress.env("username")); 
    loginPage.fillPassword(Cypress.env("password"));
    loginPage.submitLoginForm();
    cy.url().should("include", "/dashboard");

    crearTag.navegarATags();
    crearTag.crearTag("Facebook-NombreDelTag", "Facebook-DescripcionTag");
    crearTag.navegarATags();
    cy.wait(10000);
    crearTag.clicTag('Facebook-NombreDelTag');
    cy.wait(10000);
    crearTag.clickExpandFacCard();
    cy.wait(5000);
    crearTag.writeFacCardTitleOfTag('Ejemplo facebook Meta Título');
    cy.wait(1000);
    crearTag.writeFacCardDescriptionOfTag('Ejemplo facebook Meta Descripción');
    cy.wait(1000);
    crearTag.saveTag('Facebook-NombreDelTag');
    cy.wait(1000);
    crearTag.navegarATags();
    cy.wait(1000);
    crearTag.clicTag('Facebook-NombreDelTag');
    cy.wait(10000);
    crearTag.deleteTag();
    
  });
});
