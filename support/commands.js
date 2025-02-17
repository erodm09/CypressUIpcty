// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('login', () => {
    cy.visit('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/LogIn');
  
    // Enter Username and Password
    cy.get('#Username').should('be.visible').type('TestUser728');
    cy.get('#Password').should('be.visible').type('R=JHYK!4K^uo', { log: false });
  
    // Submit the form
    cy.get('form').submit();
  
    // Verify successful login by checking the URL
    cy.url().should('include', '/Prod/Benefits');
  
    // Verify the "Log Out" button is present (indicates login success)
    cy.get('a[href="/Prod/Account/LogOut"]').should('be.visible');
  });

import { faker } from '@faker-js/faker';

Cypress.Commands.add('generateEmployeeData', () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    dependents: faker.number.int({ min: 0, max: 15 }).toString()
  };
});
Cypress.Commands.add('logout', () => {
    // Click the "Log Out" link
    cy.get('a[href="/Prod/Account/LogOut"]', { timeout: 10000 })
      .should('be.visible')
      .click();
  
    // Optionally, verify we landed back on the login page
    // For example, if your app redirects to "/Prod/Account/LogIn":
    cy.url().should('include', '/Prod/Account/LogIn');
  });  
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })