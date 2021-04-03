/// <reference types="Cypress" />
import 'cypress-file-upload';
import { frameSizes } from './../fixtures/frame-sizes';

frameSizes.forEach((frame) => {
  describe(`US-8.5: Friends List (${frame.name} view)`, () => {
    beforeEach(() => {
      cy.viewport(frame.res[0], frame.res[1]);
    });

    it(`should show the user's friend list`, () => {
      cy.mockRefreshRequest();
      cy.visit('http://localhost:4200/my-friends');
      cy.get('.my-friends').should('exist');
    });

    it(`should remove a friend from the list`, () => {
      cy.mockRefreshRequest();
      cy.visit('http://localhost:4200/my-friends');
      let count = Cypress.$('.contact-container').length;
      cy.get('[data-testid=contact-row-button]').first().click();
      cy.get('.contact-container').should('have.length', count);
      cy.get('[data-testid=mull-button]').contains('Remove Friend').first().click();
      cy.get('.contact-container').should('have.length', count - 1);
    });
  });
});
