import loginPage from "./authentication";
import crearTag from "./tag"; 

describe("Crear Tag con metadatos", () => {
  beforeEach(() => {
    loginPage.visit(); 
  });

  it("Login, creación de tag con metadatos", () => {
    loginPage.fillEmail("ra.castro2@uniandes.edu.co"); 
    loginPage.fillPassword("robert12345678");
    loginPage.submitLoginForm();
    cy.url().should("include", "/dashboard");

    crearTag.navegarATags();
    crearTag.crearTag("50NombreDelTag", "50DescripcionTag");
    crearTag.navegarATags();
    cy.wait(10000);
    crearTag.clicTag('50NombreDelTag');
    cy.wait(10000);
    crearTag.clickExpandMetadata();
    cy.wait(5000);
    crearTag.writeMetaTitleOfTag('Ejemplo Meta Título');
    cy.wait(1000);
    crearTag.writeMetaDescriptionOfTag('Ejemplo Meta Descripción');
    cy.wait(1000);
    crearTag.saveTag();
  });
});
