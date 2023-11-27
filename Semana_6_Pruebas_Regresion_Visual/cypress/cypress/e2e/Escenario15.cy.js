import loginPage from "./authentication";
import crearTag from "./tag"; 

const NOMBRE_ESCENARIO = 'Escenario 15 -- Paso ';

describe("Crear Tag con facebook card y eliminación", () => {
  beforeEach(() => {
    loginPage.visit(); 
    cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
  });

  it("Login, creación de tag con facebook card y eliminación", () => {
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
    crearTag.crearTag("Facebook-NombreDelTag", "Facebook-DescripcionTag");
    cy.screenshot(NOMBRE_ESCENARIO + '6_crearTag');
    
    crearTag.navegarATags();
    cy.wait(10000);
    cy.screenshot(NOMBRE_ESCENARIO + '7_navegarATags');

    crearTag.clicTag("Facebook-NombreDelTag");
    cy.wait(10000);
    cy.screenshot(NOMBRE_ESCENARIO + '8_clicTag');

    crearTag.clickExpandFacCard();
    cy.wait(5000);
    cy.screenshot(NOMBRE_ESCENARIO + '9_clickExpandFacCard');

    crearTag.writeFacCardTitleOfTag("Ejemplo facebook Meta Título");
    cy.wait(1000);
    cy.screenshot(NOMBRE_ESCENARIO + '10_writeFacCardTitleOfTag');

    crearTag.writeFacCardDescriptionOfTag("Ejemplo facebook Meta Descripción");
    cy.wait(1000);
    cy.screenshot(NOMBRE_ESCENARIO + '11_writeFacCardDescriptionOfTag');

    crearTag.saveTag("Facebook-NombreDelTag");
    cy.wait(1000);
    cy.screenshot(NOMBRE_ESCENARIO + '12_saveTag');

    crearTag.navegarATags();
    cy.wait(1000);
    cy.screenshot(NOMBRE_ESCENARIO + '13_navegarATags');

    crearTag.clicTag("Facebook-NombreDelTag");
    cy.wait(10000);
    cy.screenshot(NOMBRE_ESCENARIO + '14_clicTag');

    // Then i it should save 1 tag with facebook data
    crearTag.deleteTag();
    cy.screenshot(NOMBRE_ESCENARIO + '15_deleteTag');
  });
});
