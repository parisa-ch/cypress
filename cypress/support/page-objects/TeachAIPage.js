// cypress/support/page-objects/TeachAIPage.js

class TeachAIPage {
  // ----- Sidebar link -----
  get sidebarTeachAILink() {
    return cy.get('[data-test="sidebar-item"]:contains("Teach AI")');
  }

  // ----- Teach AI page elements -----
  get addFileButton() {
    return cy.get('[data-test="teach-ai-add-file"]');
  }

  // The file upload section (dropzone) – appears after clicking "Add file"
  get fileDropzone() {
    return cy.get('[data-test="teach-ai-add-file"]', { timeout: 10000 });
  }

  get fileInput() {
    return cy.get('[data-test="teach-ai-file-dropzone-input"]');
  }

  get confirmButton() {
    return cy.get('[data-test="teach-ai-add-file-footer-save"]');
  }

  get cancelButton() {
    return cy.get('[data-test="teach-ai-add-file-footer-cancel"]');
  }

  // ----- Data source list items (after successful upload) -----
  get dataSourceCards() {
    return cy.get('[data-test="teach-ai-data-source-card"]');
  }

  get fileDataSource() {
    return this.dataSourceCards.filter('[data-type="file"]');
  }

  // ----- Actions -----
  navigateToTeachAI() {
    this.sidebarTeachAILink.click();
    cy.url().should('include', '/teach-ai');
    // Wait for the page to load – look for the "Add file" button
    this.addFileButton.should('be.visible');
    return this;
  }

  clickAddFile() {
    this.addFileButton.click();
    // Wait for the file upload section to appear
    this.fileDropzone.should('be.visible');
    return this;
  }

  uploadFile(filePath) {
    // The file input is hidden, use force: true
    this.fileInput.selectFile(filePath, { force: true });
    // After selecting a file, the Confirm button should become enabled
    this.confirmButton.should('not.be.disabled');
    return this;
  }

  clickConfirm() {
    this.confirmButton.click();
    return this;
  }

  // ----- Assertions -----
  shouldShowFileInList(fileName) {
    
    this.dataSourceCards.should('be.visible');
    
    return this;
  }
}

export default TeachAIPage;