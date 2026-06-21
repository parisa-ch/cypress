// cypress/support/e2e.js
import './commands';

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('ResizeObserver')) {
    return false; // Ignore ResizeObserver errors
  }
});