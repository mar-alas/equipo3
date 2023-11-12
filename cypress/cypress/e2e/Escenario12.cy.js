import loginPage from "./authentication";
import crearTag from "./tag"; 

describe("Crear 3 Tags con validación", () => {
  beforeEach(() => {
    loginPage.visit(); 
  });

  it("Login y creación de 3 tags", () => {
    loginPage.fillEmail("ra.castro2@uniandes.edu.co"); 
    loginPage.fillPassword("robert12345678");
    loginPage.submitLoginForm();
    cy.url().should("include", "/dashboard");

    crearTag.navegarATags();
    crearTag.crearTag("NombreDelTag1", "DescripcionTag1");
    cy.wait(1000);
    crearTag.validarTag("NombreDelTag1");
    crearTag.crearTag("NombreDelTag2", "DescripcionTag2");
    cy.wait(1000);
    crearTag.validarTag("NombreDelTag2");
    crearTag.crearTag("NombreDelTag3", "DescripcionTag3");
    cy.wait(1000);

    
    
    crearTag.validarTag("NombreDelTag3");
  });
});
