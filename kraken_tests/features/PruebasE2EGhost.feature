Feature: PruebasE2EGhost

@user1 @web
Scenario: Escenario 1 - Descripcion 
  Given I navigate to page "http://44.200.235.109/ghost"
  And I wait for 5 seconds
  When I enter email "user@example.com"
  When I enter password "dzLY3PdWLWj:"
  When I click login
  And I wait for 5 seconds
  Then I should be on dashboard
  Then I click signout
  And I wait for 5 seconds
  Then I should be in authentication page

@user2 @web
Scenario: Escenerio2 - Descripcion
  Given I navigate to page "http://44.200.235.109/ghost"
    And I wait for 5 seconds
    When I click login
    And I wait for 5 seconds
    Then I should get an error 'Please fill out the form to sign in.'
    And I wait for 5 seconds
    When I enter email "user@example.com"
    When I enter password "dzLY3PdWLWj:"
    When I click login
    And I wait for 5 seconds
    Then I should be on dashboard
    Then I click signout
    And I wait for 5 seconds
    Then I should be in authentication page

@user3 @web
Scenario: Escenario1
Given I navigate to page "http://44.200.235.109/ghost"



