
import loginPage from "./authentication";
import crearPagina from "./pagina"; 

const NOMBRE_ESCENARIO = 'Escenario 035 -- Paso ';
const TAKE_SCREENSHOT = false;
const BUG_TSDC64_IS_SOLVED = false;
/** 
 * 🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑
 * Este escenario falla.
 * La incidencia se encuentra reportada en Jira.
 * Link: https://uniandes-miso-pruebas-automatizadas-equipo-01.atlassian.net/browse/TSDC-64
 * 
 * NOTA IMPORTANTE: habilite el flag BUG_TSDC64_SOLVED a true para validar si ya esta solucionado.
 * 🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑
*/
describe("Login exitoso luego crear pagina con emojis en el titulo y texto simple en el contenido", () => {
  beforeEach(() => {
    loginPage.visit();
    if(TAKE_SCREENSHOT) {
        cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
    }
  });

  it("Login y creación de un page", () => {
    loginPage.fillEmail(Cypress.env("username")); 
    if(TAKE_SCREENSHOT) { 
        cy.screenshot(NOMBRE_ESCENARIO + '1_fillEmail');
    }

    loginPage.fillPassword(Cypress.env("password"));
    if(TAKE_SCREENSHOT) { 
        cy.screenshot(NOMBRE_ESCENARIO + '2_fillPassword');
    }

    loginPage.submitLoginForm();
    if(TAKE_SCREENSHOT) { 
        cy.screenshot(NOMBRE_ESCENARIO + '3_submitLoginForm');
    }

    cy.url().should("include", "/dashboard");
    if(TAKE_SCREENSHOT) { 
        cy.screenshot(NOMBRE_ESCENARIO + '4_shouldIncludeDashboard');
    }

    crearPagina.navegarAPages();
    cy.wait(10000);
    if(TAKE_SCREENSHOT) { 
        cy.screenshot(NOMBRE_ESCENARIO + '5_navegarAPages');
    }

    //When I create a new page
    if (BUG_TSDC64_IS_SOLVED) {
        cy.getAprioriEmojisWithText().then((data) => {
            crearPagina.crearPaginaConTituloYContenido(data.emoji, data.text);
            cy.wait(10000);
            if(TAKE_SCREENSHOT) { 
                cy.screenshot(NOMBRE_ESCENARIO + '6_crearPaginaConTituloYContenido');
            }

            //Then I should have the page correcly
            crearPagina.revisarContenidoPagina(data.emoji, data.text);
            cy.wait(10000);
            if(TAKE_SCREENSHOT) { 
                cy.screenshot(NOMBRE_ESCENARIO + '7_revisarContenidoPaginaConUrlDeImagen');
            }
        });
    } else {
        cy.log("🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑");
        cy.log('Este caso de prueba está fallando debido a un bug conocido. Referirse a la incidencia #TSDC-64 en Jira.');
        cy.log("🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑");
    }
	

    // When I signout
    loginPage.signout();
    if(TAKE_SCREENSHOT) { 
        cy.screenshot(NOMBRE_ESCENARIO + '8_signout');
    }

    // Then I should be on the signin page
    cy.url().should('include', '/signin');
    if(TAKE_SCREENSHOT) { 
        cy.screenshot(NOMBRE_ESCENARIO + '9_shouldIncludeSignin');
    }
  });
});
