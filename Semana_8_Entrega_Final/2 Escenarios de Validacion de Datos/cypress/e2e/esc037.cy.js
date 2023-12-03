
import loginPage from "./authentication";
import crearPagina from "./pagina"; 

const NOMBRE_ESCENARIO = 'Escenario 037 -- Paso ';
const TAKE_SCREENSHOT = false;
const BUG_TSDC66_IS_SOLVED = false;
/** 
 * 🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑
 * Este escenario falla.
 * La incidencia se encuentra reportada en Jira.
 * Link: https://uniandes-miso-pruebas-automatizadas-equipo-01.atlassian.net/browse/TSDC-66
 * 
 * NOTA IMPORTANTE: habilite el flag BUG_TSDC66_SOLVED a true para validar si ya esta solucionado.
 * 🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑
*/

describe("Login exitoso luego crear pagina con caracteres extraños en el titulo y sin contenido", () => {
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
    if(BUG_TSDC66_IS_SOLVED) {
        cy.getAprioriSpecialCharacteres().then((data) => {
            crearPagina.crearPaginaConTituloConContenidoEnBlanco(data.text);
            cy.wait(10000);
            if(TAKE_SCREENSHOT) { 
                cy.screenshot(NOMBRE_ESCENARIO + '6_crearPaginaConTituloSinContenido');
            }
            //Then I should have the page correcly
            crearPagina.revisarContenidoPagina(data.text);
            cy.wait(10000);
            if(TAKE_SCREENSHOT) { 
                cy.screenshot(NOMBRE_ESCENARIO + '7_revisarContenidoPaginaConUrlDeImagen');
            }
        });
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
