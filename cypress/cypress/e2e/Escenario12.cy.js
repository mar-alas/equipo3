import loginPage from "./authentication";
import crearTag from "./tag"; 

const NOMBRE_ESCENARIO = 'Escenario 12 -- Paso ';

describe("Crear 3 Tags con validación", () => {
  beforeEach(() => {
    loginPage.visit();
    cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it("Login y creación de 3 tags", () => {
    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword(Cypress.env("password"));
    cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');

    cy.url().should("include", "/dashboard");
    cy.screenshot(NOMBRE_ESCENARIO + '4_shouldIncludeDashboard');

    //When I create 3 new tags
    crearTag.navegarATags();
    cy.screenshot(NOMBRE_ESCENARIO + '5_navegarATags');

    crearTag.crearTag("NombreDelTag1", "DescripcionTag1");
    cy.wait(1000);
    cy.screenshot(NOMBRE_ESCENARIO + '6_crearTag');

    // Then I should have at least 1 tag of same title
    crearTag.validarTag("NombreDelTag1");
    cy.screenshot(NOMBRE_ESCENARIO + '7_validarTag');

    crearTag.crearTag("NombreDelTag2", "DescripcionTag2");
    cy.wait(1000);
    cy.screenshot(NOMBRE_ESCENARIO + '8_crearTag');

    // Then I should have at least 1 tag of same title
    crearTag.validarTag("NombreDelTag2");
    cy.screenshot(NOMBRE_ESCENARIO + '9_validarTag');

    crearTag.crearTag("NombreDelTag3", "DescripcionTag3");
    cy.wait(1000);
    cy.screenshot(NOMBRE_ESCENARIO + '10_crearTag');

    // Then I should have at least 1 tag of same title
    crearTag.validarTag("NombreDelTag3");
    cy.screenshot(NOMBRE_ESCENARIO + '11_validarTag');
  });
});
