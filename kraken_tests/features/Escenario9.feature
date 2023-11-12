Feature: PruebasE2EGhost

@user9 @web
Scenario: Escenario 9 - Crear post 1, crear post 2, editar post 2, validar edicion 
  Given I navigate to page "http://localhost:2368/ghost"
  
  When I login to ghost
  And I wait for 2 seconds
 
  When I edit post with Title "Titulo 3" with the content "ContenidoEditado"

  