/// <reference types="cypress" />

// demo-site.cy.js - Test for Sauce Demo website

describe('Sauce Demo - Login and Product Test', () => {

  beforeEach(() => {
    // Visit the Sauce Demo login page
    cy.visit('https://www.saucedemo.com/');
  });

  it('should login successfully with standard user', () => {
    // Enter username
    cy.get('[data-test="username"]').type('standard_user');

    // Enter password
    cy.get('[data-test="password"]').type('secret_sauce');

    // Click login button
    cy.get('[data-test="login-button"]').click();

    // Verify we are on the products page
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('contain', 'Products');
  });

  it('should add a product to the cart', () => {
    // Login first
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Add first product to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Verify cart badge shows 1
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('should verify login fails with invalid credentials', () => {
    // Enter invalid username
    cy.get('[data-test="username"]').type('invalid_user');

    // Enter invalid password
    cy.get('[data-test="password"]').type('wrong_password');

    // Click login button
    cy.get('[data-test="login-button"]').click();

    // Verify error message appears
    cy.get('[data-test="error"]').should('be.visible');
    cy.get('[data-test="error"]').should('contain', 'Username and password do not match');
  });
});