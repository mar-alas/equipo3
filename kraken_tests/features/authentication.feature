Feature: Autenticacion

@user1 @web
Scenario: ID 01 Login exitoso
  Given I navigate to page "http://localhost:2369/ghost"
  And I wait for 5 seconds
  When I enter email "m.alas@uniandes.edu.co"
  When I enter password "uhg!izUq.6_k*CZ"
  When I click login
  And I wait for 5 seconds
  Then I should be on dashboard

@user2 @web
Scenario: ID 02 Login con password y contrasena vacia
Given I navigate to page "http://localhost:2369/ghost"
  And I wait for 5 seconds
  When I click login
  And I wait for 5 seconds
  Then I should get an error 'Please fill out the form to sign in.'

@user3 @web
Scenario: ID 03 Login email no registrado
Given I navigate to page "http://localhost:2369/ghost"
  And I wait for 5 seconds
  When I enter email "invalid_email@uniandes.edu.co"
  When I enter password "invalid_pass"
  When I click login
  And I wait for 5 seconds
  Then I should get an error 'There is no user with that email address.'

