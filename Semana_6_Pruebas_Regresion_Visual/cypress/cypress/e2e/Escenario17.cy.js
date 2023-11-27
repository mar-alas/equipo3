
import loginPage from "./authentication";
import crearPagina from "./pagina"; 

const NOMBRE_ESCENARIO = 'Escenario 17 -- Paso ';
const ONE_SECOND = 1000;
const TWO_SECONDS = 2000;

describe("Crear pagina Ghost", () => {
  beforeEach(() => {
    loginPage.visit(); 
    cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it("Login y creación de un page luego editarla", () => {
    loginPage.fillEmail(Cypress.env("username")); 
    cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword(Cypress.env("password"));
    cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    cy.wait(TWO_SECONDS);
    cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');

    cy.url().should("include", "/dashboard");
    cy.screenshot(NOMBRE_ESCENARIO + '4_shouldIncludeDashboard');

    crearPagina.navegarAPages();
    cy.wait(ONE_SECOND);
    cy.screenshot(NOMBRE_ESCENARIO + '5_navegarAPages');

    //When I create a new page
	  crearPagina.crearPagina("Mi pagina 1");
    cy.wait(ONE_SECOND);
    cy.screenshot(NOMBRE_ESCENARIO + '6_crearPagina');

    //Then I should have the page correcly
    crearPagina.existePage("Mi pagina 1");
    cy.wait(ONE_SECOND);
    cy.screenshot(NOMBRE_ESCENARIO + '7_existePage');

    crearPagina.editarPagina("Mi pagina 1", "Contenido nuevo 1");
    cy.wait(ONE_SECOND);
    cy.screenshot(NOMBRE_ESCENARIO + '8_editarPagina');

    crearPagina.revisarContenidoPagina("Mi pagina 1", "Contenido nuevo 1");
    cy.screenshot(NOMBRE_ESCENARIO + '9_revisarContenidoPagina');

    // When I signout
    loginPage.signout();
    cy.wait(TWO_SECONDS);
    cy.screenshot(NOMBRE_ESCENARIO + '10_signout');

    // Then I should be on the signin page
    cy.url().should('include', '/signin');
    cy.screenshot(NOMBRE_ESCENARIO + '11_shouldIncludeSignin');
  });
});
