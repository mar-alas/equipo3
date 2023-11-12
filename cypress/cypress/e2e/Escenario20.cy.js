
import loginPage from "./authentication";
import crearPagina from "./pagina"; 

describe("Crear pagina Ghost", () => {
  beforeEach(() => {
    loginPage.visit(); 
  });

  it("Login y creación de 3 pages diferentes", () => {
    loginPage.fillEmail(Cypress.env("username")); 
    loginPage.fillPassword(Cypress.env("password"));
    loginPage.submitLoginForm();
    cy.url().should("include", "/dashboard");

    crearPagina.navegarAPages();
    cy.wait(30000);

    //When I create 3 same pages
	  crearPagina.crearPagina("Mi pagina xyz1");
    cy.wait(20000);
    crearPagina.navegarAPages();
    cy.wait(20000);
    crearPagina.crearPagina("Mi pagina xyz2");
    cy.wait(20000);
    crearPagina.navegarAPages();
    cy.wait(20000);
    crearPagina.crearPagina("Mi pagina xyz3");
    cy.wait(20000);
    crearPagina.navegarAPages();
    cy.wait(20000);

    crearPagina.existenPagesRepetidas("Mi pagina xyz1",1);
    crearPagina.existenPagesRepetidas("Mi pagina xyz2",1);
    crearPagina.existenPagesRepetidas("Mi pagina xyz3",1);

    
  });
});
