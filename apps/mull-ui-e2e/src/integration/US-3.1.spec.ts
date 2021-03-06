/// <reference types="Cypress" />
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-3.1: Announcements Page (${frame.name} view)`, () => {
    beforeEach(() => {
      cy.interceptGraphQLReqs();
      cy.viewport(frame.res[0], frame.res[1]);
    });

    it('should post announcement on announcements page', () => {
      cy.mockRefreshRequest();
      const date = new Date();
      cy.visit('http://localhost:4200/messages/announcements');
      cy.get('.event-chat', { timeout: 5000 }).should('exist');
      cy.get('.custom-text-input').type(`${date.toString()}{enter}`);
      /* eslint-disable-next-line cypress/no-unnecessary-waiting */
      cy.wait(500); // Test was flaky with aliases
      cy.contains(date.toString());
    });

    it('should not have chat input since user is not a host', () => {
      cy.mockRefreshRequest(2);
      cy.visit('http://localhost:4200/messages/announcements');
      cy.get('.event-chat', { timeout: 5000 }).should('exist');
      cy.get('chat-input-container').should('not.exist');
    });

    it('should not have access to announcements page', () => {
      const fakeUserId = -999;
      cy.mockRefreshRequest(fakeUserId);
      cy.visit('http://localhost:4200/messages/announcements');
      cy.get('.announcement-page').should('not.exist');
    });
  });
});
