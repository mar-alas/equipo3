Feature: PruebasE2EGhost

@user2 @web
Scenario: Escenario 6 - Login sin datos, login con email no registrado, login con exito
    Given I navigate to ghost
    Given I delete all content from ghost
    When I click login
    Then I should get an error 'Please fill out the form to sign in.'
    When I enter email using "aleatorio"
    When I enter a password for my 1 email
    When I click login
    Then I should get an error 'There is no user with that email address.'
    When I login to ghost
    And I wait for 3 seconds
    Then I should be on dashboard
    When I click signout
    Then I should be in authentication page