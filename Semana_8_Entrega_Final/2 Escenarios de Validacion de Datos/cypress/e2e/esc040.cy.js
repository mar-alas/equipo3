
import loginPage from "./authentication";
import crearPagina from "./pagina"; 

const NOMBRE_ESCENARIO = 'Escenario 040 -- Paso ';
const TAKE_SCREENSHOT = false;
const TWO_SECONDS = 2000;

describe("Login exitoso luego crear pagina con numero largos en el tiutlo y numeros largos en el contenido", () => {
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

    //borrar datos ghost
    cy.borrarDatosGhostV2()
    cy.wait(TWO_SECONDS);

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
    cy.getAprioriLargeNumbers().then((data) => {
        crearPagina.crearPaginaConTituloYContenido(data.text, data.text);
        cy.wait(10000);
        if(TAKE_SCREENSHOT) { 
            cy.screenshot(NOMBRE_ESCENARIO + '6_crearPaginaConTituloYContenido');
        }
        //Then I should have the page correcly
        crearPagina.revisarContenidoPagina(data.text, data.text);
        cy.wait(10000);
        if(TAKE_SCREENSHOT) { 
            cy.screenshot(NOMBRE_ESCENARIO + '7_revisarContenidoPaginaConUrlDeImagen');
        }
    });
	

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
