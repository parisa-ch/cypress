/// <reference types="cypress" />

import LoginPage from '../support/page-objects/LoginPage';
import TeachAIPage from '../support/page-objects/TeachAIPage';
import usersData from '../fixtures/users.json';

// Ignore ResizeObserver errors
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('ResizeObserver')) {
    return false;
  }
});

describe('Teach AI - Document Upload', () => {
  const loginPage = new LoginPage();
  const teachAIPage = new TeachAIPage();
  const testUser = usersData.users.testUser;

  beforeEach(() => {
    loginPage.login(testUser.email, testUser.password);
    // Navigate directly to Teach AI via sidebar
    teachAIPage.navigateToTeachAI();
  });

  it('should upload a file to Teach AI', () => {
    // 1. Click "Add file"
    teachAIPage.clickAddFile();

    // 2. Upload the file from fixtures
    teachAIPage.uploadFile('cypress/fixtures/test.txt');

    // 3. Click Confirm
    teachAIPage.clickConfirm();

  });
});