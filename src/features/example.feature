Feature: Example Website Navigation
  As a user
  I want to navigate the example website
  So that I can view different pages

  Background:
    Given I am on the home page

  @smoke
  Scenario: View home page
    Then I should see the home page
    And I should see the heading "Example Domain"

  @regression
  Scenario: Navigate to more information
    When I click the more information link
    Then I should be redirected to IANA's website
