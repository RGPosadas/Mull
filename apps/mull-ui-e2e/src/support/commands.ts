/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
const jwt = require('jsonwebtoken');

declare namespace Cypress {
  interface Chainable<Subject> {
    mockRefreshRequest(userId?): void;
    interceptGraphQLReqs(): void;
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('mockRefreshRequest', (userId = 1) => {
  cy.intercept('POST', 'http://localhost:3333/api/auth/refresh', {
    statusCode: 201,
    body: {
      accessToken: jwt.sign({ id: userId }, Cypress.env('ACCESS_TOKEN_SECRET')),
      ok: true,
    },
  });
});

/**
 * Intercepts GQL requests and checks if the requests contain specific operation names, and are
 * then aliased so that the E2E tests can refer to them.
 * This is used as an alternative to cy.wait(int) as it is an anti-pattern,
 * and cy.wait(alias) is the correct approach in order to reduce flaky tests.
 * Ref: https://docs.cypress.io/api/commands/wait.html#Alias
 */
Cypress.Commands.add('interceptGraphQLReqs', () => {
  return cy.intercept('POST', 'localhost:3333/graphql', (req) => {
    if (req.body.operationName.includes('User')) {
      req.alias = 'User';
    }
    if (req.body.operationName.includes('Login')) {
      req.alias = 'Login';
    }
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
