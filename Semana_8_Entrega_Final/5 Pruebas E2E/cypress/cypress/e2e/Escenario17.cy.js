
import loginPage from "./authentication";
import crearPagina from "./pagina"; 

describe("Crear pagina Ghost", () => {
  beforeEach(() => {
    loginPage.visit(); 
  });

  it("Login y creación de un page luego editarla", () => {
    loginPage.fillEmail(Cypress.env("username")); 
    loginPage.fillPassword(Cypress.env("password"));
    loginPage.submitLoginForm();
    cy.url().should("include", "/dashboard");

    crearPagina.navegarAPages();
    cy.wait(10000);

    //When I create a new page
	  crearPagina.crearPagina("Mi pagina 1");
    cy.wait(10000);

    //Then I should have the page correcly
    crearPagina.existePage("Mi pagina 1");
    cy.wait(10000);

    crearPagina.editarPagina("Mi pagina 1", "Contenido nuevo 1");
    cy.wait(20000);

    crearPagina.revisarContenidoPagina("Mi pagina 1", "Contenido nuevo 1");
    
    // When I signout
    loginPage.signout();

    // Then I should be on the signin page
    cy.url().should('include', '/signin');
    
  });
});
