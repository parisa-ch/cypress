/// <reference types="cypress" />

import LoginPage from '../support/page-objects/LoginPage';
import usersData from '../fixtures/users.json';

describe('Login Flow - Positive Test', () => {
  const loginPage = new LoginPage();
  const testUser = usersData.users.testUser;

  it('should login successfully with valid credentials', () => {
    loginPage
      .login(testUser.email, testUser.password)
      .shouldBeOnProjectsPage()
      .shouldShowUserMenu();
  });
});