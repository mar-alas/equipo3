import loginPage from "./authentication";
import crearPagina from "./pagina"; 
const { faker } = require('@faker-js/faker');

const NOMBRE_ESCENARIO = 'Escenario 059 -- Paso ';
const TAKE_SCREENSHOT = false;

describe("Login exitoso, crear pagina con titulo  y contenido de texto simple y luego editar el titulo y contenido con numeros de telefono expuestos por una API", () => {
  beforeEach(() => {
    loginPage.visit();
    if(TAKE_SCREENSHOT) {
        cy.screenshot(NOMBRE_ESCENARIO + '0_visit');
    }
  });

  it("Login y creación de un page y luego edicion", () => {
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
    const initial_title = faker.lorem.words();
    const text = faker.lorem.words();
    crearPagina.crearPaginaConTituloYContenido(initial_title, text);
    cy.wait(10000);
    if(TAKE_SCREENSHOT) { 
        cy.screenshot(NOMBRE_ESCENARIO + '6_crearPaginaConTituloYContenido');
    }
    //Then I should have the page correcly
    crearPagina.revisarContenidoPagina(initial_title, text);
    cy.wait(10000);
    if(TAKE_SCREENSHOT) { 
        cy.screenshot(NOMBRE_ESCENARIO + '7_revisarContenidoPaginaConUrlDeImagen');
    }

    // Then i edit thge page with data API
    cy.getPhoneAPI().then((data) => {
        // When I edit the page
        const content = data.phone;
        crearPagina.editarPagina(initial_title, content);
        cy.wait(10000);
        if(TAKE_SCREENSHOT) { 
            cy.screenshot(NOMBRE_ESCENARIO + '7_editarPagina');
        }

        //Then I should have the page edited correcly
        crearPagina.revisarContenidoPagina(initial_title, content);
        cy.wait(10000);
        if(TAKE_SCREENSHOT) { 
            cy.screenshot(NOMBRE_ESCENARIO + '7_revisarContenidoPagina');
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
