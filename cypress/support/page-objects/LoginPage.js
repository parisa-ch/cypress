// cypress/support/page-objects/LoginPage.js

class LoginPage {
  get projectsHeading() {
    return cy.get('[data-test="manager-projects-title"]', { timeout: 10000 });
  }
  get userMenu() {
    return cy.get('[data-test="user-menu"]', { timeout: 10000 });
  }

  login(email, password) {
    cy.visit('/');
    cy.url().should('include', 'authkit.app');

    cy.url().then((url) => {
      const origin = new URL(url).origin;

      cy.origin(origin, { args: { email } }, ({ email }) => {
        cy.get('input[type="email"][name="email"]').should('be.visible').clear().type(email);
        cy.get('button[type="submit"]:contains("Continue")').click();
      });

      cy.origin(origin, () => {
        cy.get('input[type="password"][name="password"]').should('be.visible');
      });

      cy.origin(origin, { args: { password } }, ({ password }) => {
        cy.get('input[type="password"][name="password"]').clear().type(password);
        cy.get('button[type="submit"]:contains("Sign in")').click();
      });
    });

    cy.url({ timeout: 15000 }).should('include', '/projects');
    this.projectsHeading.should('be.visible');

    return this; 
  }

  shouldBeOnProjectsPage() {
    cy.url().should('include', '/projects');
    this.projectsHeading.should('be.visible');
    return this;
  }

  shouldShowUserMenu() {
    this.userMenu.should('be.visible');
    return this;
  }
}

export default LoginPage;