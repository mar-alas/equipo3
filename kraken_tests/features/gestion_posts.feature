Feature: Gestion_Posts

@user1 @web
Scenario: ID 05 Creacion de un post exitoso
  Given I navigate to page "http://localhost:2369/ghost"
  And I wait for 5 seconds
  When I enter email "m.alas@uniandes.edu.co"
  When I enter password "uhg!izUq.6_k*CZ"
  When I click login
  And I wait for 5 seconds
  Then I should be on dashboard
  Then I click in new post
  Then I write the title 'Mi primer post' of the post
  Then I write the body 'Informacion de mi primer post' of the post
  And I wait for 5 seconds
  Then I click in publish my post
  Then I click in Continue final review
  When I click in confirm publish
  And I wait for 5 seconds
  Then I get the boom confirmation message
  Then I click in back to editor
  Then I go back to posts