import loginPage from "./authentication";
import crearTag from "./tag"; 

const NOMBRE_ESCENARIO = 'Escenario 11 -- Paso ';

describe("Crear Tag Ghost", () => {
  beforeEach(() => {
    loginPage.visit(); 
    cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it("Login y creación de un tag", () => {
    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword(Cypress.env("password"));
    cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');

    cy.url().should("include", "/dashboard");
    cy.screenshot(NOMBRE_ESCENARIO + '4_shouldIncludeDashboard');

    //When I create a new tag
    crearTag.navegarATags();
    cy.screenshot(NOMBRE_ESCENARIO + '5_navegarATags');

    crearTag.crearTag("NombreDelTag", "DescripcionTag");
    cy.screenshot(NOMBRE_ESCENARIO + '6_crearTag');

    // Then I should have at least 1 tag of same title
    crearTag.validarTag("NombreDelTag");
    cy.screenshot(NOMBRE_ESCENARIO + '7_validarTag');
  });
});
