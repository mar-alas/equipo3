Feature: Gestion_Tags

@user5 @web
Scenario: ID 05 Creacion de un tag exitoso
  Given I navigate to page "http://44.200.235.109/ghost"
  And I wait for 5 seconds
  When I enter email "user@example.com"
  When I enter password "dzLY3PdWLWj:"
  When I click login
  And I wait for 5 seconds
  Then I should be on dashboard
  And I wait for 5 seconds
  Then I click list tags
  And I wait for 7 seconds
  Then I click in new tag
  Then I write the title 'sports' of the tag
  Then I write the body 'Informacion del tag' of the tag
  And I wait for 7 seconds
  Then I click in publish my tag
  And I wait for 9 seconds