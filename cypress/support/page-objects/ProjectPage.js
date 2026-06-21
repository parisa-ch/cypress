// cypress/support/page-objects/ProjectPage.js

class ProjectPage {
  // ----- Locators on the Projects List page -----
  get addProjectButton() {
    return cy.get('[data-test="add-project-button"]');
  }
  get projectsHeading() {
    return cy.get('[data-test="manager-projects-title"]');
  }
  get projectList() {
    return cy.get('[data-test="table-body"]');
  }
  get firstProjectTitle() {
    return cy.get('[data-test="project-title"]').first();
  }

  // ----- Locators inside the **Create Project** modal -----
  get modal() {
    return cy.get('[data-test="create-project-dialog-content"]', { timeout: 15000 });
  }
  get modalTitle() {
    return cy.get('[data-test="create-project-dialog-title"]');
  }
  get createButton() {
    return cy.get('[data-test="create-project-button"]');
  }
  get closeButton() {
    return cy.get('[data-test="close-create-project-dialog-button"]');
  }

  // Project type radio cards
  get projectTypeCards() {
    return cy.get('[role="radiogroup"] [role="radio"]');
  }

  // ----- Locators on the **Project creation page** (after redirect) -----
  get generateDialog() {
    return cy.get('[data-test="generate-dialog-content"]', { timeout: 15000 });
  }
  get generateDialogTitle() {
    return cy.get('[data-test="generate-dialog-title"]');
  }
  get skipButton() {
    return cy.get('[data-test="skip-button"]');
  }
  get draftButton() {
    return cy.get('[data-test="generate-button"]');
  }

  // ----- Actions on Projects page -----
  visit() {
    cy.visit('/projects');
    this.projectsHeading.should('be.visible');
    return this;
  }

  clickAddProject() {
    this.addProjectButton.click();
    this.modal.should('be.visible');
    this.modalTitle.should('contain', 'Create');
    return this;
  }

  selectProjectType(type) {
    cy.get(`[role="radio"][value="${type}"]`).click();
    return this;
  }

  clickCreate() {
    this.createButton.should('be.enabled');
    this.createButton.click();
    return this;
  }

  // ----- Actions on the Project creation page -----
  waitForGenerateDialog() {
    this.generateDialog.should('be.visible');
    this.generateDialogTitle.should('contain', 'Draft project');
    return this;
  }

  // Optionally skip or draft if needed
  clickSkip() {
    this.skipButton.click();
    return this;
  }

  clickDraft() {
    this.draftButton.should('be.enabled');
    this.draftButton.click();
    return this;
  }

  // ----- Assertions -----
  modalShouldBeClosed() {
    this.modal.should('not.exist');
    return this;
  }

  shouldBeOnProjectCreationPage() {
    cy.url().should('include', '/projects/new');
    return this;
  }

get generateDialog() {
  return cy.get('[data-test="generate-dialog-content"]', { timeout: 15000 });
}
get generateDialogTitle() {
  return cy.get('[data-test="generate-dialog-title"]');
}
get skipButton() {
  return cy.get('[data-test="skip-button"]');
}
get draftButton() {
  return cy.get('[data-test="generate-button"]');
}
get learningGoalInput() {
  return cy.get('[data-test="generate-prompt-input"]');
}

waitForGenerateDialog() {
  this.generateDialog.should('be.visible');
  this.generateDialogTitle.should('contain', 'Draft project');
  return this;
}

fillLearningGoal(text) {
  this.learningGoalInput.clear().type(text);
  return this;
}

clickDraft() {
  this.draftButton.should('be.enabled');
  this.draftButton.click();
  return this;
}
// ----- Locators -----
get publishButton() {
  return cy.get('[data-test="publish-project-button"]');
}

// ----- Actions -----
publishProject() {
  this.publishButton.click();
  return this;
}
getSurveyUrl() {
  // Extract the URL from the display element
  return this.publishLinkDisplay.invoke('text').then((text) => text.trim());
}

}


export default ProjectPage;