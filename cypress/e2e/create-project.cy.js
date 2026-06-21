/// <reference types="cypress" />

import LoginPage from '../support/page-objects/LoginPage';
import ProjectPage from '../support/page-objects/ProjectPage';
import usersData from '../fixtures/users.json';

// Ignore ResizeObserver errors (harmless)
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('ResizeObserver')) {
    return false;
  }
});

describe('Create Project Flow', () => {
  const loginPage = new LoginPage();
  const projectPage = new ProjectPage();
  const testUser = usersData.users.testUser;

  beforeEach(() => {
    loginPage.login(testUser.email, testUser.password);
    projectPage.visit();
  });

  it('should create an AI Survey project, publish it, visit the survey, and answer a question', () => {
    // 1. Open Create Project modal, select Survey, and create
    projectPage.clickAddProject();
    projectPage.selectProjectType('Survey');
    projectPage.clickCreate();

    // 2. Wait for draft dialog, fill goal, and draft
    projectPage.waitForGenerateDialog();
    projectPage.fillLearningGoal('Test learning goal for AI');
    projectPage.clickDraft();

    // 3. Wait for draft dialog to close and URL to change to project detail
    projectPage.generateDialog.should('not.exist', { timeout: 30000 });
    cy.url({ timeout: 60000 }).should('match', /\/projects\/[a-f0-9-]{36}/);

    // 4. Publish the project
    projectPage.publishProject();

    // 5. Extract the survey URL from the publish dialog
    let surveyUrl;
    cy.get('[data-test="publish-link-display"]')
      .invoke('text')
      .then((text) => {
        surveyUrl = text.trim();
        cy.log(`Survey URL: ${surveyUrl}`);

        // 6. Visit the survey URL
        cy.visit(surveyUrl);

        // 7. Wait for the survey question textarea
        cy.get('[data-test="open-end-textarea"]', { timeout: 15000 }).should('be.visible');

        // 8. Type the answer
        const answer = 'I think AI is a transformative technology that can automate tasks and provide deep insights. It has the potential to revolutionize how we work and solve complex problems.';
        cy.get('[data-test="open-end-textarea"]').clear().type(answer);

        // 9. Wait for the send button to be enabled and click it
        cy.get('[data-test="open-end-send-button"]')
          .should('be.enabled')
          .click();

        // 10. Verify that the answer was submitted – textarea is cleared
        cy.get('[data-test="open-end-textarea"]').should('have.value', '');
      });
  });
});