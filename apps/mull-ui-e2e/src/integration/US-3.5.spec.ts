/// <reference types="Cypress" />
import 'cypress-file-upload';
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-3.5: Group Chat Page (${frame.name} view)`, () => {
    beforeEach(() => {
      cy.viewport(frame.res[0], frame.res[1]);
    });

    it('should post an image on the group chat page', () => {
      const text = 'Test with image';
      cy.mockRefreshRequest();
      cy.visit('http://localhost:4200/messages/event/1/group-chat');
      cy.get('.event-chat', { timeout: 5000 }).should('exist');

      cy.get('#imageFile').attachFile('../fixtures/trashed-park.jpg');
      cy.get('.mull-text-area').type(`${text}{enter}`);

      cy.contains(text);
    });
  });
});
