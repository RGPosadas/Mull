/// <reference types="Cypress" />
import 'cypress-file-upload';
import * as faker from 'faker';
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-3.4: Direct Message Page (${frame.name} view)`, () => {
    beforeEach(() => {
      cy.viewport(frame.res[0], frame.res[1]);
    });

    it('should post a message and an image in a direct message chat', () => {
      cy.mockRefreshRequest();
      cy.visit('http://localhost:4200/messages');
      cy.get('.user-information').first().click();
      cy.get('.direct-message-chat', { timeout: 5000 }).should('exist');
      const message = `Hello ${faker.random.number()}`;
      cy.get('.custom-text-input').type(`${message}{enter}`);
      cy.contains(message, { timeout: 5000 });

      const imageText = `Image ${faker.random.number()}`;
      cy.get('#imageFile').attachFile('../fixtures/trashed-park.jpg');
      cy.get('.custom-text-input').type(`${imageText}{enter}`);
      cy.contains(imageText, { timeout: 5000 });
    });
  });
});
