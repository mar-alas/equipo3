
import loginPage from "./authentication";
import crearPagina from "./pagina"; 

const NOMBRE_ESCENARIO = 'Escenario 19 -- Paso ';

describe("Crear pagina Ghost", () => {
  beforeEach(() => {
    loginPage.visit(); 
    cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it("Login y creación de 3 pages iguales", () => {
    loginPage.fillEmail(Cypress.env("username")); 
    cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword(Cypress.env("password"));
    cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');

    cy.url().should("include", "/dashboard");
    cy.screenshot(NOMBRE_ESCENARIO + '4_shouldIncludeDashboard');

    crearPagina.navegarAPages();
    cy.wait(30000);
    cy.screenshot(NOMBRE_ESCENARIO + '5_navegarAPages');

    //When I create 3 same pages
	  crearPagina.crearPagina("Mi pagina xyz");
    cy.wait(20000);
    cy.screenshot(NOMBRE_ESCENARIO + '6_crearPagina');

    crearPagina.navegarAPages();
    cy.wait(20000);
    cy.screenshot(NOMBRE_ESCENARIO + '7_navegarAPages');

    crearPagina.crearPagina("Mi pagina xyz");
    cy.wait(20000);
    cy.screenshot(NOMBRE_ESCENARIO + '8_crearPagina');

    crearPagina.navegarAPages();
    cy.wait(20000);
    cy.screenshot(NOMBRE_ESCENARIO + '9_navegarAPages');

    crearPagina.crearPagina("Mi pagina xyz");
    cy.wait(20000);
    cy.screenshot(NOMBRE_ESCENARIO + '10_crearPagina');

    crearPagina.navegarAPages();
    cy.wait(20000);
    cy.screenshot(NOMBRE_ESCENARIO + '11_navegarAPages');

    crearPagina.existenPagesRepetidas("Mi pagina xyz",3);
    cy.screenshot(NOMBRE_ESCENARIO + '12_existenPagesRepetidas');
    
  });
});
