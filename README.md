Cypress AI QA Automation
This repository contains automated end-to-end tests for the TheySaid AI platform using Cypress. The tests cover key user flows: Login, Create Project, Teach AI – Document Upload, and Publish & Take Survey.

Prerequisites
Node.js (v18 or later) – Download

npm (comes with Node.js) or yarn

Installation
Clone the repository and install dependencies:

bash
git clone <your-repo-url>
cd <your-repo-folder>
npm install
If you don't have cypress installed globally, it will be installed locally as a dev dependency.

Configuration
Update user credentials
Open cypress/fixtures/users.json and replace "email" and "password" with valid test credentials:

json
{
  "users": {
    "testUser": {
      "email": "your-test-email@example.com",
      "password": "your-password",
      "name": "Test User"
    }
  }
}
Environment variables (optional)
If you prefer to use environment variables, create a .env file in the root:

env
TEST_USER_EMAIL=your-test-email@example.com
TEST_USER_PASSWORD=your-password
Then modify cypress.config.js to read from process.env.

Base URL
The tests are configured to run against https://evo.dev.theysaid.io. If you need to change the base URL, update baseUrl in cypress.config.js.

 Running the Tests
▶ Open Cypress Test Runner (interactive)
bash
npx cypress open
This launches the Cypress GUI. Click on a spec file to run it in a live browser.

▶ Run all tests in headless mode
bash
npx cypress run
▶ Run a specific test file
bash
npx cypress run --spec "cypress/e2e/login.cy.js"
 Run tests with a specific browser
bash
npx cypress run --browser chrome
▶ Run tests in parallel (if configured)
bash
npm run cy:parallel
