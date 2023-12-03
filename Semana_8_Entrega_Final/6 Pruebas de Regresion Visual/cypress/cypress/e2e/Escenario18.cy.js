
import loginPage from "./authentication";
import crearPagina from "./pagina"; 

const NOMBRE_ESCENARIO = 'Escenario 18 -- Paso ';

describe("Crear pagina Ghost", () => {
  beforeEach(() => {
    loginPage.visit(); 
    cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it("Login y creación de un page luego eliminarla", () => {
    loginPage.fillEmail(Cypress.env("username"));
    cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword(Cypress.env("password"));
    cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');

    cy.url().should("include", "/dashboard");
    cy.screenshot(NOMBRE_ESCENARIO + '4_shouldIncludeDashboard');

    crearPagina.navegarAPages();
    cy.wait(10000);
    cy.screenshot(NOMBRE_ESCENARIO + '5_navegarAPages');

    //When I create a new page
	  crearPagina.crearPagina("Mi pagina 3");
    cy.wait(20000);
    cy.screenshot(NOMBRE_ESCENARIO + '6_crearPagina');

    //Then I should have the page correcly
    crearPagina.existePage("Mi pagina 3");
    cy.wait(10000);
    cy.screenshot(NOMBRE_ESCENARIO + '7_existePage');

    crearPagina.eliminarPage("Mi pagina 3")
    cy.wait(10000);
    cy.screenshot(NOMBRE_ESCENARIO + '8_eliminarPage');

    crearPagina.noExistePage("Mi pagina 3");
    cy.wait(10000);
    cy.screenshot(NOMBRE_ESCENARIO + '9_noExistePage');
    
    // When I signout
    loginPage.signout();
    cy.screenshot(NOMBRE_ESCENARIO + '10_signout');

    // Then I should be on the signin page
    cy.url().should('include', '/signin');
    cy.screenshot(NOMBRE_ESCENARIO + '11_shouldIncludeSignin');
    
  });
});
