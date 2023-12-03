
import loginPage from "./authentication";
import crearPagina from "./pagina"; 

const NOMBRE_ESCENARIO = 'Escenario 034 -- Paso ';
const TAKE_SCREENSHOT = false;

describe("Login exitoso luego crear una pagina cargando una URL con una IMAGEN", () => {
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
    cy.getAprioriDataImagesUrl().then((data) => {
        crearPagina.crearPaginaConTituloYContenido(data.title, data.body);
        cy.wait(10000);
        if(TAKE_SCREENSHOT) { 
            cy.screenshot(NOMBRE_ESCENARIO + '6_crearPaginaConTituloYContenido');
        }

        //Then I should have the page correcly
        crearPagina.revisarContenidoPaginaConUrlDeImagen(data.title, data.body);
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
