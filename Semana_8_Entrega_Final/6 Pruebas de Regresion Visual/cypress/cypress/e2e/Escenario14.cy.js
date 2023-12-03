import loginPage from "./authentication";
import crearTag from "./tag"; 

const NOMBRE_ESCENARIO = 'Escenario 14 -- Paso ';

describe("Crear Tag con xcard", () => {
  beforeEach(() => {
    loginPage.visit(); 
    cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it("Login, creación de tag con xcard", () => {
    // Given I log in in ghost
    loginPage.fillEmail(Cypress.env("username"));
    cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');

    loginPage.fillPassword(Cypress.env("password"));
    cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');

    loginPage.submitLoginForm();
    cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');

    cy.url().should("include", "/dashboard");
    cy.screenshot(NOMBRE_ESCENARIO + '4_shouldIncludeDashboard');

    crearTag.navegarATags();
    cy.screenshot(NOMBRE_ESCENARIO + '5_navegarATags');

    //When I create 1 new tag
    crearTag.crearTag("X-NombreDelTag", "X-DescripcionTag");
    cy.screenshot(NOMBRE_ESCENARIO + '6_crearTag');
    
    crearTag.navegarATags();
    cy.wait(10000);
    cy.screenshot(NOMBRE_ESCENARIO + '7_navegarATags');

    crearTag.clicTag("X-NombreDelTag");
    cy.wait(10000);
    cy.screenshot(NOMBRE_ESCENARIO + '8_clicTag');

    crearTag.clickExpandXcard();
    cy.wait(5000);
    cy.screenshot(NOMBRE_ESCENARIO + '9_clickExpandXcard');

    crearTag.writeXcardTitleOfTag("Ejemplo Meta Título");
    cy.wait(1000);
    cy.screenshot(NOMBRE_ESCENARIO + '10_writeXcardTitleOfTag');

    crearTag.writeXcardDescriptionOfTag("Ejemplo Meta Descripción");
    cy.wait(1000);
    cy.screenshot(NOMBRE_ESCENARIO + '11_writeXcardDescriptionOfTag');

    // Then i it should save 1 tag with x-card data
    crearTag.saveTag();
    cy.screenshot(NOMBRE_ESCENARIO + '12_saveTag');
  });
});
