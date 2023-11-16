Feature: PruebasE2EGhost

@user1 @web
Scenario: Escenario 1 - Creacion y validacion de un post 
  Given I navigate to ghost
  When I login to ghost
  And I wait for 2 seconds
  When I create a new post called "hola" with "Informacion de mi post hola" information
  When I finish the publication of my post
  When I go to posts 
  Then I should have at least 1 post with title "hola"
  When I click signout
  Then I should be in authentication page