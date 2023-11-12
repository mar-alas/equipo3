
import loginPage from "./authentication";
import crearPagina from "./pagina"; 

describe("Crear pagina Ghost", () => {
  beforeEach(() => {
    loginPage.visit(); 
  });

  it("Login y creación de 3 pages iguales", () => {
    loginPage.fillEmail("j.puentesn@uniandes.edu.co"); 
    loginPage.fillPassword("gcEFAQ9!5e-fR=a");
    loginPage.submitLoginForm();
    cy.url().should("include", "/dashboard");

    crearPagina.navegarAPages();
    cy.wait(30000);

    //When I create 3 same pages
	  crearPagina.crearPagina("Mi pagina xyz");
    cy.wait(20000);
    crearPagina.navegarAPages();
    cy.wait(20000);
    crearPagina.crearPagina("Mi pagina xyz");
    cy.wait(20000);
    crearPagina.navegarAPages();
    cy.wait(20000);
    crearPagina.crearPagina("Mi pagina xyz");
    cy.wait(20000);
    crearPagina.navegarAPages();
    cy.wait(20000);

    crearPagina.existenPagesRepetidas("Mi pagina xyz",3);

    
  });
});
