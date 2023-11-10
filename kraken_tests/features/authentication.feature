Feature: Autenticacion

@user1 @web
Scenario: ID 01 Login exitoso
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
Scenario: ID 02 Login con password y contrasena vacia
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
Scenario: ID 03 Login email no registrado
Given I navigate to page "http://44.200.235.109/ghost"
  And I wait for 5 seconds
  When I enter email "invalid_email@uniandes.edu.co"
  When I enter password "invalid_pass"
  When I click login
  And I wait for 5 seconds
  Then I should get an error 'There is no user with that email address.'
  And I wait for 5 seconds
  When I enter email "user@example.com"
  When I enter password "dzLY3PdWLWj:"
  When I click login
  And I wait for 5 seconds
  Then I should be on dashboard
  Then I click signout
  And I wait for 5 seconds
  Then I should be in authentication page

@user4 @web
Scenario: ID 04 Olvidar contrasena con email no registrado
Given I navigate to page "http://44.200.235.109/ghost"
  And I wait for 5 seconds
  When I enter email "invalid_email@uniandes.edu.co"
  When I click forget
  And I wait for 5 seconds
  Then I should get an error 'User not found.'
  And I wait for 5 seconds
  When I enter email "user@example.com"
  When I enter password "dzLY3PdWLWj:"
  When I click login
  And I wait for 5 seconds
  Then I should be on dashboard
  Then I click signout
  And I wait for 5 seconds
  Then I should be in authentication page

