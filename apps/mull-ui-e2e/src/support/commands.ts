/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject> {
    mockRefreshRequest(): void;
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('mockRefreshRequest', () => {
  cy.intercept('POST', 'http://localhost:3333/api/auth/refresh', {
    statusCode: 201,
    body: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjEyMDQ3NjA0LCJleHAiOjE2MTIwNDg1MDR9.Wmb_xkPVM_qLBjsG_uVe9yMvYsHj7ECoitc7yW4LyNE',
      ok: true,
    },
  });
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
