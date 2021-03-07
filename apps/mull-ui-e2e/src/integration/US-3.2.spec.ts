/// <reference types="Cypress" />
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-3.2: Group Chat Page (${frame.name} view)`, () => {
    beforeEach(() => {
      cy.interceptGraphQLReqs();
      cy.viewport(frame.res[0], frame.res[1]);
    });

    it('should post messages on the group chat page', () => {
      cy.mockRefreshRequest();
      const date = new Date();
      cy.visit('http://localhost:4200/messages/group-chat');
      cy.get('.event-chat', { timeout: 5000 }).should('exist');
      cy.get('.custom-text-input').type(`${date.toString()}{enter}`);
      /* eslint-disable-next-line cypress/no-unnecessary-waiting */
      cy.wait(500); // Test was flaky with aliases
      cy.contains(date.toString());
    });
  });
});
